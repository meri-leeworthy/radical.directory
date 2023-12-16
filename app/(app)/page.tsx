const { MATRIX_BASE_URL, AS_TOKEN } = process.env

// export const dynamic = "force-dynamic"

import { Client, Room } from "simple-matrix-sdk"
import Link from "next/link"
import { Org } from "./id/[slug]/Org"
import { Suspense } from "react"
import { noCacheFetch } from "lib/utils"
import { Footer } from "../../components/Footer"

const SPACE_ID = "!LYcDqbaOzMrwVZsVRJ:radical.directory"

async function getSpaceChildIds() {
  // const accessToken = await getServerAccessToken()

  // const client = new Client(MATRIX_BASE_URL!, accessToken, {
  //   userId: RD_PUBLIC_USERID!,
  //   fetch,
  // })

  const client = new Client(MATRIX_BASE_URL!, AS_TOKEN!, {
    fetch,
    params: {
      user_id: "@_relay_bot:radical.directory",
    },
  })

  const space = new Room(SPACE_ID, client)
  const state = await space.getState()
  const sortedState = Room.sortEvents(state)
  const filteredChildren = sortedState["m.space.child"].filter(
    event => event.content && "content" in event && "via" in event.content
  )
  const spaceChildIds = filteredChildren.map(event => event.state_key)
  return spaceChildIds
}

function getIdLocalPart(id: string) {
  return id.split(":")[0].slice(1)
}

export default async function Orgs() {
  const roomIds = await getSpaceChildIds()
  // const accessToken = await getServerAccessToken()
  const rooms = roomIds.map(
    roomId =>
      new Room(
        roomId,
        new Client(MATRIX_BASE_URL!, AS_TOKEN!, {
          fetch: noCacheFetch,
          params: {
            user_id: "@_relay_bot:radical.directory",
          },
        })
      )
  )
  await Promise.all(
    rooms.map(async room => {
      try {
        await room.getName()
      } catch (e) {
        console.log(e)
      }
    })
  )

  rooms.forEach(room => {
    console.log("room name", room.useName())
  })

  // const asyncComponent: JSX.Element = await (async (org: Room) => await Org({ room: org }))

  return (
    <>
      <ul>
        {rooms.map((org, i) => (
          <li key={i}>
            <Link href={`/id/${getIdLocalPart(roomIds[i])}`}>
              <Suspense fallback={<>loading...</>}>
                <Org room={org} />
              </Suspense>
            </Link>
          </li>
        ))}
      </ul>
      <Footer />
    </>
  )
}
