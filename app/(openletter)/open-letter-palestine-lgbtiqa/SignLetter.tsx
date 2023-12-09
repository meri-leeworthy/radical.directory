const { OPEN_LETTER_PASSWORD, AS_TOKEN } = process.env

export const dynamic = "force-dynamic"

import { Client, Room } from "simple-matrix-sdk"
import { Form } from "./Form"

const BASE_URL = "https://matrix.radical.directory"
const ROOM_ID = "!aNyqgXhDKOZKyvYdHa:radical.directory"
// const OPEN_LETTER_USERID = "@openletter:radical.directory"

async function sendSignatory(name: string, work: string, location: string) {
  "use server"
  // const accessToken = await Client.login(
  //   BASE_URL,
  //   "openletter",
  //   OPEN_LETTER_PASSWORD!,
  //   fetch
  // )
  // const client = new Client(BASE_URL, accessToken, {
  //   userId: OPEN_LETTER_USERID,
  //   fetch,
  // })
  const client = new Client(BASE_URL, AS_TOKEN!, {
    fetch,
    params: {
      user_id: "@_relay_bot:radical.directory",
    },
  })
  const room = new Room(ROOM_ID, client)
  const content = {
    body: `name: ${name}\nwork: ${work}\nlocation: ${location}`,
    msgtype: "m.text",
  }
  await room.sendMessage(content)
}

export async function SignLetter() {
  return (
    <div className="lg:w-60 p-4 lg:p-0 flex flex-col">
      <Form sendSignatory={sendSignatory} />
    </div>
  )
}
