import { AppThunk } from "@/src/shared/redux";
import { useMutation } from "@tanstack/react-query";
import { TodoDto, todoListApi } from "./api";
import { queryClient } from "@/src/shared/api/query-client";
import { nanoid } from "nanoid";
import { authSlice } from "../auth/auth.slice";

export const createTodoThunk = (text: string): AppThunk => async (dispatch, getState) => {
    const userId = authSlice.selectors.userId(getState())
    if (!userId) {
        throw new Error('User ID is required')
    }

    const newTodo = {
        id: nanoid(),
        text,
        done: false,
        userId: userId ?? ''
    }

    queryClient.cancelQueries({
        queryKey: [todoListApi.baseKey] 
    })

    const prevTasks = queryClient.getQueryData(
        todoListApi.getTodoListQueryOptions().queryKey
    )

    queryClient.setQueryData(
        todoListApi.getTodoListQueryOptions().queryKey,
        (tasks: TodoDto[] | undefined) => [...(tasks ?? []), newTodo]
    )

    try {
        const response = await todoListApi.createTodo(newTodo);
        return response({ signal: undefined });
    } catch (error) {
        queryClient.setQueryData(
            todoListApi.getTodoListQueryOptions().queryKey,
            prevTasks
        )
        throw error
    }
}
