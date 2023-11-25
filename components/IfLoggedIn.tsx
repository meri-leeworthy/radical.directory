"use client"

import { useState, useEffect } from "react"

export function IfLoggedIn({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (typeof window === "undefined") return
  const accessToken = localStorage?.getItem("accessToken")
  const userId = localStorage?.getItem("userId")

  return <>{isClient && accessToken && userId && children}</>
}
