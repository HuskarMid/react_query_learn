'use client'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/api/query-client"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <Header />
                {children}
                <Footer />
            </div>
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
