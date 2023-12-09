import { useEffect, useState } from "react"
import { Client } from "simple-matrix-sdk"

export const BASE_URL = "https://matrix.radical.directory"
export const ACCESSTOKEN_STORAGE_KEY = "accessToken"
export const USERID_STORAGE_KEY = "userId"

export function useClient() {
  const [client, setClient] = useState<Client | null>(null)
  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESSTOKEN_STORAGE_KEY)
    const userId = localStorage.getItem(USERID_STORAGE_KEY)

    if (accessToken && userId) {
      setClient(new Client(BASE_URL, accessToken, { userId, fetch }))
    }
  }, [])
  return client
}
