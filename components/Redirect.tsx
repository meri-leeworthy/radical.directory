"use client"

const { MATRIX_BASE_URL } = process.env

import { useEffect } from "react"
import { redirect } from "next/navigation"
import { useClient } from "lib/useClient"

const Redirect = ({
  roomId,
  children,
}: {
  roomId: string
  children: JSX.Element
}) => {
  const client = useClient()
  useEffect(() => {
    if (!client) return
    client.getJoinedRooms().then(rooms => {
      if (!rooms.joined_rooms.includes(roomId)) redirect("/orgs")
    })
  }, [])

  return children
}

export default Redirect
