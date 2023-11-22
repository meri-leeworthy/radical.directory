"use client"

import { IconCheck, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react"

export function IconButton({
  children,
  alt,
  label,
  onClick,
}: {
  children: React.ReactNode
  alt: string
  label?: string
  onClick?: () => void
}) {
  return (
    <button
      className="self-start p-1 text-sm bg-[#1D170C11] rounded-full text-[#1D170C99] flex items-center"
      aria-label={alt}
      onClick={onClick}>
      {children}
      {label && <span className="px-1">{label}</span>}
    </button>
  )
}

export function EditButton({
  alt,
  label,
  onClick,
}: {
  alt: string
  label?: string
  onClick?: () => void
}) {
  return (
    <IconButton alt={alt} onClick={onClick} label={label}>
      <IconEdit size={16} />
    </IconButton>
  )
}

export function DoneButton({
  onClick,
  label,
}: {
  onClick?: () => void
  label?: string
}) {
  return (
    <IconButton alt="Done editing" onClick={onClick} label={label}>
      <IconCheck size={16} />
    </IconButton>
  )
}

export function DeleteButton({
  onClick,
  label,
}: {
  onClick?: () => void
  label?: string
}) {
  return (
    <IconButton alt="Delete" onClick={onClick} label={label}>
      <IconTrash size={16} />
    </IconButton>
  )
}

export function AddButton({
  onClick,
  label,
}: {
  onClick?: () => void
  label?: string
}) {
  return (
    <IconButton alt="Add" onClick={onClick} label={label}>
      <IconPlus size={16} />
    </IconButton>
  )
}
