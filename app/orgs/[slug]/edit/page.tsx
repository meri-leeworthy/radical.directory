"use client"

export const dynamic = "force-dynamic"

import { Room, Client, Event } from "simple-matrix-sdk"
import {
  getRoomMessagesIterator,
  getMessagesChunk,
  parseContactKVs,
  parseFaqKVs,
  replaceEditedMessages,
} from "lib/serverUtils"
import { Contact } from "../Contact"
import { useClient } from "lib/useClient"
import { useEffect, useState } from "react"

export default function OrgSlugDashboardPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const roomId = `!${slug}:radical.directory`
  const client = useClient()
  if (!client) return <div>loading...</div>
  // only try to fetch data if we have accessToken and userId from localStorage
  return <HydratedOrgDashboard roomId={roomId} client={client} />
}

function HydratedOrgDashboard({
  roomId,
  client,
}: {
  roomId: string
  client: Client
}) {
  const [name, setName] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [contactKVs, setContactKVs] = useState<
    Record<string, string | undefined>
  >({})
  const [faqKVs, setFaqKVs] = useState<Record<string, string | undefined>>({})

  const room = new Room(roomId, client)

  useEffect(() => {
    console.log("running useEffect to fetch name")
    room.getName().then(value => {
      if (
        !value ||
        typeof value !== "object" ||
        !("name" in value) ||
        typeof value.name !== "string"
      )
        return

      console.log(value.name)
      if (name !== value.name) {
        setName(value.name)
      }
    })
  }, [])

  getRoomMessagesIterator(room).then(messagesIterator => {
    getMessagesChunk(messagesIterator).then(messagesChunk => {
      const messages = messagesChunk.filter(
        (message: Event) => message.type === "m.room.message"
      )
      const replacedMessages = replaceEditedMessages(messages)
      setContactKVs(parseContactKVs(replacedMessages))
      setFaqKVs(parseFaqKVs(replacedMessages))
      setDescription(
        messagesChunk.find((message: Event) => message.type === "m.room.topic")
          .content.topic
      )
    })
  })

  return (
    <>
      <h2 className="font-body">{room.useName()?.name}</h2>
      <button>Edit name</button>

      <p className="py-4 font-body">{description ?? "loading..."}</p>

      <button>Edit description</button>

      <Contact contactKVs={contactKVs} />

      <button>Edit links</button>

      <h3 className="pt-4 font-body">Frequently Asked Questions</h3>
      <ul>
        {Object.entries(faqKVs).map(([question, answer]) => (
          <li key={question}>
            <h4 className="py-2 pt-6 text-lg font-bold font-body">
              {question}
            </h4>
            <p className="pl-4 font-thin font-body">{answer}</p>
            <button>Edit</button>
          </li>
        ))}
      </ul>
    </>
  )
}
