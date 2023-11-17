"use client"
import { IconCheck, IconEdit } from "@tabler/icons-react"
import { CircleIconButton } from "./CircleIconButton"

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
