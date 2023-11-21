const { RD_MERI_ACCESS_TOKEN, MATRIX_BASE_URL } = process.env

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

const MERI_USERID = "@meri:radical.directory"

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
  const replacedMessages = replaceEditedMessages(messages)
  const contactKVs = parseContactKVs(replacedMessages)
  console.log(contactKVs)
  const faqKVs = parseFaqKVs(replacedMessages)
  const topic = messagesChunk.find(message => message.type === "m.room.topic")

  return (
    <main>
      <h2 className="font-body">{room.useName()?.name}</h2>

      <p className="py-4 font-body whitespace-pre-line">
        {topic?.content?.topic}
      </p>
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
    </main>
  )
}
