import { jsonApiInstance } from "@/src/shared/api/api-instance";
import { queryOptions } from "@tanstack/react-query";

export type UserDto = {
    id: string;
    login: string;
    password: string;
}

export const authApi = {
    baseKey: 'users',
    getUserById: (id: string) => {
        return queryOptions<UserDto>({
            queryKey: [authApi.baseKey, 'byId', id],
            queryFn: async (meta) => {
                const response = await jsonApiInstance<UserDto>(`users/${id}`, {
                    method: "GET",
                    signal: meta.signal
                });
                return response(meta);
            }
        })
    },
    loginUser: async ({login, password}: {login: string, password: string}) => {
        const response = await jsonApiInstance<UserDto[]>(
            `users?login=${login}&password=${password}`, {}
        );
        const data = await response({ signal: undefined });
        return data[0] as UserDto | undefined;
    }
}