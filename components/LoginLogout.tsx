"use client"

import Link from "next/link"

const LoginLogout = () => {
  if (typeof window === "undefined") return null
  const accessToken = localStorage.getItem("accessToken")

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    location.reload()
  }

  if (accessToken) {
    return <button onClick={handleLogout}>logout</button>
  } else {
    return <Link href="/login">login</Link>
  }
}

export default LoginLogout
