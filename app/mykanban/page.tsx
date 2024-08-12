
import Board from "@/components/ui/Board";
import { prisma } from "@/util/prisma";
import { auth } from "@clerk/nextjs/server";

interface userid{
    userId: string | null
}
const page = async () => {
    const {userId}: userid = auth()

    const board= await prisma.kanbanBoard.findFirst({
        where:{
            userId: userId!
        },
        include:{
            tasks: true,
        },
    })
    
    return ( 
   <>
   <Board board={board}/>
    
   </>
    );
}
 
export default page;