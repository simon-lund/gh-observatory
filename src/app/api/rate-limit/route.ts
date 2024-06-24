import {auth, protectedRoute} from "@/auth";
import {Octokit} from "octokit";

export const GET = protectedRoute(async (req) => {
    const octokit = new Octokit({auth: req.auth.accessToken});
    const rateLimit = await octokit.rest.rateLimit.get();

    return Response.json(rateLimit.data.rate);
})