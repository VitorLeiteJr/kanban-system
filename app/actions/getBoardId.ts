import { prisma } from "@/util/prisma"
import { auth } from "@clerk/nextjs/server"

interface user {
    userId: string | null
}

export const getBoardIdForUser = async () =>{

    const {userId}: user = auth() 

    const board= await prisma.kanbanBoard.findFirst({
        where: {
            userId: userId!
        }
    })

    return board ? board.id : null
}