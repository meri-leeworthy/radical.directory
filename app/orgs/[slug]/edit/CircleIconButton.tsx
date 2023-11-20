"use client"

import { IconCheck, IconEdit, IconTrash } from "@tabler/icons-react"

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

export function EditButton({
  alt,
  onClick,
}: {
  alt: string
  onClick?: () => void
}) {
  return (
    <CircleIconButton alt={alt} onClick={onClick}>
      <IconEdit size={16} />
    </CircleIconButton>
  )
}

export function DoneButton({ onClick }: { onClick?: () => void }) {
  return (
    <CircleIconButton alt="Done editing" onClick={onClick}>
      <IconCheck size={16} />
    </CircleIconButton>
  )
}

export function DeleteButton({ onClick }: { onClick?: () => void }) {
  return (
    <CircleIconButton alt="Delete" onClick={onClick}>
      <IconTrash size={16} />
    </CircleIconButton>
  )
}
