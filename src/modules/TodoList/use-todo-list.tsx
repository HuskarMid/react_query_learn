
import { useQuery } from "@tanstack/react-query";

import { TodoDto } from "./api";
import { todoListApi } from "./api";

export const useTodoList = () => {
    const {
        data: todoItems,
        error,
        isLoading,
        refetch
    } = useQuery<TodoDto[]>({
        ...todoListApi.getTodoListQueryOptions(),
        select: (data) => data.toReversed()
    });

    return {error, todoItems, isLoading, refetch}
}