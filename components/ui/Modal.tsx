import toast from "react-hot-toast"
import Button from "./Button"
import Input from "./Input"

interface modal{
    closeModal: () => void,
    title: string,
    action: (FormData: FormData) => Promise<void>,
    value: string,
    isCreate?: boolean,
    isDelete?: boolean,
    isEdit?: boolean
}

const Modal = ({closeModal,title,action,value,isCreate, isDelete,isEdit}: modal) => {


const submitHandler=()=>{

    if(isCreate){
        toast.success("New task created")
    }else if (isEdit){
        toast.success("task has been updated")
    }else if(isDelete){
        toast.success("task has been deleted")
    }
        closeModal()
}

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800
    bg-opacity-50"
    onClick={closeModal}
    >
        <div className="bg-gray-700 rounded-lg p-6 text-white"
        onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="flex justify-center">
                <form action={action} onSubmit={submitHandler}>
                    <Input
                    type="hidden"
                    name="taskId"
                    value={value}>                        
                    </Input>
                    {isEdit && (
                        <Input
                        type="text"
                        name="newTask"
                        placeholder="Enter new task name"
                        fullWidth
                        >
                        </Input>
                    )}
                    {isCreate && (
                    <>
                    <Input
                    type="text"
                    name="task"
                    placeholder="Enter task name"
                    fullWidth
                    >
                    </Input>
                    <Input
                    type="hidden"
                    value={value}
                    name="boardId">
                    </Input>
                    </>
                    )}

                    <div className="mt-5 flex gap-5">
                        <Button
                        confirmButton
                        text="Confirm"
                        type="submit"
                        >                            
                        </Button>
                        <Button
                        text="Cancel"
                        onClick={closeModal}
                        >                            
                        </Button>
                    </div>


                </form>
            </div>
        </div>

    </div>
  )
}

export default Modal