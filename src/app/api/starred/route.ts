import {protectedRoute} from "@/auth";
import {Octokit} from "octokit";
import {parseLinkHeader} from "@web3-storage/parse-link-header";
import {Page, TStarredRepository} from "@/types";
import {BadRequestError, InternalServerError} from "@/errors";

export const GET = protectedRoute(async (req) => {
    // Parse query params
    let page = 1
    const {searchParams} = new URL(req.url)
    const pageParam = searchParams.get("page")

    if (pageParam) {
        try {
            page = parseInt(pageParam)
        } catch (e) {
            throw new BadRequestError("Invalid page number. It must be an integer.")
        }
    }
    if (page < 1) throw new BadRequestError("Invalid page number. It must be greater than 0.")

    // Fetch starred repositories
    const octokit = new Octokit({auth: req.auth.accessToken});
    const starredRepositories = await octokit.rest.activity.listReposStarredByAuthenticatedUser(
        {
            page,
            per_page: 100
        }
    )

    // Get pagination links
    let links: Page<TStarredRepository>["meta"]["links"] = {}
    const parsedLinks = parseLinkHeader(starredRepositories.headers.link)

    // TODO: if something goes wrong here, we have to update the API
    // TODO: this should be properly logged
    if (!parsedLinks) throw new InternalServerError()

    for (const link of Object.keys(parsedLinks)) {
        const parsedLink = parsedLinks[link]
        try {
            // TODO: can we type this properly?
            // @ts-ignore
            links[link] = {
                rel: parsedLink.rel as string,
                url: parsedLink.url as string,
                page: parseInt(parsedLink.page as string),
                per_page: parseInt(parsedLink.per_page as string)
            }
        } catch (e) {
            // TODO: if something goes wrong here, we have to update the API
            // TODO: this should be properly logged
            throw new InternalServerError()
        }
    }

    // Prepare response
    const pageResponse: Page<TStarredRepository> = {
        meta: {links},
        data: starredRepositories.data as TStarredRepository[]
    }
    return Response.json(pageResponse)
})