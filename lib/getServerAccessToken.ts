const {
  RD_PUBLIC_USERNAME,
  RD_RELAY_USERNAME,
  RD_PUBLIC_PASSWORD,
  RD_RELAY_PASSWORD,
  MATRIX_BASE_URL,
} = process.env

export async function getServerAccessToken(type?: "public" | "relay") {
  type = type || "public"
  const username = type === "relay" ? RD_RELAY_USERNAME : RD_PUBLIC_USERNAME
  const password = type === "relay" ? RD_RELAY_PASSWORD : RD_PUBLIC_PASSWORD
  const response = await fetch(`${MATRIX_BASE_URL}/_matrix/client/v3/login`, {
    method: "POST",
    body: JSON.stringify({
      type: "m.login.password",
      identifier: {
        type: "m.id.user",
        user: username,
      },
      password: password,
    }),
    next: {
      revalidate: 3600 * 24,
      tags: ["access_token"],
    },
  })
  const data = await response.json()

  if (!("access_token" in data)) {
    throw new Error("No access token in response")
  }

  return data.access_token
}
