import { Event } from "simple-matrix-sdk"
import { Suspense } from "react"
import { getReactions, messagesToSignatories } from "lib/getReactions"
import { validateLengthState } from "./page"
import { ClientSignatories } from "./ClientSignatories"
import { Signatory } from "./Signatory"

export async function Signatories({
  end,
  messagesIterator,
  length,
  messages,
}: {
  end: string
  messagesIterator: AsyncGenerator
  length?: number
  messages?: Event[]
}) {
  const response = await messagesIterator.next(end)
  const { value } = response
  if (!value) return []
  const messagesToCheck = [...(messages || []), ...value.chunk]
  const combinedReactions = getReactions(messagesToCheck)
  const signatories = messagesToSignatories(
    messagesToCheck,
    combinedReactions
  ).slice(0, 20)
  // const remainingMessages = messagesToCheck.filter(
  //   message => !signatories.find(signatory => signatory.id === message.event_id)
  // )
  const newLength = (length || 0) + signatories.length

  if (value.end.includes("t1-")) {
    const meri = signatories.pop()
    meri && signatories.splice(signatories.length - 5, 0, meri)
    validateLengthState(newLength)
  }

  return (
    <>
      {signatories.map((signatory, i) => (
        <Signatory key={i} {...signatory} />
      ))}
      {/* <Suspense fallback={<div>loading...</div>}>
        <ClientSignatories
          end={value.end}
          length={newLength}
          messages={remainingMessages}
        />
      </Suspense> */}
    </>
  )
}
