import { currentUser } from "@clerk/nextjs/server";
import OnboardingForm from "../components/OnboardingForm";

const page = async () => {
    const user = await currentUser();
    const userName = user?.firstName ?? "";

    return (     
    <div className="bg-[url('/bg.jpeg')] h-[102vh] relative w-full 
    bg-cover mt-[-75px] overflow-hidden" >
    
    <OnboardingForm user={userName}/>
    </div> );
}
 
export default page;