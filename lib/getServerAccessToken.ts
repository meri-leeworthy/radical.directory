const { RD_PUBLIC_USERNAME, RD_PUBLIC_PASSWORD, MATRIX_BASE_URL } = process.env

export async function getServerAccessToken() {
  const response = await fetch(`${MATRIX_BASE_URL}/_matrix/client/v3/login`, {
    method: "POST",
    body: JSON.stringify({
      type: "m.login.password",
      identifier: {
        type: "m.id.user",
        user: RD_PUBLIC_USERNAME,
      },
      password: RD_PUBLIC_PASSWORD,
    }),
    next: {
      revalidate: 3600 * 24,
    },
  })
  const data = await response.json()

  if (!("access_token" in data)) {
    throw new Error("No access token in response")
  }

  return data.access_token
}
