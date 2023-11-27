"use client"

import { useState } from "react"
import { OptionsButton } from "./IconButton"

export function Dropdown({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="justify-self-end relative ">
      <OptionsButton onClick={() => setIsOpen(!isOpen)} />
      <div
        className={`absolute right-0 mt-1 w-28 bg-white items-end rounded px-1 flex flex-col justify-center ${
          !isOpen && "hidden"
        }`}>
        {children}
      </div>
    </div>
  )
}
