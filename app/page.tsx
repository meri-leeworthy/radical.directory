const { RD_MERI_ACCESS_TOKEN, MATRIX_BASE_URL } = process.env

export const dynamic = "force-dynamic"

import { Client, Room } from "simple-matrix-sdk"
import Link from "next/link"
import { Org } from "./orgs/Org"
import { Suspense } from "react"
import LoginLogout from "./orgs/LoginLogout"

const SPACE_ID = "!LYcDqbaOzMrwVZsVRJ:radical.directory"
const MERI_USERID = "@meri:radical.directory"

async function getSpaceChildIds() {
  const client = new Client(
    MATRIX_BASE_URL!,
    RD_MERI_ACCESS_TOKEN!,
    MERI_USERID
  )
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
  const rooms = roomIds.map(
    roomId =>
      new Room(
        roomId,
        new Client(MATRIX_BASE_URL!, RD_MERI_ACCESS_TOKEN!, MERI_USERID)
      )
  )
  await Promise.all(rooms.map(async room => await room.getName()))

  rooms.forEach(room => {
    console.log("room name", room.useName())
  })

  // const asyncComponent: JSX.Element = await (async (org: Room) => await Org({ room: org }))

  return (
    <>
      <ul>
        {rooms.map((org, i) => (
          <li key={i}>
            <Link href={`/orgs/${getIdLocalPart(roomIds[i])}`}>
              <Suspense fallback={<>loading...</>}>
                <Org room={org} />
              </Suspense>
            </Link>
          </li>
        ))}
      </ul>
      <section className="opacity-60 font-body mt-24">
        <p>don&apos;t panic, organise!</p>
        <p className="my-4">
          <LoginLogout />
        </p>
        <p>
          chat with us on <a href="https://matrix.org">Matrix</a>:{" "}
          <a
            className="underline"
            href="https://matrix.to/#/#r.d:radical.directory">
            #r.d:radical.directory
          </a>
        </p>
        <p>
          email{" "}
          <a
            className="underline"
            href="mailto:radicaldirectory@protonmail.com">
            radicaldirectory@protonmail.com
          </a>
        </p>
        <p>
          contribute code/ideas on{" "}
          <a className="underline" href="https://github.com/radicaldirectory">
            github
          </a>
        </p>
      </section>
    </>
  )
}
