import { useRouter } from "next/navigation"

export const Back = () => {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="self-start mb-3 text-base sm:self-start">
      &larr; Back
    </button>
  )
}
