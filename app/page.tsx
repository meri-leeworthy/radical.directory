const { RD_MERI_ACCESS_TOKEN } = process.env

export const dynamic = "force-dynamic"

import { Client, Room } from "simple-matrix-sdk"
import Link from "next/link"
import { Org } from "./orgs/Org"
import { Suspense } from "react"

const BASE_URL = "https://matrix.radical.directory"
const SPACE_ID = "!LYcDqbaOzMrwVZsVRJ:radical.directory"

async function getSpaceChildIds() {
  const client = new Client(BASE_URL, RD_MERI_ACCESS_TOKEN!)
  const space = new Room(SPACE_ID, client)
  const state = await space.getState()
  const sortedState = Room.sortEvents(state)
  const spaceChildIds = sortedState["m.space.child"].map(
    event => event.state_key
  )
  return spaceChildIds
}

function getIdLocalPart(id: string) {
  return id.split(":")[0].slice(1)
}

export default async function Orgs() {
  const roomIds = await getSpaceChildIds()
  const rooms = roomIds.map(
    roomId => new Room(roomId, new Client(BASE_URL, RD_MERI_ACCESS_TOKEN!))
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
      <section className="opacity-60 font-body">
        <h1 className="my-8 mt-24 text-base">more coming soon...</h1>
        <p>
          we are working on a directory of grassroots organisations in Naarm
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
