"use client"
import { useQuery } from "@tanstack/react-query"
import { useAppSelector } from "../../shared/redux"
import { authApi, UserDto } from "./api"
import { authSlice } from "./auth.slice"

export const useUser = () => {
    const userId = useAppSelector(authSlice.selectors.userId);
    return useQuery<UserDto>({
        ...authApi.getUserById(userId!),
        enabled: Boolean(userId)
    })
}