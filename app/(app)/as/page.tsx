import { Client } from "simple-matrix-sdk"
const { AS_TOKEN, MATRIX_BASE_URL } = process.env

export const dynamic = "force-dynamic"

export default async function ApplicationServiceTest() {
  const client = new Client(MATRIX_BASE_URL!, AS_TOKEN!, "", fetch)

  // const account = await client.get("account/whoami", {
  //   user_id: "@_relay_bot:radical.directory",
  // })

  const register = await client.post("register", {
    type: "m.login.application_service",
    username: "_relay_bot",
  })

  // console.log("account", account)
  console.log("register", register)

  return (
    <>
      <h1>Application Service Test</h1>
      <p>Account: </p>
    </>
  )
}
