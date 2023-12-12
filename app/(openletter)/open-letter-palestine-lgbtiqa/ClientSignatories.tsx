"use client"

import { getReactions, messagesToSignatories } from "lib/getReactions"
import { Signatory } from "./Signatory"
import { useCallback, useEffect, useRef, useState } from "react"
// import useSWR from "swr"
import { Chunk } from "lib/types"
import { Spinner } from "components/Spinner"

// const fetcher = (input: RequestInfo, init?: RequestInit) =>
//   fetch(input, init).then(res => res.json())
// const { data, error, isLoading } = useSWR(
//   "/api/openletter?end=" + end,
//   fetcher
// )

export function ClientSignatories({}: // end,
// length,
// messages,
{
  // end: string
  // length?: number
  // messages?: Chunk
}) {
  console.log("rendering ClientSignatories")

  const [loadMore, setLoadMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Chunk>([])
  const endRef = useRef<string | undefined>("")
  const ref = useRef<HTMLButtonElement>(null)

  const loadMoreAction = useCallback(
    async (abortController?: AbortController) => {
      console.log("calling callback")
      setLoading(true)
      fetch("/api/openletter?end=" + endRef.current)
        .then(res => res.json())
        .then(data => {
          if (abortController?.signal.aborted) return
          setMessages(current => [...current, ...data?.chunk])
          endRef.current = data.end
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    },
    []
  )

  useEffect(() => {
    const signal = new AbortController()

    const element = ref.current

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && element?.disabled === false) {
        loadMoreAction(signal)
      }
    })

    if (element) {
      observer.observe(element)
    }

    // if (loadMore) {
    //   loadMoreAction(signal).then(() => {
    //     setLoadMore(false)
    //   })
    // }

    return () => {
      signal.abort()
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [loadMoreAction, loadMore])

  // console.log("ends compared", endRef.current)

  const combinedReactions = getReactions(messages)
  const signatories = messagesToSignatories(messages, combinedReactions)

  // const newLength = (length || 0) + signatories.length

  if (endRef.current?.includes("t1-")) {
    console.log("end includes t1-")
    const meri = signatories.pop()
    meri && signatories.splice(signatories.length - 5, 0, meri)
    // validateLengthState(newLength)
    fetch("/api/openletter", {
      method: "PUT",
      body: signatories.length.toString(),
    })
      .then(res => res.json())
      .then(console.log)
  }

  // console.log("ends compared", endRef.current)
  // console.log("signatories", signatories)

  const handleLoadMore = () => {
    setLoadMore(true)
  }

  return (
    <>
      <h3 className="py-4 text-center text-base font-bold">All Signatories</h3>

      {signatories.map((signatory, i) => (
        <Signatory key={i} {...signatory} />
      ))}

      <button onClick={handleLoadMore} ref={ref} className="self-center">
        {loading ? (
          <div className="flex items-center gap-2">
            loading...{" "}
            <Spinner className="w-4 h-4 text-black animate-spin fill-pink-600" />
          </div>
        ) : endRef.current ? (
          "Load More"
        ) : (
          ""
        )}
      </button>
    </>
  )
}
