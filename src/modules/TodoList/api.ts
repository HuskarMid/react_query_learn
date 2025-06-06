import { jsonApiInstance } from "@/src/shared/api/api-instance";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export type PaginatedResult<T> = {
    data: T[];
    first: number;

    items: number;
    last: number;
    next: number;
    pages: number;
    prev: number;

    toReversed: () => T[];
}   

export type TodoDto = {
    id: string;
    text: string;
    done: boolean;
    userId: string;
}


export const todoListApi = {
    baseKey: 'tasks',
    getTodoListQueryOptions: () => {
        return queryOptions<TodoDto[]>({
            queryKey: [todoListApi.baseKey, 'list'],
            queryFn: async (meta) => {
                const response = await jsonApiInstance<TodoDto[]>(`tasks`, {
                    method: "GET",
                    signal: meta.signal
                });
                return response(meta);
            }
        })
    },

    getTodoListInfiniteQueryOptions: () => {
        return infiniteQueryOptions<PaginatedResult<TodoDto>, Error, TodoDto[]>({
            queryKey: [todoListApi.baseKey, 'list'],
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
        return jsonApiInstance<TodoDto>(`tasks`, {
            method: "POST",
            json: data
        })
    },
    updateTodo: (data: Partial<TodoDto> & {id: string}) => {
        return jsonApiInstance<TodoDto>(`tasks/${data.id}`, {
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