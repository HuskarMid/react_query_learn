'use client'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/api/query-client"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "../shared/redux";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // или loading state
    }

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Header />
                {children}
                <Footer />
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

export default MainLayout;

const Header = () => {
    return (
        <header>

        </header>
    )
}

const Footer = () => {
    return (
        <footer>
            
        </footer>
    )
}
