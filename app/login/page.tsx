"use client"

const MATRIX_BASE_URL = "https://matrix.radical.directory"

import React, { useState } from "react"
import { Client } from "simple-matrix-sdk"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      console.log("Matrix base url", MATRIX_BASE_URL)
      const accessToken = await Client.login(
        MATRIX_BASE_URL!,
        username,
        password
      )
      console.log("Logged in successfully!", accessToken)
    } catch (error) {
      console.error("Error logging in:", error)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginPage
