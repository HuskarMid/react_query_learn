import { jsonApiInstance } from "@/src/shared/api/api-instance";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

const BASE_URL = "http://localhost:3001"

export type PaginatedResult<T> = {
    data: T[];
    first: number;

    items: number;
    last: number;
    next: number;
    pages: number;
    prev: number;
}

export type TodoDto = {
    id: number;
    text: string;
    done: boolean;
    userId: string;
}


export const todoListApi = {
    getTodoListQueryOptions: (page: number) => {
        return queryOptions<PaginatedResult<TodoDto>, Error, TodoDto[]>({
            queryKey: ["tasks", "list", { page }],
            queryFn: async (meta) => {
                const response = await jsonApiInstance<PaginatedResult<TodoDto>>(`tasks?_page=${page}&_per_page=10`, {
                    method: "GET",
                    signal: meta.signal
                });
                return response(meta);
            }
        })
    },

    getTodoListInfiniteQueryOptions: () => {
        return infiniteQueryOptions<PaginatedResult<TodoDto>, Error, TodoDto[]>({
            queryKey: ["tasks", "list"],
            queryFn: async (meta) => {
                const response = await jsonApiInstance<PaginatedResult<TodoDto>>(`tasks?_page=${meta.pageParam}&_per_page=10`, {
                    method: "GET",
                    signal: meta.signal
                });
                return response(meta);
            },
            initialPageParam: 1,
            getNextPageParam: result => result.next,
            select: result => result.pages.flatMap(page => page.data)
        })
    },

    createTodo: (data: TodoDto) => {
        console.log('API createTodo called with:', data);
        return jsonApiInstance<TodoDto>(`tasks`, {
            method: "POST",
            json: data
        })
    },
    updateTodo: (id: string, data: Partial<TodoDto>) => {
        return jsonApiInstance<TodoDto>(`tasks/${id}`, {
            method: "PATCH",
            json: data
        })
    },
    deleteTodo: (id: string) => {
        return jsonApiInstance(`tasks/${id}`, {
            method: "DELETE",
            json: {}
        }); 
    },

}