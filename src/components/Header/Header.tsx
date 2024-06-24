import {TelescopeIcon} from "lucide-react";
import Link from "next/link";
import {auth, signOut} from "@/auth";
import Image from "next/image";
import GithubMarkWhiteSVG from "@/assets/github-mark-white.svg";


export default async function Header() {
    const session = await auth();

    return (
        <header className="z-10 sticky top-0 px-4 pb-1 bg-base-100/75 backdrop-blur">
            <nav className="navbar">
                <div className="navbar-start gap-8">
                    <Link href="/" title={"To the observatory"} className="flex items-center gap-2 leading-none">
                        <TelescopeIcon size={30}/>
                        <span>The GitHub <span className="font-bold">Observatory</span></span>
                    </Link>
                </div>
                <div className="navbar-end gap-8">
                    {session ? (
                        <form action={async () => {
                            'use server';
                            await signOut({redirect: true, redirectTo: '/signin'})
                        }}>
                            <button className="link link-hover">
                                Sign Out
                            </button>
                        </form>
                    ) : (
                        <Link href="/signin" className="link link-hover">
                            Sign In
                        </Link>
                    )}
                    <a href={process.env.NEXT_PUBLIC_GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer"
                       title="View the source code on GitHub"
                    >
                        <Image src={GithubMarkWhiteSVG} width={30} alt={"Github logo"}/>
                    </a>
                </div>
            </nav>
        </header>
    )
}