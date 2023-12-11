import { Chunk } from "./types"

export function getReactions(chunk: Chunk) {
  return chunk
    .filter(
      message =>
        message?.type === "m.reaction" &&
        ((message?.content && message.content["m.relates_to"]?.key == "👍️") ||
          "👍")
    )
    .map(
      message => message?.content && message.content["m.relates_to"]?.event_id
    )
    .filter((event_id: string) => !!event_id)
}

export function messagesToSignatories(chunk: Chunk, reactions: string[]) {
  const messages = chunk.filter(message => message.type === "m.room.message")

  return messages
    .filter(message => reactions?.includes(message.event_id))
    .filter(
      message =>
        message?.content?.body?.includes("name:") &&
        message.content.body?.includes("\nwork:") &&
        message.content.body?.includes("\nlocation:")
    )
    .map(message => ({
      tuple: message?.content?.body
        ?.split("\n")
        .flatMap((line: string) => line.split(":")),
      id: message.event_id,
    }))
    .map(({ tuple: [_name, name, _work, work, _location, location], id }) => ({
      name,
      work,
      location,
      id,
    }))
}
