import { Room, Event } from "simple-matrix-sdk"

export const noCacheFetch = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, { ...init, cache: "no-store" })

export const getCacheTagFetch =
  (tags: string[], revalidate: number) =>
  (input: RequestInfo, init?: RequestInit) =>
    fetch(input, {
      ...init,
      next: {
        revalidate,
        tags,
      },
    })

export async function getMessagesChunk(messagesIterator: AsyncGenerator) {
  const { value } = await messagesIterator.next()
  return value.chunk
}

export async function getRoomMessagesIterator(room: Room) {
  const messagesIterator = room.getMessagesAsyncGenerator()()
  return messagesIterator
}

export function parseContactKVs(
  messages: Event[]
): Record<string, string | undefined> {
  const contactMetaMsgs = messages
    .filter(message => message.content?.body?.includes("CONTACT\n"))
    .map(message => message.content?.body)
  const initialObject: Record<string, string | undefined> = {}
  return contactMetaMsgs
    .map(message =>
      message
        ?.split("\n")
        .slice(1)
        .flatMap((line: string) => line.split(": ", 2))
    )
    .reduce((object, tuple) => {
      if (!tuple) return object
      const [key, value] = tuple
      object[key.toLowerCase()] = value
      return object
    }, initialObject)
}

export function parseFaqKVs(
  messages: Event[]
): Record<string, string | undefined> {
  const faqMetaMsgs = messages
    .filter(message => message.content?.body?.includes("FAQ: "))
    .map(message => message.content?.body)
  const initialObject: Record<string, string | undefined> = {}
  return faqMetaMsgs
    .map(message => message?.split("FAQ: ").slice(1, 2)[0].split("\n"))
    .reduce((object, tuple) => {
      if (!tuple) return object
      const [key, ...values] = tuple
      object[key] = values.join("\n")
      return object
    }, initialObject)
}

export function replaceEditedMessages(messages: Event[]) {
  const editedMessages = messages.filter(
    message => message?.content && "m.new_content" in message.content
  )

  const editedMessageIds = editedMessages.map(
    message =>
      message?.content &&
      "m.relates_to" in message.content &&
      message.content["m.relates_to"].event_id
  )

  const originalMessages = messages.filter(message =>
    editedMessageIds.includes(message.event_id)
  )

  const newMessages = messages.filter(
    message => !editedMessageIds.includes(message.event_id)
  )

  const originalMessagesWithEditedBodies = originalMessages.map(message => {
    const thisEditedMessage = editedMessages.find(
      editedMessage =>
        editedMessage?.content &&
        "m.relates_to" in editedMessage.content &&
        editedMessage.content["m.relates_to"].event_id === message.event_id
    )
    const editedBody =
      thisEditedMessage?.content && thisEditedMessage.content.body
    // "m.new_content" in thisEditedMessage.content &&
    // thisEditedMessage.content["m.new_content"].body
    return { ...message, content: { ...message.content, body: editedBody } }
  })
  return [...newMessages, ...originalMessagesWithEditedBodies]
}

function doubleDigit(number: number) {
  return number < 10 ? `0${number}` : number
}

export function getContextualDate(ts: number) {
  const date = new Date(ts)
  const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`
  const timeString = `${doubleDigit(date.getHours())}:${doubleDigit(
    date.getMinutes()
  )}`

  const now = new Date()

  const isDateToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  const isDateYesterday =
    date.getDate() === now.getDate() - 1 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  const isDateThisWeek =
    date.getDate() >= now.getDate() - 7 &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()

  const contextualDate = isDateToday
    ? `Today, ${timeString}`
    : isDateYesterday
    ? `Yesterday, ${timeString}`
    : isDateThisWeek
    ? `${date.toLocaleString("default", {
        weekday: "long",
      })}, ${timeString}`
    : `${dateString}, ${timeString}`

  return contextualDate
}
