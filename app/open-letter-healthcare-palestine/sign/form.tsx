"use client"

import { useState } from "react"

export function Form(props: {
  sendSignatory: (name: string, work: string) => void
}) {
  const [name, setName] = useState<string>("")
  const [work, setWork] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("submitting")
    setLoading(true)
    props.sendSignatory(name, work)
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p>
        Thank you for signing. After reviewing for spam will we add your name to
        the list.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        className="px-2 bg-white border dark:bg-black"
        disabled={loading}
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <label htmlFor="email">Field or profession</label>
      <input
        type="text"
        id="email"
        disabled={loading}
        className="px-2 bg-white border dark:bg-black"
        value={work}
        onChange={e => setWork(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="self-center px-2 m-4 border">
        Submit
      </button>
    </form>
  )
}
