import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoDto } from "./api";
import { todoListApi } from "./api";


export const useToggleTodo = () => {
    const queryClient = useQueryClient();

    const updateTodoMutation = useMutation({
        mutationFn: async (data: {id: string, done: boolean}) => {
            console.log('Updating todo:', data);
            const response = await todoListApi.updateTodo(data);
            console.log('Update response:', response);
            return response({ signal: undefined });
        },
        onMutate: async ({id, done}) => {
            console.log('Starting optimistic update:', {id, done});
            const queryKey = todoListApi.getTodoListQueryOptions().queryKey;
            await queryClient.cancelQueries({ queryKey });

            // Сохраняем предыдущие данные
            const previousTodos = queryClient.getQueryData<TodoDto[]>(queryKey);
            console.log('Previous todos:', previousTodos);

            // Модифицируем кэш, обновляя оптимистично
            queryClient.setQueryData<TodoDto[]>(
                queryKey,
                (old) => {
                    console.log('Current todos in cache:', old);
                    if (!old) return old;
                    const updated = old.map(todo =>
                        todo.id === id ? {...todo, done} : todo
                    );
                    console.log('Updated todos:', updated);
                    return updated;
                }
            )

            return { previousTodos };
        },
        onError: (error, data, context) => {
            console.error('Error updating todo:', error);
            // Восстанавливаем предыдущие данные при ошибке
            if (context) {
                queryClient.setQueryData(
                    todoListApi.getTodoListQueryOptions().queryKey,
                    context.previousTodos
                );
            }
        },
        onSuccess: (data) => {
            console.log('Successfully updated todo:', data);
        },
        onSettled: () => {
            console.log('Settled - invalidating queries');
            // Делаем повторный запрос
            queryClient.invalidateQueries({ 
                queryKey: todoListApi.getTodoListQueryOptions().queryKey 
            })
        }
    })

    const toggleTodo = (id: string, done: boolean) => {
        console.log('Toggling todo:', {id, done});
        updateTodoMutation.mutate({
            id,
            done: !done
        });
    }

    return {
        toggleTodo
    }
}