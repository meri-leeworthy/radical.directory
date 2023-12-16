"use client"

import { useClient } from "lib/useClient"
import { useRoom } from "lib/useRoom"
import { useEffect, useState } from "react"
import { Event, Room } from "simple-matrix-sdk"

export default function RawOrgRoomEvents({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const [events, setEvents] = useState<Event[]>()
  const client = useClient()
  useEffect(() => {
    if (!client) return
    const room = new Room(`!${slug}:radical.directory`, client)
    console.log("room", room)
    const iterator = room?.getMessagesAsyncGenerator()()

    iterator?.next().then(result => {
      const events = result.value.chunk.filter(isEvent)
      setEvents(events)
      console.log("events", events)
    })
  }, [client])
  return (
    <ul className="max-w-xl">
      {events?.map((event, i) => (
        <li key={i} className="py-2 text-sm font-light whitespace-pre-line">
          {JSON.stringify(event)}
        </li>
      ))}
    </ul>
  )
}

const isEvent = (event: any): event is Event => {
  if (!event || typeof event !== "object") return false
  if ("content" in event && typeof event.content !== "object") return false
  return (
    "type" in event &&
    "event_id" in event &&
    "origin_server_ts" in event &&
    "room_id" in event &&
    typeof event.type === "string" &&
    typeof event.event_id === "string" &&
    typeof event.origin_server_ts === "number" &&
    typeof event.room_id === "string"
  )
}
