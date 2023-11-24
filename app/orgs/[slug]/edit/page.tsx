"use client"

import { Room, Client, Event } from "simple-matrix-sdk"
import {
  getRoomMessagesIterator,
  getMessagesChunk,
  replaceEditedMessages,
} from "lib/utils"
import { useClient } from "lib/useClient"
import { useEffect, useRef, useState } from "react"
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
import Redirect from "./Redirect"
import { Back } from "components/Back"

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
  return (
    <Redirect roomId={slug}>
      <HydratedOrgDashboard roomId={roomId} client={client} />
    </Redirect>
  )
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
  // const [faqKVs, setFaqKVs] = useState<Record<string, string | undefined>>({})
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

        // setFaqKVs(parseFaqKVs(replacedMessages))
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

  return (
    <main className="flex flex-col w-full">
      <Back />
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
    </main>
  )
}
