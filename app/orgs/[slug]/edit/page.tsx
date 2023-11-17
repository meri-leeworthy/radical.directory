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
import { EditButton, DoneButton } from "./EditButton"

const sections = {
  title: "title",
  description: "description",
  contact: "contact",
  faq: "faq",
} as const
type SectionType = keyof typeof sections | null

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
  const [editSection, setEditSection] = useState<SectionType>(null)
  const [name, setName] = useState<string | undefined>()
  const [description, setDescription] = useState<string | undefined>()
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
      <EditableTitle {...{ editSection, setEditSection, name, setName }} />
      <EditableDescription
        {...{ editSection, setEditSection, description, setDescription }}
      />

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

function EditableTitle({
  editSection,
  setEditSection,
  name,
  setName,
}: {
  editSection: SectionType
  setEditSection: (section: SectionType) => void
  name?: string
  setName: (name: string) => void
}) {
  if (editSection === sections.title)
    return (
      <div className="flex justify-between">
        <input
          autoFocus
          className="self-start w-full text-lg font-bold font-body bg-transparent border border-[#1D170C33] px-2 rounded-md"
          value={name}
          id="title"
          aria-label="group-name"
          onChange={e => setName(e.target.value)}
        />
        <DoneButton onClick={() => setEditSection(null)} />
      </div>
    )
  else
    return (
      <h2 className="flex justify-between font-body">
        {name ?? "loading..."}
        <EditButton alt="Edit name" onClick={() => setEditSection("title")} />
      </h2>
    )
}

function EditableDescription({
  editSection,
  setEditSection,
  description,
  setDescription,
}: {
  editSection: SectionType
  setEditSection: (section: SectionType) => void
  description?: string
  setDescription: (name: string) => void
}) {
  if (editSection === sections.description)
    return (
      <div className="flex justify-between">
        <textarea
          autoFocus
          className="self-start w-full text-base h-64 font-body bg-transparent border border-[#1D170C33] px-2 rounded-md"
          value={description}
          id="description"
          aria-label="group-description"
          onChange={e => setDescription(e.target.value)}
        />
        <DoneButton onClick={() => setEditSection(null)} />
      </div>
    )
  else
    return (
      <div className="flex py-4">
        <p className="font-body">{description ?? "loading..."}</p>
        <EditButton
          alt="Edit description"
          onClick={() => setEditSection("description")}
        />
      </div>
    )
}
