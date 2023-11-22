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
import { useClient } from "lib/useClient"
import { useEffect, useRef, useState } from "react"
import { EditButton } from "./IconButton"
import { EditableDescription } from "./EditableDescription"
import { EditableTitle } from "./EditableTitle"
import { SectionType } from "./SectionType"
import { EditableContactSection } from "./EditableContactSection"
import {
  ContactType,
  DirectoryRadicalContactMetaUnstable,
  directoryRadicalMetaContactUnstable,
} from "lib/types"
import { fetchContactKVs } from "../fetchContactKVs"

//TODO: add a loading state for when we're mutating data

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
  const initialKVs = useRef<Partial<Record<ContactType, string>>>({})
  const room = new Room(roomId, client)

  useEffect(() => {
    // console.log("running useEffect to fetch name")
    room.getName().then(value => {
      if (
        !value ||
        typeof value !== "object" ||
        !("name" in value) ||
        typeof value.name !== "string"
      )
        return

      // console.log(value.name)
      if (name !== value.name) {
        setName(value.name)
      }
    })

    // console.log("running useEffect to fetch contactKVs")
    fetchContactKVs(room).then(contactKVs => {
      // console.log("setting contactKVs:", contactKVs)
      initialKVs.current = contactKVs
      setContactKVs(contactKVs)
    })

    getRoomMessagesIterator(room).then(messagesIterator => {
      getMessagesChunk(messagesIterator).then(messagesChunk => {
        const messages = messagesChunk.filter(
          (message: Event) => message.type === "m.room.message"
        )
        const replacedMessages = replaceEditedMessages(messages)
        // initialKVs.current = parseContactKVs(replacedMessages)
        // setContactKVs(initialKVs.current)

        console.log("replacedMessages", replacedMessages)

        setFaqKVs(parseFaqKVs(replacedMessages))
        setDescription(
          messagesChunk.find(
            (message: Event) => message.type === "m.room.topic"
          ).content.topic
        )
      })
    })
  }, [])

  // mutate room name
  function updateTitle(name: string) {
    room.setName(name)
  }

  // mutate room topic
  function updateDescription(description: string) {
    room.setTopic(description)
  }

  // mutate contact state events
  function updateContact(contactType: ContactType, contactValue: string) {
    const content: DirectoryRadicalContactMetaUnstable = {
      type: contactType,
      value: contactValue,
    }
    // console.log(
    //   "updateContact called with initialKVs.current:",
    //   initialKVs.current
    // )
    // console.log("updateContact called with contactType:", contactType)
    // console.log("updateContact called with contactValue:", contactValue)
    if (
      !(contactType in initialKVs.current) ||
      contactValue !== initialKVs.current[contactType]
    ) {
      // console.log("actually sending request with contactValue:", contactValue)
      // console.log("contactKVs[contactType]:", contactKVs[contactType])
      room
        .sendStateEvent(
          directoryRadicalMetaContactUnstable,
          content,
          contactType
        )
        .then(res => {
          // console.log("after sending contact state event:", res)
          initialKVs.current[contactType] = contactValue
        })
    }
  }

  // instead of FAQ, we have linked post custom event type
  function updateFaq() {}

  return (
    <main className="flex flex-col w-full">
      <EditableTitle
        {...{ editSection, setEditSection, name, setName, updateTitle }}
      />
      <EditableDescription
        {...{
          editSection,
          setEditSection,
          description,
          setDescription,
          updateDescription,
        }}
      />

      <EditableContactSection
        {...{
          editSection,
          setEditSection,
          contactKVs,
          setContactKVs,
          updateContact,
        }}
      />

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
