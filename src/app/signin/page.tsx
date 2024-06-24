import GithubMarkWhiteSVG from "@/assets/github-mark-white.svg"
import {signIn, auth} from "@/auth";
import Image from "next/image";
import {TelescopeIcon} from "lucide-react";
import {redirect} from "next/navigation";

export default async function SignInPage() {
    const session = await auth()

    const handleSignIn = async () => {
        'use server'
        await signIn("github")
    }

    if (session) {
        redirect("/")
    }

    return (
        <main className="grow flex flex-col items-center p-4">
            <div className="placeholder"/>
            <TelescopeIcon size={100} className="mb-4"/>
            <span className="text-4xl font-light">
                    The GitHub
                </span>
            <h1 className="text-5xl font-bold mb-6">
                OBSERVATORY
            </h1>
            <form className="flex flex-col items-center max-w-screen-sm w-full gap-4" action={handleSignIn}>
                <button type="submit" className="btn gap-4">
                    <Image src={GithubMarkWhiteSVG} width={30} alt={"Github logo"}/>
                    Sign in with GitHub
                </button>
            </form>
        </main>
    )
}