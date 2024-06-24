import {auth} from "@/auth";
import {Octokit} from "octokit";
import {parseLinkHeader} from '@web3-storage/parse-link-header'

export default async function StarCount() {
    const session = await auth();
    const octokit = new Octokit({auth: session?.accessToken});

    // Get the total count of starred repositories
    // by reading the query parameter of the last page link (rel="last" in the link header)
    const data = await octokit.rest.activity.listReposStarredByAuthenticatedUser({per_page: 1, page: 1});
    const links = parseLinkHeader(data.headers.link);
    const count = parseInt(links?.last?.page as string);

    return (
        <span className="sticky px-2 z-10 top-12 font-medium text-base-content/60 text-xs">
                Found {count} starred repositories.
        </span>
    )
}