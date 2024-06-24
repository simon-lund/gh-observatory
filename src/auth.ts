import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import {UnauthorizedError} from "@/errors";
// TODO: fix this
// @ts-ignore
import {NextAuthRequest} from "next-auth/lib";


export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [GitHub],
    callbacks: {
        async session({session, token, user}) {
            if (token.accessToken) {
                session.accessToken = token.accessToken as string
            }
            return session;
        },
        async jwt({token, user, account}) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
    }
})


export function protectedRoute(handler: (req: NextAuthRequest) => Promise<Response>) {
    return auth(async (req) => {
        if (!req.auth?.accessToken) {
            throw new UnauthorizedError();
        }
        return handler(req);
    });
}