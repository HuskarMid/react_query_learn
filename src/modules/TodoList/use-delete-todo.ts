import { nanoid } from "nanoid";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api";

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    const deleteTodoMutation = useMutation({
        mutationFn: async (id: string) => {
            console.log('Deleting todo:', id);
            const response = await todoListApi.deleteTodo(id);
            console.log('Delete response:', response);
            return response({ signal: undefined });
        },
        onSuccess: (_, deletedId) => {                                  // Паттерн pessimistic update
            queryClient.setQueryData(
                todoListApi.getTodoListQueryOptions().queryKey,
                todos => todos?.filter(item => item.id !== deletedId)
            );
        },
        onError: (error) => {
            console.error('Error deleting todo:', error);
        },
        onSettled: async () => { // Срабатывает и при ошибке и при успешном выполнении
            await queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] })
        }
    })

    const handleDelete = (id: string) => {
        deleteTodoMutation.mutate(id)
    }

    return {
        handleDelete,
        deleteTodoMutation,
        getIsPending: (id: string) => deleteTodoMutation.isPending && deleteTodoMutation.variables === id,
        isError: deleteTodoMutation.isError,
        error: deleteTodoMutation.error
    }
}