## Validators

Validators are simple functions whose task is to perform the appropriate check on the value passed to it.

### Types
```typescript
type GetValidator<Options, Params> = (options: Options) => Validator<Params>;
type Validator<T> = (params?: T) => Promise<ValidationResult>;
type ValidationResult = string | null;
```

The `validate` utility runs the validators one by one with the given value.

```typescript
const validate: (
  value: any,
  validators: Validator[]
) => Promise<ValidationResult>;
```
### **validate** usage example

```typescript
import validate, {
  required,
  maxLength,
  minLength,
} from 'pure-validators';

const validators = [required(), minLength(5), maxLength(150)]
const value: string = '123456'

const validationResult = validate(value, validators)
...
```
In this example, the resulting value of `validationResult` is `null`, indicating successful validation against the passed validator array.

We checked that the passed value:
- not empty (validator `required()`)
- is longer than 5 characters (validator `minLength(5)`)
- less than 150 characters long (validator `maxLength(150)`)
## Form validation hooks
### Custom hooks

Custom hooks encapsulate the data model of a particular input field.

Each data model has the following structure by default:
```typescript
type DefaultField = {
  id: string;
  value: string;
  error: null | string;
  hasError: () => Promise<boolean>;
};
```

Each custom hook can extend the default data model according to their needs. 
For example:

```typescript
type RadioField = DefaultField & {
  handleChange: (value: string) => void;
};

or

type TextField = DefaultField & {
  handleChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleBlur: () => void;
};
```

### **custom hook** usage example
```typescript
  import { required } from 'pure-validators/validators';
  import { useRadioFormField } from 'pure-validators/form-validation-hooks';

  const validators = [required()];
  const options = [{ title: '1 week', value: '1' }, { title: '2 weeks', value: '2' }];
  const period = useRadioFormField('period', validators, options[0].value);

  /* your markup, which can use id, value, error, hasError, handleChange 'preiod' props */
...
```
### Form hook **useForm**
A form hook that:
- accepts a set of fields (models from custom hooks)
- starts validation (before submitting the form data)
- submits form data

At the same time, **useForm** makes it possible to pass in **onSuccess** and **onFailure** callbacks.

```typescript
  import { required } from 'pure-validators/validators';
  import { useForm, useTextFormField } from 'pure-validators/form-validation-hooks';
  import type { TextField } from 'pure-validators/form-validation-hooks/types';

  import Styles from './index.css';

  const name = useTextFormField('name', [required]);

  const form = useForm<RadioField, ApiResponse>({
    fields: [name],
    apiCall: () =>  {/* api call */}
    onSuccess: () => {/* api success call handler */},
    onFailure: () => {/* api failure call handler */},
  });

  return (
    <div>
      <form className={Styles.form} onSubmit={form.handleFormSubmit}>
        <fieldset className={Styles.fieldset}>
          <p className={Styles.label}>Name</p>
          <input
            className={Styles.name}
            id={name.id}
            value={name.value}
            onChange={name.handleChange}
            onBlur={name.handleBlur}
            type="text"
            name="name"
            data-error={!!name.error}
          />
          {name.error && <p className={Styles.error}>{name.error}</p>}
        </fieldset>
        <div className={Styles.submitWrapper}>
          <button
            type='submit'
            className={Styles.submitButton}
            disabled={form.isSending || form.hasFieldErrors}
          >
            Получить
          </button>
          {form.isSending && (
            <p className={Styles.loader}>loading...</p>
          )}
          {form.sendingError && (
            <p className={Styles.error}>{form.sendingError}</p>
          )}
        </div>
      </form>
    </div>
  );
```