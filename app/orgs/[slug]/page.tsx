/* eslint-disable @next/next/link-passhref */
const { RD_MERI_ACCESS_TOKEN, MATRIX_BASE_URL } = process.env
const MERI_USERID = "@meri:radical.directory"

export const dynamic = "force-dynamic"

import { Room, Client, Event } from "simple-matrix-sdk"
import { getRoomMessagesIterator, getMessagesChunk } from "lib/utils"
import { Contact } from "./Contact"
import { fetchContactKVs } from "../../../components/fetchContactKVs"
import { IconButton } from "../../../components/IconButton"
import { IconSettings } from "@tabler/icons-react"
import Link from "next/link"
import { IfLoggedIn } from "components/IfLoggedIn"
import { NewPost } from "components/NewPost"
import { directoryRadicalPostUnstable } from "lib/types"
import { OrgPosts } from "./OrgPosts"
import { Suspense } from "react"

export default async function OrgSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const roomId = `!${slug}:radical.directory`

  const client = new Client(
    MATRIX_BASE_URL!,
    RD_MERI_ACCESS_TOKEN!,
    MERI_USERID
  )

  const room = new Room(roomId, client)

  console.log(await room.getName())

  const messagesIterator = await getRoomMessagesIterator(room)
  const messagesChunk: Event[] = await getMessagesChunk(messagesIterator)
  const messages = messagesChunk.filter(
    message => message.type === "m.room.message"
  )
  const replacedMessages = Room.replaceEditedMessages(messages)

  const messagesWithoutDeleted = replacedMessages.filter(
    message => !("redacted_because" in message)
  )

  const posts = messagesWithoutDeleted.filter(
    message => message.content?.msgtype === directoryRadicalPostUnstable
  )

  // console.log("posts", posts)

  const avatar = messagesChunk.find(
    (message: Event) => message.type === "m.room.avatar"
  )

  const imageUri = avatar?.content?.url
  const serverName = imageUri.split("://")[1].split("/")[0]
  const mediaId = imageUri.split("://")[1].split("/")[1]
  const avatarUrl = `https://matrix.radical.directory/_matrix/media/r0/download/${serverName}/${mediaId}`

  const contactKVs = await fetchContactKVs(room)

  const topic = messagesChunk.find(message => message.type === "m.room.topic")

  return (
    <>
      <main className="flex flex-col lg:flex-row-reverse gap-4">
        <section className="lg:w-48 w-full flex flex-col lg:flex-col-reverse justify-start lg:justify-end">
          <p className="py-4 font-body lg:font-sans lg:opacity-80 whitespace-pre-line lg:text-xs">
            {topic?.content?.topic}
          </p>
          <Contact contactKVs={contactKVs} />
          {avatar?.content?.url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt="avatar" width="120" />
          )}
        </section>

        <section className="w-full">
          <div className="flex justify-between items-center">
            <h2 className="font-body">{room.useName()?.name}</h2>
            <IfLoggedIn>
              <Link href={`/orgs/${slug}/edit`}>
                <IconButton alt="edit page">
                  <IconSettings size={16} />
                </IconButton>
              </Link>
            </IfLoggedIn>
          </div>
          <Suspense fallback={<div>loading...</div>}>
            <IfLoggedIn>
              <NewPost slug={slug} />
            </IfLoggedIn>
          </Suspense>

          <OrgPosts posts={posts} slug={slug} />
        </section>
      </main>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const roomId = `!${slug}:radical.directory`

  const room = new Room(
    roomId,
    new Client(MATRIX_BASE_URL!, RD_MERI_ACCESS_TOKEN!, MERI_USERID)
  )
  console.log(await room.getName())
  const messagesIterator = await getRoomMessagesIterator(room)
  const messagesChunk: Event[] = await getMessagesChunk(messagesIterator)
  const topic = messagesChunk.find(message => message.type === "m.room.topic")

  return {
    title: room.useName()?.name,
    description: topic?.content?.topic,
  }
}
