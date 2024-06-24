export type PageLink = {
    page: number,
    per_page: number,
    rel: string,
    url: string
}

export type Page<T> = {
    meta: {
        links: {
            first?: PageLink,
            last?: PageLink,
            prev?: PageLink,
            next?: PageLink,
        }
    },
    data: T[]
}


export type TRateLimit = {
    limit: number;
    used: number;
    remaining: number;
    reset: number;
}

export type TStarredRepository = {
    id: number
    homepage: string
    language: string
    private: boolean
    full_name: string
    forks_count: number
    stargazers_count: number
    watchers_count: number
    open_issues_count: number
    description: string
    html_url: string
    topics: string[]
    created_at: string
    updated_at: string
}