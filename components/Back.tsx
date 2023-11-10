import { useRouter } from "next/navigation"

export const Back = () => {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="self-center mt-6 text-2xl font-bold sm:self-start">
      &larr; Back
    </button>
  )
}
