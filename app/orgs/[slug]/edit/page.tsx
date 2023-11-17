"use client"

// export const dynamic = "force-dynamic"

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
import { IconEdit } from "@tabler/icons-react"

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
  const sections = {
    title: "title",
    description: "description",
    contact: "contact",
    faq: "faq",
  } as const

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
    <main className="flex flex-col w-full">
      <h2 className="flex justify-between font-body">
        {name}
        <EditButton alt="Edit name" />
      </h2>

      <div className="flex py-4">
        <p className="font-body">{description ?? "loading..."}</p>
        <EditButton alt="Edit description" />
      </div>

      <div className="flex justify-between py-4">
        <Contact contactKVs={contactKVs} />
        <EditButton alt="Edit links" />
      </div>

      <h3 className="flex justify-between pt-4 font-body">
        Frequently Asked Questions{" "}
        <EditButton alt="edit frequently asked questions" />
      </h3>
      <ul>
        {Object.entries(faqKVs).map(([question, answer]) => (
          <li key={question}>
            <h4 className="flex justify-between py-2 pt-6 text-lg font-bold font-body">
              {question}
            </h4>
            <p className="pl-4 font-thin font-body">{answer}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}

function EditButton({ alt }: { alt: string }) {
  return (
    <button
      className="ml-1 mt-1 self-start p-1 text-sm bg-[#1D170C11] rounded-full text-[#1D170C99]"
      aria-label={alt}>
      <IconEdit size={16} />
      {/* {children} */}
    </button>
  )
}
