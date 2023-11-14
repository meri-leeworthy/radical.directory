const { RD_MERI_ACCESS_TOKEN } = process.env

export const dynamic = "force-dynamic"

import { Room, Client, Event } from "simple-matrix-sdk"

async function getMessagesChunk(messagesIterator: AsyncGenerator) {
  const { value } = await messagesIterator.next()
  return value.chunk
}

async function getRoomMessagesIterator(room: Room) {
  const messagesIterator = room.getMessagesAsyncGenerator()()
  return messagesIterator
}

function parseContactKVs(
  messages: Event[]
): Record<string, string | undefined> {
  const contactMetaMsgs = messages
    .filter(message => message.content?.body?.includes("CONTACT\n"))
    .map(message => message.content?.body)
  return contactMetaMsgs
    .map(message =>
      message
        .split("\n")
        .slice(1)
        .flatMap((line: string) => line.split(": ", 2))
    )
    .reduce((object, tuple) => {
      const [key, value] = tuple
      object[key.toLowerCase()] = value
      return object
    }, {})
}

function parseFaqKVs(messages: Event[]): Record<string, string | undefined> {
  const faqMetaMsgs = messages
    .filter(message => message.content?.body?.includes("FAQ: "))
    .map(message => message.content?.body)
  return faqMetaMsgs
    .map(message => message.split("FAQ: ").slice(1, 2)[0].split("\n"))
    .reduce((object, tuple) => {
      const [key, ...values] = tuple
      object[key] = values.join("\n")
      return object
    }, {})
}

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

  const contactKVs = parseContactKVs(messages)
  console.log("contactKVs", contactKVs)

  const faqKVs = parseFaqKVs(messages)
  console.log(faqKVs)

  const topic = messagesChunk.find(message => message.type === "m.room.topic")
  console.log("topic", topic?.content.topic)

  return (
    <>
      <h2 className="font-body">{room.useName()?.name}</h2>

      <p className="py-4 font-body">{topic?.content?.topic}</p>
      <ul className="py-4 text-sm font-body columns-2 opacity-60">
        {contactKVs.email && (
          <li>
            <a href={`mailto: ${contactKVs.email}`}>{contactKVs.email}</a>
          </li>
        )}
        {contactKVs.website && (
          <li>
            <a href={contactKVs.website}>{contactKVs.website}</a>
          </li>
        )}
        {contactKVs.twitter && (
          <li>
            TW:{" "}
            <a href={`https://twitter.com/${contactKVs.twitter.split("@")[1]}`}>
              {contactKVs.twitter}
            </a>
          </li>
        )}
        {contactKVs.instagram && (
          <li>
            IG:{" "}
            <a
              href={`https://instagram.com/${
                contactKVs.instagram.split("@")[1]
              }`}>
              {contactKVs.instagram}
            </a>
          </li>
        )}
        {contactKVs.facebook && (
          <li>
            FB:{" "}
            <a
              href={`https://facebook.com/${
                contactKVs.facebook.split("/")[1]
              }`}>
              {contactKVs.facebook}
            </a>
          </li>
        )}
        {contactKVs.newsletter && (
          <li>
            <a href={contactKVs.newsletter}>Newsletter</a>
          </li>
        )}
        {contactKVs.linktree && (
          <li>
            <a href={contactKVs.linktree}>Linktree</a>
          </li>
        )}
      </ul>

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
