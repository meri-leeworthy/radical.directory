"use client"
export function CircleIconButton({
  children,
  alt,
  onClick,
}: {
  children: React.ReactNode
  alt: string
  onClick?: () => void
}) {
  return (
    <button
      className="ml-1 mt-1 self-start p-1 text-sm bg-[#1D170C11] rounded-full text-[#1D170C99]"
      aria-label={alt}
      onClick={onClick}>
      {children}
    </button>
  )
}
