const { RD_MERI_ACCESS_TOKEN } = process.env

export const dynamic = "force-dynamic"

import { Room, Client, Event } from "simple-matrix-sdk"
import {
  getRoomMessagesIterator,
  getMessagesChunk,
  parseContactKVs,
  parseFaqKVs,
  replaceEditedMessages,
} from "lib/serverUtils"
import { Contact } from "./Contact"

export default async function OrgSlugPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const roomId = `!${slug}:radical.directory`

  const room = new Room(
    roomId,
    new Client("https://matrix.radical.directory", RD_MERI_ACCESS_TOKEN!)
  )

  console.log(await room.getName())

  const messagesIterator = await getRoomMessagesIterator(room)
  const messagesChunk: Event[] = await getMessagesChunk(messagesIterator)
  const messages = messagesChunk.filter(
    message => message.type === "m.room.message"
  )
  const replacedMessages = replaceEditedMessages(messages)
  const contactKVs = parseContactKVs(replacedMessages)
  console.log(contactKVs)
  const faqKVs = parseFaqKVs(replacedMessages)
  const topic = messagesChunk.find(message => message.type === "m.room.topic")

  return (
    <>
      <h2 className="font-body">{room.useName()?.name}</h2>

      <p className="py-4 font-body">{topic?.content?.topic}</p>
      <Contact contactKVs={contactKVs} />

      <h3 className="pt-4 font-body">Frequently Asked Questions</h3>
      <ul>
        {Object.entries(faqKVs).map(([question, answer]) => (
          <li key={question}>
            <h4 className="py-2 pt-6 text-lg font-bold font-body">
              {question}
            </h4>
            <p className="pl-4 font-thin font-body">{answer}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
