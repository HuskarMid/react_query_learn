'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi, TodoDto } from "./api";
import { useState } from "react";
import { useTodoList } from "./use-todo-list";
import { nanoid } from "nanoid";

const TodoList = () => {
    const [enabled, setEnabled] = useState<boolean>(false);

    const {error, todoItems, isLoading, cursor} = useTodoList();

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
            queryClient.invalidateQueries({ queryKey: ["tasks", "list"] })
        },
        onError: (error) => {
            console.error('Error creating todo:', error);
        }
    })

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const text = String(formData.get("text") ?? '');
        if (!text.trim()) return;

        createTodoMutation.mutate({
            id: Number(nanoid()),
            done: false,
            text: text.trim(),
            userId: '1'
        })

        e.currentTarget.reset();
    }


    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div className="p-5 mx-auto max-w-[1200px]">
            <h1 className="text-4xl font-bold underline mb-5 mb-5">Todo List</h1>

            <form className="flex gap-2 mb-5" onSubmit={handleCreate}>
                <input 
                    type="text" 
                    name="text" 
                    className="border border-slate-300 rounded p-2" 
                    required
                />
                <button 
                    className="border border-slate-300 rounded p-2"
                    disabled={createTodoMutation.isPending}
                >
                    {createTodoMutation.isPending ? 'Создание...' : 'Создать'}
                </button>
            </form>
            {createTodoMutation.isError && (
                <div className="text-red-500 mb-5">
                    Ошибка при создании: {createTodoMutation.error.message}
                </div>
            )}

            <div className={`flex flex-col gap-4`}>
                {todoItems?.map(todo => (
                    <div className="border border-slate-300 rounded p-3 mb-5" key={todo?.id ?? Math.random()}>
                        <span>{todo?.text}</span>
                    </div>
                ))}
            </div>
            {cursor}
        </div>
    )
}

export default TodoList;
