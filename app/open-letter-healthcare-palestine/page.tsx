const { OPEN_LETTER_PASSWORD } = process.env

export const dynamic = "force-dynamic"

import { Client, Room } from "simple-matrix-sdk"
import Link from "next/link"

const BASE_URL = "https://matrix.radical.directory"
const ROOM_ID = "!aNyqgXhDKOZKyvYdHa:radical.directory"
const OPEN_LETTER_USERNAME = "openletter"
const OPEN_LETTER_USERID = "@openletter:radical.directory"

async function getRoomMessagesIterator() {
  const accessToken = await Client.login(
    BASE_URL,
    OPEN_LETTER_USERNAME,
    OPEN_LETTER_PASSWORD!
  )
  const client = new Client(BASE_URL, accessToken, OPEN_LETTER_USERID, fetch)
  const room = new Room(ROOM_ID, client)
  const messagesIterator = room.getMessagesAsyncGenerator()()
  return messagesIterator
}

async function getMessagesChunk(messagesIterator: AsyncGenerator) {
  const { value } = await messagesIterator.next()
  return value.chunk
}

export default async function Letter() {
  const messagesIterator = await getRoomMessagesIterator()
  const messagesChunk: {
    type: string
    event_id: string
    content: { body: string; msgtype?: string; "m.relates_to"?: any }
  }[] = await getMessagesChunk(messagesIterator)

  console.log("messages", messagesChunk)

  const messages = messagesChunk.filter(
    message => message.type === "m.room.message"
  )

  const reactions = messagesChunk
    .filter(message => message?.type === "m.reaction")
    .map(message => message?.content["m.relates_to"])
    .filter(reaction => reaction?.key === "👍️")
    .map(reaction => reaction?.event_id)

  console.log("reactions", reactions)

  const signatories = messages
    .filter(message => reactions.includes(message.event_id))
    .filter(
      message =>
        message.content.body.includes("name:") &&
        message.content.body.includes("\nwork:")
    )
    .map(message =>
      message.content.body.split("\n").flatMap(line => line.split(":"))
    )
    .map(([_name, name, _work, work]) => ({ name, work }))

  console.log("signatories", signatories)
  return (
    <>
      <h1>An Open Letter from Healthcare Workers</h1>
      <p className="my-4 text-xl">من المياه للمياه</p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae sint,
        quo minima distinctio quisquam beatae enim voluptatem delectus quam
        reprehenderit nemo fugiat eveniet consectetur et, architecto debitis
        fuga tenetur voluptates.
      </p>
      <ul className="p-4">
        {signatories.map(({ name, work }, i) => (
          <li key={i}>
            {name}, <span className="italic text-stone-500">{work}</span>
          </li>
        ))}
      </ul>
      <Link href="/open-letter-healthcare-palestine/sign" className="underline">
        Add your signature
      </Link>
    </>
  )
}
