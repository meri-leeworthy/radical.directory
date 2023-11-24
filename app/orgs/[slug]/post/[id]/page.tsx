const { RD_MERI_ACCESS_TOKEN, MATRIX_BASE_URL } = process.env
const MERI_USERID = "@meri:radical.directory"

// export const dynamic = "force-dynamic"

import { Client, Room } from "simple-matrix-sdk"
import Link from "next/link"

export default async function PostPage({
  params,
}: {
  params: { slug: string; id: string }
}) {
  const { slug, id } = params
  const roomId = `!${slug}:radical.directory`
  const client = new Client(
    MATRIX_BASE_URL!,
    RD_MERI_ACCESS_TOKEN!,
    MERI_USERID
  )
  const room = new Room(roomId, client)
  const name = await room.getName()
  const post = await room.getEvent(id)

  const nameString =
    typeof name === "object" &&
    name !== null &&
    "name" in name &&
    typeof name.name === "string"
      ? name.name
      : ""

  return (
    <div>
      <Link
        href={`/orgs/${slug}`}
        className="bg-[#fff9] rounded-full px-2 py-1">
        &larr; {nameString}
      </Link>
      <h1 className="font-body py-2">{post.content?.title}</h1>
      <p className="whitespace-pre-line font-body">{post.content?.body}</p>
    </div>
  )
}
