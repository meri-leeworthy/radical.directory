import { IfLoggedIn } from "components/IfLoggedIn"
import { Client } from "simple-matrix-sdk"
const { AS_TOKEN, MATRIX_BASE_URL } = process.env

export const dynamic = "force-dynamic"

async function register() {
  const client = new Client(MATRIX_BASE_URL!, AS_TOKEN!, { fetch })

  const register = await client.post("register", {
    type: "m.login.application_service",
    username: "_relay_bot",
  })

  console.log("register", register)
}

export default async function ApplicationServiceTest() {
  const client = new Client(MATRIX_BASE_URL!, AS_TOKEN!, {
    fetch,
    params: {
      user_id: "@_relay_bot:radical.directory",
    },
  })

  const account = await client.get("account/whoami", {
    user_id: "@_relay_bot:radical.directory",
  })

  console.log("account", account)

  // const asLogin = await client.post("login", {
  //   type: "m.login.application_service",
  //   identifier: {
  //     type: "m.id.user",
  //     user: "_relay_bot",
  //   },
  // })

  // console.log("asLogin", asLogin)

  // const asClient = new Client(MATRIX_BASE_URL!, asLogin.access_token, { fetch })

  const joinedRooms = await client.getJoinedRooms()

  console.log("joinedRooms", joinedRooms)

  const join = await client.post("join/!aClTOIoBPhZNaxWdCH:radical.directory", {
    user_id: "@_relay_bot:radical.directory",
  })

  console.log("join", join)

  //TODO: create form for registering a new AS user
  //TODO: create form for joining a room
  //TODO: create form for checking joined rooms of AS users

  return (
    <IfLoggedIn>
      <h1>Application Service Test</h1>
      <p>Account: </p>
    </IfLoggedIn>
  )
}
