"use server"

import { prisma } from "@/util/prisma";
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";

interface user{
    userId: string | null
}

const {userId}: user = auth()

export async function createNewBoard(formData: FormData){
    const name= formData.get("boardname") as string;
    const existingBoard=  await prisma.kanbanBoard.findFirst({
        where:{
            userId: userId!
        }
    })

    if(existingBoard){
        await prisma.kanbanBoard.update({
            where: {
                id: existingBoard.id
            },
            data: {
                name: name
            }
        })
    }else{
        await prisma.kanbanBoard.create({
            data: {
                name: name,
                userId: userId!
            }
        })
    }

    revalidatePath("/")

}

export async function createTask(formData: FormData){

    const name = formData.get("task") as string
    const boardId = formData.get("boardId") as string

    if(!name.trim()){
        return
    }
    await prisma.task.create({
        data: {
            name: name,
            board: {connect:{id: boardId} },
            status: "TODO"
        }
    })

    revalidatePath("/")
}

//edit and delete server actions