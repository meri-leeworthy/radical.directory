"use client"

import { useClient } from "lib/useClient"
import { useRoom } from "lib/useRoom"
import { useState, useEffect } from "react"
import { Room } from "simple-matrix-sdk"

export function SelectAuthor({
  slug,
  author,
  setAuthor,
}: {
  slug: string
  author: [Room, string] | undefined
  setAuthor: (rooms: [Room, string] | undefined) => void
}) {
  const [isClient, setIsClient] = useState(false)
  const [joinedRooms, setJoinedRooms] = useState<string[]>([])
  const [adminRooms, setAdminRooms] = useState<[Room, string][]>([])
  const room = useRoom(slug)
  const client = useClient()

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    client &&
      client.getJoinedRooms().then(rooms => setJoinedRooms(rooms.joined_rooms))
  }, [client])

  useEffect(() => {
    if (!room || !client) return
    const promises = joinedRooms.map(roomId =>
      Promise.all([roomId, new Room(roomId, client).getPowerLevels()])
    )
    Promise.all(promises).then(powerLevels => {
      const adminRooms = powerLevels
        .filter(([_, room]) => room.users[client.useUserId()] === 100)
        .map(([roomId, _]) => roomId)
      const rooms = adminRooms.map(roomId => new Room(roomId, client))

      const roomNamePromises = rooms.map(room =>
        Promise.all([room, room.getName().catch(() => {})])
      )
      Promise.allSettled(roomNamePromises).then(results => {
        const adminRoomsWithNames: [Room, string][] = results
          .filter(result => result.status === "fulfilled")
          .map((roomName: any) => roomName.value)
          .filter(([_, name]) => "name" in name)
          .map(([room, name]) => [room as Room, name.name as string])
        console.log("roomNames", adminRoomsWithNames)
        setAdminRooms(adminRoomsWithNames)
      })
    })
  }, [client, joinedRooms])

  const thisRoomTuple = adminRooms.find(([room, _]) =>
    room.useID().includes(slug)
  )
  console.log("thisRoomTuple", thisRoomTuple)
  const otherRooms = adminRooms.filter(tuple => tuple !== thisRoomTuple)
  const [thisRoom, thisRoomName] = thisRoomTuple || []

  return (
    <div>
      {isClient && room && client && (
        <>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700">
            Post as
          </label>
          <select
            id="author"
            name="author"
            autoComplete="author"
            value={author ? author[0].useID() : ""}
            onChange={e => {
              const roomId = e.target.value
              const room = adminRooms.find(
                ([room, _]) => room.useID() === roomId
              )
              if (room) setAuthor(room)
            }}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-transparent rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option key={thisRoom?.useID()} value={thisRoom?.useID()}>
              {thisRoomName}
            </option>
            {otherRooms.map(([room, name]) => (
              <option key={room.useID()} value={room.useID()}>
                {name}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  )
}
