import { useAppDispatch } from "@/src/shared/redux";
import { createTodoThunk } from "./create-todo-thunk";
import { useMutation } from "@tanstack/react-query";

export const useCreateTodo = () => {
    const dispatch = useAppDispatch();
    const { mutate, isPending: isLoadingCreateTodo } = useMutation({
        mutationKey: ['createTodo'],
        mutationFn: async (text: string) => {
            await dispatch(createTodoThunk(text));
        }
    });

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const text = String(formData.get("text") ?? '');
        if (!text.trim()) return;

        mutate(text);

        e.currentTarget.reset();
    }

    return {
        handleCreate,
        isLoadingCreateTodo
    }
}