import { Room } from "simple-matrix-sdk"
import { contactTypes } from "lib/types"

export async function fetchContactKVs(room: Room) {
  const promises = Object.entries(contactTypes).map(([contactType]) =>
    room
      .getStateEvent("directory.radical.contact.meta.unstable", contactType)
      .catch(() => undefined)
  )

  const values = await Promise.all(promises)

  const contactKVs: Record<string, string | undefined> = {}
  for (const [i, value] of values.entries()) {
    if (!value || typeof value !== "object") continue
    const contactType = Object.keys(contactTypes)[i]
    if (
      !("type" in value) ||
      typeof value.type !== "string" ||
      !("value" in value) ||
      typeof value.value !== "string" ||
      value.value === ""
    )
      continue
    contactKVs[contactType] = value.value
  }

  return contactKVs
}
