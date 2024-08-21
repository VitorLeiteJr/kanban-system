"use client"

import { UserButton, useSession } from "@clerk/nextjs";
import Link from "next/link";
import { PiKanban } from "react-icons/pi";
import ThemeSwitcher from "./ui/ThemeSwitcher";
import useRouteCheck from "@/hooks/useRouteCheck";


const Navbar = () => {
    const {isSignedIn} = useSession()
    const onboardingRoute = useRouteCheck(["onboarding"]) 
    const signInPages = useRouteCheck(["sign-in","sign-up"]) 
    const kanbanRoute = useRouteCheck(["mykanban"])   
        return ( 
    <div className={`py-5 bg-transparent relative z-10 w-full ${!kanbanRoute || onboardingRoute ?
        "text-white" : null } ${signInPages && "text-gray-800 dark:text-white" }`}>
        <div className="flex justify-between 
        w-[90%] max-w-[1450px] mx-auto">
            <Link href={"/"}
            className="flex gap-1 items-center text-2xl font-bold uppercase">
            <h1>My Kanban</h1>
            <PiKanban/>
            </Link>
            <div className="flex items-center gap-5" >
                <UserButton afterSignOutUrl="/"/>
              {!kanbanRoute && isSignedIn && !onboardingRoute && 
              ( <Link 
                className="tracking-tight hover:underline"
                href={"/mykanban"}>Go to my Board &#8594;
                </Link>
                )}
                {kanbanRoute || signInPages ? (
                    <ThemeSwitcher/>
                ) : null}
            </div>
            {!isSignedIn && !signInPages && (<Link 
            className="tracking-tight hover:underline"
            href={"/sign-in"}>
            Already a member? Sign In
            </Link>)}
        </div>
        

    </div> );
}
 
export default Navbar;