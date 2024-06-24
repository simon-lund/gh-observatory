'use client'

import {InfoIcon} from "lucide-react";
import clsx from "clsx";
import {useQuery} from "@tanstack/react-query";
import type {TRateLimit} from "@/types";


export default function RateLimitInfo() {
    const {data, isPending} = useQuery<TRateLimit>({
        queryKey: ['rateLimit'],
        refetchInterval: 1000 * 60,
        throwOnError: true,
        async queryFn() {
            const url = '/api/rate-limit';
            const res = await fetch(url, {cache: 'no-store'})
            return await res.json()
        },
    })

    // Rendering
    const limit = (isPending || !data)
        ? <span className="text-neutral-content/75">[loading]</span>
        : <span className="font-bold">{data.limit}</span>
    // TODO: make sticky or appearing on scroll down
    return (
        <div role="alert" className="alert">
            <InfoIcon/>
            <div>
                <h3 className="font-bold">GitHub Rate Limit</h3>
                <p className="text-xs">
                    The GitHub API is rate limited to prevent misuse.
                    You can make up to {limit} requests per hour.
                </p>
            </div>
            {(isPending || !data)
                ? <div className="skeleton w-32 h-5 bg-neutral"/>
                : (
                    <div className={clsx("badge badge-lg badge-success mt-[1px]",
                        data.remaining < 100 && "badge-warning",
                        data.remaining === 0 && "badge-error"
                    )}>
                        <span className="font-medium"> {data.remaining}</span>
                        <span className="ml-1 text-xs">requests left</span>
                    </div>
                )}
        </div>
    )
}