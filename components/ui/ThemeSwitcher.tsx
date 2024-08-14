"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { FiMoon, FiSun } from "react-icons/fi"

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(true)
    const {setTheme, resolvedTheme} = useTheme()

   
    useEffect(()=> setMounted(true),[])

    if(!mounted){
        return
    }
    if(resolvedTheme ==="dark"){
    return <FiSun onClick={()=> setTheme("light")}/>
    }  
    if(resolvedTheme ==="light"){
      return <FiMoon onClick={()=> setTheme("dark")}/>
      } 

      

}

export default ThemeSwitcher