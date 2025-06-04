import { AppThunk } from "@/src/shared/redux";
import { MutationObserver } from "@tanstack/react-query";
import { authApi } from "./api";
import { queryClient } from "../../shared/api/query-client";
import { authSlice } from "./auth.slice";

export const loginThunk = (login: string, password: string): AppThunk => async (dispatch, getState) => {
    const mutationResult = await new MutationObserver(queryClient, {
        mutationFn: authApi.loginUser,
    }).mutate({
        login,
        password
    })

    if(mutationResult) {
        dispatch(authSlice.actions.addUser({
            userId: mutationResult.id
        }))
    }

    dispatch(authSlice.actions.setError({
        error: 'Пароль или логин неправильные'
    }))

}