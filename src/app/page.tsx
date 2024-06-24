import {auth} from "@/auth";
import {redirect} from "next/navigation";
import RateLimitInfo from "@/components/RateLimitInfo/RateLimitInfo";
import StarredRepositoryList from "@/components/StarredRepositoryList/StarredRepositoryList";
import StarCount from "@/components/StarCount/StarCount";

export default async function App() {
    const session = await auth();
    if (!session) {
        redirect("/signin");
    }

    return (
        <div className="grow flex flex-col px-4 gap-4">
            {/* TODO: shrink on scroll */}
            <StarCount/>
            <RateLimitInfo/>
            {/* TODO: add filter and sort */}
            <StarredRepositoryList/>
        </div>
    );
}
