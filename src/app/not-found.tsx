import Link from "next/link";

export default function NotFound() {
    return (
        <main className="grow flex flex-col items-center px-4">
            <div className="placeholder"/>
            <div className="flex flex-col max-w-96 gap-4">
                <h1 className="text-6xl font-bold text-center">
                    404
                </h1>
                <p className="text-center">
                    The page you are looking for does not exist.
                    If you think this is a mistake, please create an issue on the GitHub repository.
                </p>
                <div className="flex justify-center gap-2">
                    <Link href="/" className="btn">
                        Back to safety
                    </Link>
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