'use client';

import {contrastColor} from "contrast-color";
import githubColors from "@/assets/github-colors.json";
import {useInfiniteQuery} from "@tanstack/react-query";
import {Page, TStarredRepository} from "@/types";
import {
    CalendarClockIcon,
    EyeIcon,
    GitForkIcon,
    LockIcon,
    PlusIcon,
    ScrollTextIcon,
    StarIcon,
} from "lucide-react";
import {useToggle} from "react-use";

function LanguageTag({language}: { language?: string }) {
    if (!language) {
        return null
    }

    const languageColor: string | undefined = (githubColors as Record<string, string>)[language]
    const languageTextColor = languageColor ? contrastColor({bgColor: languageColor}) : undefined

    return (
        <div className="badge gap-1 badge-neutral"
             style={{backgroundColor: languageColor, color: languageTextColor}}
        >
            {language}
        </div>
    )
}

function TopicTags({topics}: { topics: string[] }) {
    const [isExpanded, toggleExpanded] = useToggle(topics.length < 10)

    return (
        <>
            {topics
                .slice(0, isExpanded ? topics.length : 5)
                .map((tag, index) => (
                    <div key={index} className="badge badge-neutral">
                        {tag}
                    </div>
                ))}
            {!isExpanded && <button onClick={toggleExpanded}
                                    className="btn btn-link btn-xs p-0 gap-0 no-underline">
                <PlusIcon size={12} strokeWidth={3}/>
                {topics.length - 5} more
            </button>}
        </>
    )
}

function StarredRepositoryItem({item}: { item: TStarredRepository }) {
    const stats = [
        {
            url: item.html_url + '/stargazers',
            title: "Stargazers",
            icon: <StarIcon size={14}/>,
            data: item.stargazers_count,
        },
        {
            url: item.html_url + '/watchers',
            title: "Watchers",
            icon: <EyeIcon size={14}/>,
            data: item.watchers_count,
        },
        {
            url: item.html_url + '/forks',
            title: "Forks",
            icon: <GitForkIcon size={14}/>,
            data: item.forks_count,
        },
        {
            url: item.html_url + '/issues',
            title: "Open Issues",
            icon: <ScrollTextIcon size={14}/>,
            data: item.open_issues_count,
        },

    ].map((item, index) => (
        <div key={index}>
            <a href={item.url} target="_blank" rel="noopener noreferrer" title={item.title}
               className="inline-flex items-center gap-1.5 link hover:link-info no-underline"
            >
                {item.icon} {item.data}
            </a>
        </div>
    ))

    return (
        <div key={item.id} className="card card-compact">
            <div className="card-body gap-2.5">
                <div>
                    <a href={item.html_url} target="_blank" rel="noopener noreferrer"
                       className="card-title !m-0 link link-info link-hover"
                    >
                        {item.full_name}
                    </a>
                    <div className="flex gap-4 items-center italic text-base-content/75">
                        <span className="flex items-center gap-1">
                            <CalendarClockIcon size={14}/>
                            Last updated at {new Date(item.updated_at).toLocaleString()}
                        </span>
                        {item.private && (
                            <span className="flex items-center gap-1">
                                <LockIcon size={14}/>
                                Private Repository
                            </span>
                        )}
                    </div>
                </div>
                <p>
                    {item.description}
                </p>
                <div className="flex flex-wrap items-center gap-1">
                    <LanguageTag language={item.language}/>
                    <TopicTags topics={item.topics}/>
                </div>
                <div className="max-w-screen-sm card-actions grid grid-cols-4">
                    {stats}
                </div>
            </div>
        </div>
    )
}

export default function StarredRepositoryList() {
    // TODO: auto fetch next page when scroll to bottom
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
    } = useInfiniteQuery<Page<TStarredRepository>>({
        queryKey: ['starredRepositories'],
        initialPageParam: 1,
        throwOnError: true,
        async queryFn({pageParam = 1}) {
            const url = process.env.NEXT_PUBLIC_BASE_URL + '/api/starred?page=' + pageParam;
            const res = await fetch(url)
            return await res.json()
        },
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage.meta.links.last) return undefined
            else return allPages.length + 1
        }
    })

    // TODO: replace with skeleton loader which then disappear with animation
    if (!data) {
        return (
            <div className="mt-12 text-center">
                <div className="loading loading-spinner"/>
            </div>
        )
    }

    // TODO: virtualize the list
    const items: TStarredRepository[] = data.pages.map((page) => page.data).flat()
    return (
        <>
            <div className="max-w-screen-lg w-full">
                {items.map((item) => <StarredRepositoryItem key={item.id} item={item}/>)}
            </div>
            {hasNextPage && (
                <button onClick={() => (!isFetching && !isFetchingNextPage) && fetchNextPage()}
                        className="btn btn-block">
                    {isFetchingNextPage ? (
                        <>
                            <div className="loading loading-spinner"/>
                            Loading...
                        </>
                    ) : "Load More"}
                </button>
            )}
        </>
    )
}