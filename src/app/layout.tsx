import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {ReactNode} from "react";
import "./globals.css";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ClientSideProviders from "@/app/providers";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "The GitHub Observatory",
    description: "A simple webapp to view your starred repositories",
    openGraph: {
        title: "The GitHub Observatory",
        siteName: "The GitHub Observatory",
        description: "A simple webapp to view your starred repositories",
        type: "website",
        locale: "en_US",
        url: process.env.NEXT_PUBLIC_BASE_URL,
    },
};


export default async function RootLayout({children}: Readonly<{ children: ReactNode; }>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ClientSideProviders>
            <div className="flex flex-col min-h-screen max-w-screen-xl !min-w-screen-lg mx-auto">
                <Header/>
                {children}
                <Footer/>
            </div>
        </ClientSideProviders>
        </body>
        </html>
    );
}
