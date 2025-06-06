'use client'

import { useDeleteTodo } from "./use-delete-todo";
import { useToggleTodo } from "./use-toggle-todo";
import { useCreateTodo } from "./use-create-todo";
import { useTodoList } from "./use-todo-list";
import { useUser } from "../auth/use-user";
import { UserDto } from "../auth/api";

const TodoList = () => {
    const {error, todoItems, isLoading} = useTodoList();
    const { data: user, isLoading: isUserLoading } = useUser();

    const {handleCreate, isLoadingCreateTodo} = useCreateTodo()
    const {handleDelete, getIsPending} = useDeleteTodo();
    const {toggleTodo} = useToggleTodo();

    if (isLoading || isUserLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div className="p-5 mx-auto max-w-[1200px]">
            <h1 className="text-4xl mb-5 mb-5">Todo List owner: <span className="underline font-bold">{user?.login}</span></h1>

            <form className="flex gap-2 mb-5" onSubmit={handleCreate}>
                <input 
                    type="text" 
                    name="text" 
                    className="border border-slate-300 rounded p-2" 
                    required
                />
                <button 
                    className="border border-teal-300 rounded p-2 disabled:opacity-50"
                    disabled={isLoadingCreateTodo}
                >
                    {isLoadingCreateTodo ? 'Создание...' : 'Создать'}
                </button>
            </form>

            <div className={`flex flex-col gap-4`}>
                {todoItems?.map(todo => (
                    <div className="border border-slate-300 rounded p-3 mb-5 flex justify-between" key={todo?.id ?? Math.random()}>
                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                checked={todo.done} 
                                onChange={() => toggleTodo(todo.id, todo.done)}
                            />
                            <span>{todo?.text}</span>
                        </div>
                        <button 
                            className="border border-teal-300 rounded p-2 disabled:opacity-50 cursor-pointer hover:bg-teal-300"
                            disabled={getIsPending(todo.id)}
                            onClick={() => handleDelete(todo.id)}
                        >
                            {getIsPending(todo.id) ? 'Удаление...' : 'Удалить'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TodoList;
