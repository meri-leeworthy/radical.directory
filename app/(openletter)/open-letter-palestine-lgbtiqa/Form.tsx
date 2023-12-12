"use client"

import { useState } from "react"

export function Form(props: {
  sendSignatory: (name: string, work: string, location: string) => void
}) {
  const [showForm, setShowForm] = useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const [work, setWork] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("submitting")
    setLoading(true)
    await props.sendSignatory(name, work, location)
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p>
        Thank you for signing. <b>It won&apos;t appear straight away.</b> After
        reviewing for spam will we add your name to the list.
      </p>
    )
  }

  return (
    <>
      <button
        className="flex justify-center px-4 py-1 border-black border-2 rounded font-bold bg-black text-pink-200 hover:bg-transparent hover:text-black"
        onClick={() => setShowForm(!showForm)}>
        Add your signature
      </button>
      {showForm && (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col mb-16 py-4">
            <label htmlFor="name" className="text-sm opacity-80">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              className="px-2 mb-2 bg-pink-100 rounded dark:bg-black"
              disabled={loading}
              value={name}
              required
              onChange={e => setName(e.target.value)}
            />
            <label htmlFor="occupation" className="text-sm opacity-80">
              Occupation and/or Union
            </label>
            <input
              type="text"
              id="occupation"
              disabled={loading}
              className="px-2 mb-2 bg-pink-100 rounded dark:bg-black"
              value={work}
              onChange={e => setWork(e.target.value)}
            />
            <label htmlFor="occupation" className="text-sm opacity-80">
              Location
            </label>
            <input
              type="text"
              id="location"
              disabled={loading}
              className="px-2 bg-pink-100  rounded dark:bg-black"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="self-end mt-4 flex justify-center px-2 py-0 border-black border-2 rounded font-bold bg-black text-pink-200 hover:bg-transparent hover:text-black">
              {loading ? "loading..." : "Submit"}
            </button>
          </form>
        </>
      )}
    </>
  )
}
