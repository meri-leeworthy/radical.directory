"use client"

export function IfLoggedIn({ children }: { children: React.ReactNode }) {
  if (typeof window === "undefined") return
  const accessToken = localStorage.getItem("accessToken")
  const userId = localStorage.getItem("userId")

  return <>{accessToken && userId && children}</>
}
