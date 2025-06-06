import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "../../shared/redux";
import { isLocalStorageAvailable } from "../../shared/redux";

type AuthState = {
    userId: string | undefined;
    loginError: string | undefined;
}

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        userId: isLocalStorageAvailable() ? localStorage.getItem("userId") : undefined
    } as AuthState,
    selectors: {
        userId: (state) => state.userId,
        loginError: (state) => state.loginError,
    },
    reducers: {
        addUser: (state, action: PayloadAction<{userId: string}>) => {
            localStorage.setItem("userId", action.payload.userId);
            state.userId = action.payload.userId;
        },
        removeUser: (state) => {
            localStorage.removeItem("userId");
            state.userId = undefined;
        },
        setError: (state, action: PayloadAction<{error: string}>) => {
            state.loginError = action.payload.error;
        },
    },
    
}).injectInto(rootReducer)