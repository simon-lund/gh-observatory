'use client'

import {useEffect} from "react";

interface ErrorProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function Error({error, reset,}: ErrorProps) {
    // TODO: make more granular error messages
    useEffect(() => {
        // TODO: Log the error to an error reporting service
        //  or use instrumentation.ts (see nextjs docs) if possible
        console.error(error)
    }, [error])

    return (
        <main className="grow flex flex-col items-center px-4">
            <div className="placeholder"/>
            <div className="flex flex-col max-w-96 gap-4">
                <h1 className="text-6xl font-bold text-center">
                    Error
                </h1>
                <p className="text-center">
                    Something went wrong.
                    If you think this is a mistake, please create an issue on the GitHub repository.
                </p>
                <div className="flex justify-center gap-2">
                    <button onClick={reset} className="btn">
                        Try again
                    </button>
                    <a href={process.env.NEXT_PUBLIC_GITHUB_REPO_URL + '/issues/new'} target="_blank" rel="noopener noreferrer"
                       className="btn"
                    >
                        Create an Issue
                    </a>
                </div>
            </div>
        </main>
    )
}