"use client"

const { MATRIX_BASE_URL } = process.env

import { useEffect } from "react"
import { redirect } from "next/navigation"
import { Client } from "simple-matrix-sdk"

const Redirect = ({
  roomId,
  children,
}: {
  roomId: string
  children: JSX.Element
}) => {
  useEffect(() => {
    if (typeof window === "undefined") return
    const accessToken = localStorage.getItem("accessToken")
    const userId = localStorage.getItem("userId")
    if (!accessToken || !userId) redirect("/login")
    const client = new Client(MATRIX_BASE_URL!, accessToken!, userId!)
    client.getJoinedRooms().then(rooms => {
      if (!rooms.joined_rooms.includes(roomId)) redirect("/orgs")
    })
  }, [])

  return children
}

export default Redirect
