const BASE_URL = "http://localhost:3001"

class ApiError extends Error {
    constructor(public response: Response) {
        super("ApiError" + response.status);
    }
}

export const jsonApiInstance = async <T>(
    url:string, 
    init?: RequestInit & {json?: unknown}
) => async (meta: { signal?: AbortSignal }) => {

    let headers = init?.headers ?? {};

    if(init?.json){
        headers = {
            ...headers,
            'Content-Type': 'application/json'
        }

        init.body = JSON.stringify(init.json); 
    }

    const result = await fetch(`${BASE_URL}/${url}`, {
        ...init,
        headers
    });

    if (!result.ok) {
        console.error('API Error:', {
            status: result.status,
            statusText: result.statusText,
            url: result.url
        });
        throw new ApiError(result);
    }

    const data = await result.json();
    return data;
}
