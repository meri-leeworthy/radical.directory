import { Room, Event } from "simple-matrix-sdk"
import { getRoomMessagesIterator, getMessagesChunk } from "lib/serverUtils"

export async function Org({ room }: { room: Room }) {
  const messagesIterator = await getRoomMessagesIterator(room)
  const messagesChunk: Event[] = await getMessagesChunk(messagesIterator)
  // const messageTypes = messagesChunk.map(message => message.type)
  const topic = messagesChunk.find(message => message.type === "m.room.topic")
  // console.log("topic", topic)
  return (
    <div className="h-24 py-2 my-2 border-[#1D170C33] rounded overflow-clip">
      <h2 className="text-base">{room.useName()?.name}</h2>
      <p className="text-sm italic text-stone-600 line-clamp-3">
        {topic?.content?.topic.slice(0, 300)}
      </p>
    </div>
  )
}
