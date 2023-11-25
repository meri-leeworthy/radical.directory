const { RD_MERI_ACCESS_TOKEN, MATRIX_BASE_URL } = process.env
const MERI_USERID = "@meri:radical.directory"

export const dynamic = "force-dynamic"

import { Room, Client, Event } from "simple-matrix-sdk"
import { getRoomMessagesIterator, getMessagesChunk } from "lib/utils"
import { Contact } from "./Contact"
import { fetchContactKVs } from "./fetchContactKVs"
import { IconButton, OptionsButton } from "./edit/IconButton"
import { IconSettings } from "@tabler/icons-react"
import Link from "next/link"
import { IfLoggedIn } from "./IfLoggedIn"
import { NewPost } from "./NewPost"
import { directoryRadicalPostUnstable } from "lib/types"
import { getContextualDate } from "lib/utils"
import { Dropdown } from "./Dropdown"

export default async function OrgSlugPage({
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
  const messages = messagesChunk.filter(
    message => message.type === "m.room.message"
  )
  const replacedMessages = Room.replaceEditedMessages(messages)
  // const oldContactKVs = parseContactKVs(replacedMessages)
  // console.log("oldContactKVs", oldContactKVs)

  const posts = replacedMessages.filter(
    message => message.content?.msgtype === directoryRadicalPostUnstable
  )
  // .filter(message => !(message.content && "m.relates_to" in message.content))

  const contactKVs = await fetchContactKVs(room)

  // const faqKVs = parseFaqKVs(replacedMessages)
  const topic = messagesChunk.find(message => message.type === "m.room.topic")

  return (
    <main>
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

      <p className="py-4 font-body whitespace-pre-line">
        {topic?.content?.topic}
      </p>
      <Contact contactKVs={contactKVs} />

      <IfLoggedIn>
        <NewPost slug={slug} />
      </IfLoggedIn>

      <ul>
        {posts.map(({ content, origin_server_ts, event_id }, i) => (
          <li key={i} className="border-b border-[#1D170C33] pb-4">
            <div className="flex w-full mt-6 justify-between items-center gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Link href={`/orgs/${slug}/post/${event_id.split("$")[1]}`}>
                  <h4 className="text-lg font-bold font-body">
                    {content && "title" in content && content?.title}
                  </h4>
                </Link>
                <span className="opacity-60 text-sm justify-self-start">
                  {getContextualDate(origin_server_ts)}
                </span>
              </div>
              <Dropdown>
                <Link
                  href={`/orgs/${slug}/post/${event_id.split("$")[1]}/edit`}
                  className="right-0">
                  Edit Post
                </Link>
              </Dropdown>
            </div>
            <p className="pl-4 font-thin font-body whitespace-pre-line">
              {content?.body}
            </p>
          </li>
        ))}
      </ul>
    </main>
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
