import { TodoDto } from "./api";

import { useInfiniteQuery } from "@tanstack/react-query";
import { PaginatedResult } from "./api";
import { useRef } from "react";
import { useCallback } from "react";
import { todoListApi } from "./api";

export const useTodoList = () => {
    const {
        data: todoItems,
        error,
        isLoading,
        fetchStatus,
        status,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery<PaginatedResult<TodoDto>, Error, TodoDto[]>({
        ...todoListApi.getTodoListInfiniteQueryOptions(),
        select: (data) => {
            console.log('Raw data:', data);
            const items = data.pages.flatMap(page => page.data).filter(Boolean);
            console.log('Processed items:', items);
            return items;
        }
    });


    const cursorRef = useInterSection(() => {
        fetchNextPage();
    })

    const cursor = (
        <div ref={cursorRef} className="flex gap-2 mt-4">
            {!hasNextPage && <div>No more data</div>}
            {isFetchingNextPage && <div>Loading...</div>}
        </div>
    )

    return {error, todoItems, isLoading, cursor}
}

export function useInterSection(onIntersect: () => void) {

    const unsubscribe = useRef(() => {});

    return useCallback((el: HTMLDivElement | null) => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(intersection => {
                if (intersection.isIntersecting) {
                    onIntersect();
                }
            })
        });
        if(el) {
            observer.observe(el);
            unsubscribe.current = () => observer.disconnect();
        } else {
            unsubscribe.current();
        }
    }, [])
}