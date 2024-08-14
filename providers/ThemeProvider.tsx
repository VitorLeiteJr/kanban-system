"use client"

import { ThemeProvider } from "next-themes"
import React from "react"

interface children {
    children: React.ReactNode
}


export function Theme ({children}: children) {
  return (
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    >{children}
    </ThemeProvider>
  )
}
