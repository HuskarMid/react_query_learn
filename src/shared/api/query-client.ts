import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // Данные будут считаться свежими в течение 5 минут     - stale time
            gcTime: 1000 * 60 * 10, // Данные будут удаляться из кэша через 10 минут          - garbage collection time
        },
    },
});
