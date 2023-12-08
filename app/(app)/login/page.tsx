"use client"

const MATRIX_BASE_URL = "https://matrix.radical.directory"

import React, { useState } from "react"
import { Client } from "simple-matrix-sdk"
import { useRouter } from "next/navigation"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      console.log("Matrix base url", MATRIX_BASE_URL)
      const accessToken = await Client.login(
        MATRIX_BASE_URL!,
        username,
        password
      )
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("userId", `@${username}:radical.directory`)
      router.push("/")
    } catch (error) {
      console.error("Error logging in:", error)
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col items-stretch w-80">
      <label className="flex justify-between pb-4">
        Username:
        <input
          type="text"
          value={username}
          className="bg-transparent border border-[#1D170C33] px-1"
          onChange={event => setUsername(event.target.value)}
        />
      </label>
      <label className="flex justify-between pb-4">
        Password:
        <input
          type="password"
          value={password}
          className="bg-transparent border border-[#1D170C33] px-1"
          onChange={event => setPassword(event.target.value)}
        />
      </label>
      <button type="submit" className="self-start">
        Login
      </button>
    </form>
  )
}

export default LoginPage
