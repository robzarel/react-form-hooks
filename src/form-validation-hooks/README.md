```typescript
  const form = useForm<SomeField, ApiResponse>({
    fields: [period],
    apiCall: () => api.get.statistic(),
    onSuccess: () => {
      /* api success call handler */
    },
    onFailure: () => {
      /* api failure call handler */
    },
  });
```