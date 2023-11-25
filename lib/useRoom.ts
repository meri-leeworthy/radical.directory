import { Room } from "simple-matrix-sdk"
import { useClient } from "./useClient"

export function useRoom(slug: string) {
  const client = useClient()
  if (!client) return undefined
  return new Room(`!${slug}:radical.directory`, client)
}
