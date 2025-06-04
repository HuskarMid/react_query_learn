"use client"
import {
    combineSlices,
    createSelector,
    ThunkAction,
    UnknownAction
} from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Безопасная проверка на доступность localStorage
export const isLocalStorageAvailable = () => {
    if (typeof window === 'undefined') return false;
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
    } catch (e) {
        return false;
    }
};

export const rootReducer = combineSlices()

export type AppState = any;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<R, AppState, any, UnknownAction>;

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware(),
})

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppAsyncThunk = createSelector.withTypes<AppState>();




