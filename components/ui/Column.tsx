import { Task } from "@/types/types"
import { Draggable, Droppable } from "@hello-pangea/dnd"
import { useState } from "react"
import { LuDot } from "react-icons/lu"

interface ColumnProps{
  title: string
  tasks: Task[]
  droppableId: string

}

const Column:React.FC<ColumnProps> = ({title,tasks, droppableId}) => {
const [hoverIndex, setHoverIndex] = useState<number | null >(null)
const [taskId, setTaskId] = useState<string | null>(null)
//MODAL STATUS HERE

//MODAL FUNCTIONS

  return (
    <div className="flex-1">
      <div className="flex gap-1 dark:text-white ">
        <h2 className="text-sm font-semibold mb-4 uppercase">
          {title}
        </h2>
        <LuDot></LuDot>
      </div>
      <Droppable droppableId={droppableId}>

      {(provided) =>(
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="dark:bg-gray-800 bg-gray-200 rounded-lg p-4"
       >
        {tasks.map((task, index)=>(
          <Draggable 
          key={task.id}
          draggableId={task.id}
          index={index}>
            {(provided)=>(
              <div className="bg-gray-700 rounded p-2 mb-2 text-white flex justify-between"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onMouseEnter={()=> setHoverIndex(index)}
              onMouseLeave={()=> setHoverIndex(null)}>

              {task.name}
              {hoverIndex === index && ( 
                <div className="flex gap-5">
                  <div className="text-xs text-gray-400 mt-1 
                  cursor-pointer">
                    Edit
                  </div>
                  <div className="text-xs text-gray-400 mt-1 
                  cursor-pointer">
                    Delete
                  </div>

              </div> )}

              </div>
            )}
                </Draggable>
        ))}
        {provided.placeholder}
       </div>
      )}

      </Droppable>
    </div>
  )
}

export default Column