"use client"

import React, { useEffect, useState } from "react"
import { BoardTypes, Task } from "@/types/types"
import { useRouter } from "next/navigation"
import { DragDropContext, DropResult } from "@hello-pangea/dnd"
import Column from "./Column"
import axios from "axios"
import { SyncLoader } from "react-spinners"

export const Board: React.FC<{board: BoardTypes | null }> = ({board}) => {
    
    const [tasks, setTasks] = useState<Task[] | null >(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    // STATE FOR MODAL 



    useEffect(() => {
        if (board) {
          setTasks(board.tasks)
          setLoading(false)
        } else {
          router.push("/onboarding")
        }
      }, [board])
        //MODAL CONSTROLS

        const onDragEnd = (result: DropResult) => {
            const { source, destination, draggableId } = result;
        
            if (!destination) return;
        
            if (
              source.droppableId === destination.droppableId &&
              source.index === destination.index
            )
              return;
        
            const draggedTask = tasks!.find(
              (task) => task.id === draggableId
            );
        
            let updatedStatus: string
        
            switch (destination.droppableId) {
              case "todo":
                updatedStatus = "TODO"
                break
              case "inProgress":
                updatedStatus = "IN_PROGRESS"
                break
              case "completed":
                updatedStatus = "DONE"
                break
              default:
                updatedStatus = draggedTask!.status
            }
        
            try {
              axios.post("/api/updateTaskStatus", {
                taskId: draggableId,
                newStatus: updatedStatus,
              });
            } catch (error) {
              console.log(error)
            }
        
            const updatedTask = tasks!.map((task) => {
              if (task.id === draggableId) {
                return {
                  ...task,
                  status: updatedStatus,
                };
              }
              return task
            });
        
            setTasks(updatedTask)
          };
        

        if(loading){
            return (
            <div className="h-screen w-full flex 
            justify-center items-center ">
                <SyncLoader color="#fff"></SyncLoader>
            </div>
            )
        }

        return (
            <div className="dark:bg-gray-900 py-10 relative h-screen">
              <h1 className="font-bold text-center mb-10 text-3xl">
                {board!.name}
              </h1>
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid md:grid-cols-3 max-md:items-center w-[90%] max-w-[1500px] mx-auto md:gap-5 gap-10">
                  
                  <Column
                    title="Todo"
                    tasks={tasks!.filter(
                      (task) => task.status === "TODO"
                    )}
                    droppableId="todo"
                  />
                  <Column
                    title="In Progress"
                    tasks={tasks!.filter(
                      (task) => task.status === "IN_PROGRESS"
                    )}
                    droppableId="inProgress"
                  />
                  <Column
                    title="Completed"
                    tasks={tasks!.filter(
                      (task) => task.status === "DONE"
                    )}
                    droppableId="completed"
                  />
                </div>
              </DragDropContext>
            </div>
          );
        };

export default Board;