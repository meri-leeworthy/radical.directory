"use client"

import { useRouter } from "next/navigation"
import { Suspense } from "react"

const LoginLogout = () => {
  const router = useRouter()
  const accessToken =
    typeof localStorage !== "undefined" && localStorage.getItem("accessToken")

  const handleLogout = () => {
    if (typeof window === "undefined") return null
    if (accessToken) {
      localStorage.removeItem("accessToken")
      location.reload()
    } else {
      router.push("/login")
    }
  }

  return (
    <button onClick={handleLogout}>
      <Suspense fallback="login">{accessToken ? "logout" : "login"}</Suspense>
    </button>
  )
}

export default LoginLogout
