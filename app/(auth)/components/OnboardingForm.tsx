
"use client"

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast"
import { SyncLoader } from "react-spinners";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const OnboardingForm = ({user}: {user: string | null | undefined}) => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const router = useRouter()


    const stepOneSubmit = () =>{
        setStep(2)
    }
    const stepTwoSubmit  = () =>{
        setLoading(true)
        setTimeout(()=>{
            router.replace("/mykanban")
            toast.success(`Welcome to your new boar ${user}`)
            setLoading(false)
        },5000)
    }

    const goBack =() =>{
        setStep(1);
    }

    return (
    <motion.div
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={variants}
    transition={{duration: 0.5}}
    className="flex flex-col h-full items-center 
    justify-center pt-[82px] w-[90%] mx-auto max-w-[1450px]
     text-white"
    >
        {step === 1 && (
        <motion.div 
        initial={{opacity:0 }}
        animate={{opacity: 1}}
        transition={{duration: 0.5}}
        className="w-full text-center">
            <h1 className="mb-10 text-4xl font-bold uppercase"> 
                 Hey {user} 👋 Let's Give Your Board a Name!                
            </h1>
            <form
            className="flex flex-col gap-10 items-center"
            onSubmit={stepOneSubmit}
          >
            <Input
            type="text"
            name="name"
            placeholder="My board name..."
            >
            </Input>
            <Button text="Continue" type="submit"></Button>
          </form>
            </motion.div>
          )}

          {step ===2 && (

            <motion.div
            initial={{opacity:0 }}
            animate={{opacity: 1}}
            transition={{duration: 0.5}}
            className="w-full text-center"
            >
               <h1 className="mb-10 text-4xl font-bold uppercase"> 
                 Now Let's Add your first task! 😊               
            </h1>
            <form 
            action={stepTwoSubmit}
            className="flex flex-col gap-10 items-center">
            <Input
            type="text"
            name="task"
            placeholder="my fist task.."
            disabled={loading}>
            </Input>

            <div className="flex justify-between w-5/5 mb-10">

            <Button text="&#8592; go back" onClick={goBack} disabled={loading}/>
            <Button text="Continue" type="submit" disabled={loading}/>          
            </div>
            {loading ? (
              <div className="flex gap-3 items-center text-white">
                <SyncLoader color="#fff"/>
                <span>Getting your board ready</span>
              </div>
            ): null}
            </form>
            </motion.div>

    
          )}


    </motion.div>
  )
}
export default OnboardingForm