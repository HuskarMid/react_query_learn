import { AppThunk, isLocalStorageAvailable } from "@/src/shared/redux";
import { authSlice } from "./auth.slice";
import { queryClient } from "@/src/shared/api/query-client";

export const logoutThunk = (): AppThunk => async dispatch => {
    if (isLocalStorageAvailable()) {
        dispatch(authSlice.actions.removeUser())
        queryClient.removeQueries()
        localStorage.removeItem("userId");
    }
}