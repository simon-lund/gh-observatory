'use client';


import {ReactNode} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();


export default function ClientSideProviders({children}: Readonly<{children: ReactNode}>) {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastContainer/>
            {children}
        </QueryClientProvider>
    )
}