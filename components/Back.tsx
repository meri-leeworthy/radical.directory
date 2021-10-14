import { useRouter } from "next/router";

export const Back = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="self-center sm:self-start text-2xl font-bold mt-6"
    >
      &larr; Back
    </button>
  );
};
