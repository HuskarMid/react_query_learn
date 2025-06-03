# Learn react-query

### Запрос на сервер. В queryFn используется промис
```tsx
    const [page, setPage] = useState(1);
    const [enabled, setEnabled] = useState(false);

    const { data: todoItems, error, isLoading, fetchStatus, status, isPlaceholderData} = useQuery<PaginatedResult<TodoDto>>({
        queryKey: ["tasks", "list", { page }],
        queryFn: async (meta) => {
            const result = await todoListApi.getTodoList({page}, meta);
            return result as PaginatedResult<TodoDto>;
        },
        placeholderData: keepPreviousData,                            // ПРЕзагружает данные при переходе на другую страницу
        enabled: enabled
    })

    // status: pending | error | success - наличие данных в кэше. Данных нет -> pending
    // fetchStatus: idle | fetching | paused | refreshing - статус запроса
    // Когда ситуация: status === "pending" && fetchStatus === "fetching" --------> isLoading
```

