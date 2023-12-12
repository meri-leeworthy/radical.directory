const { MATRIX_BASE_URL, AS_TOKEN } = process.env

import { validateLengthState } from "app/(openletter)/open-letter-palestine-lgbtiqa/page"
import { NextRequest, NextResponse } from "next/server"
import { Client, Room } from "simple-matrix-sdk"

const ROOM_ID = "!aNyqgXhDKOZKyvYdHa:radical.directory"

export async function GET(request: NextRequest) {
  const end = request.nextUrl.searchParams.get("end")
  const client = new Client(MATRIX_BASE_URL!, AS_TOKEN!, {
    params: { user_id: "@_relay_bot:radical.directory" },
    fetch,
  })
  const room = new Room(ROOM_ID, client)
  // const messagesIterator = await room.getMessagesAsyncGenerator("b", 100)()
  // const chunk = await messagesIterator.next(end)
  const messages = await room.getMessagesOneShotParams({
    from: end,
    limit: 200,
    dir: "b",
  })
  // console.log("calling route handler with ", end)
  return NextResponse.json(messages)
}

export async function PUT(request: NextRequest) {
  const count = await request.json()
  const response = await validateLengthState(count)
  // console.log("open letter count updater response", response)
  return NextResponse.json(response || {})
}
