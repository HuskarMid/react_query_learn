import { nanoid } from "nanoid";
import { todoListApi } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TodoDto } from "./api";

export const useCreateTodo = () => {
    const queryClient = useQueryClient();
    const createTodoMutation = useMutation({
        mutationFn: async (data: TodoDto) => {
            console.log('Creating todo:', data);
            const response = await todoListApi.createTodo(data);
            console.log('Create response:', response);
            return response({ signal: undefined });
        },
        onSuccess: () => {
            console.log('Todo created successfully');
        },
        onError: (error) => {
            console.error('Error creating todo:', error);
        },
        onSettled: async () => { // Срабатывает и при ошибке и при успешном выполнении
            await queryClient.invalidateQueries({ queryKey: [todoListApi.baseKey] })
        }
    })

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const text = String(formData.get("text") ?? '');
        if (!text.trim()) return;

        createTodoMutation.mutate({
            id: nanoid(),
            done: false,
            text: text.trim(),
            userId: '1'
        })

        e.currentTarget.reset();
    }

    return {
        handleCreate,
        createTodoMutation,
        isPending: createTodoMutation.isPending,
        isError: createTodoMutation.isError,
        error: createTodoMutation.error
    }
}