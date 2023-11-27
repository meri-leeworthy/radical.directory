const { OPEN_LETTER_PASSWORD } = process.env

export const dynamic = "force-dynamic"

import { Client, Room } from "simple-matrix-sdk"
import { Form } from "./form"
import { Back } from "components/old/Back"
import Link from "next/link"

const BASE_URL = "https://matrix.radical.directory"
const ROOM_ID = "!aNyqgXhDKOZKyvYdHa:radical.directory"
const OPEN_LETTER_USERID = "@openletter:radical.directory"

async function sendSignatory(name: string, work: string) {
  "use server"
  const accessToken = await Client.login(
    BASE_URL,
    "openletter",
    OPEN_LETTER_PASSWORD!
  )
  const client = new Client(BASE_URL, accessToken, OPEN_LETTER_USERID, fetch)
  const room = new Room(ROOM_ID, client)
  const content = {
    body: `name: ${name}\nwork: ${work}`,
    msgtype: "m.text",
  }
  await room.sendMessage(content)
}

export default async function SignLetter() {
  return (
    <>
      <Link href="/open-letter-healthcare-palestine">
        <button
          type="button"
          className="self-center mt-3 mb-6 text-xl sm:self-start">
          &larr; Back
        </button>
      </Link>
      <h1>Add Your Signature</h1>
      <p className="my-4">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae sint,
        quo minima distinctio quisquam beatae enim voluptatem delectus quam
        reprehenderit nemo fugiat eveniet consectetur et, architecto debitis
        fuga tenetur voluptates.
      </p>
      <Form sendSignatory={sendSignatory} />
    </>
  )
}
