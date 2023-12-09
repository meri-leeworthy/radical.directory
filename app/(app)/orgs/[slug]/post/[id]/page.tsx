const { RD_MERI_ACCESS_TOKEN, MATRIX_BASE_URL } = process.env
const MERI_USERID = "@meri:radical.directory"

// export const dynamic = "force-dynamic"

import { Client, Room } from "simple-matrix-sdk"
import Link from "next/link"
import { getContextualDate } from "lib/utils"

export default async function PostPage({
  params,
}: {
  params: { slug: string; id: string }
}) {
  const { slug, id } = params
  const roomId = `!${slug}:radical.directory`
  const client = new Client(MATRIX_BASE_URL!, RD_MERI_ACCESS_TOKEN!, {
    userId: MERI_USERID,
    fetch,
  })
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
      <h1 className="font-body py-1">{post.content?.title}</h1>
      <span className="opacity-60 text-sm py-4">
        {getContextualDate(post.origin_server_ts)}
      </span>
      <p className="whitespace-pre-line font-body py-4">{post.content?.body}</p>
    </div>
  )
}
