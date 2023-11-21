"use client"
import { useEffect, useState } from "react"
import { Contact, ContactItem, getIcon, getLabel } from "../Contact"
import { ContactType, contactTypes } from "lib/types"
import {
  AddButton,
  DeleteButton,
  DoneButton,
  EditButton,
} from "./CircleIconButton"
import { SectionType, sections } from "./SectionType"

export function EditableContactSection({
  editSection,
  setEditSection,
  contactKVs,
  setContactKVs,
  updateContact,
}: {
  editSection: SectionType
  setEditSection: (section: SectionType) => void
  contactKVs: Record<string, string | undefined>
  setContactKVs: (contactKVs: Record<string, string | undefined>) => void
  updateContact: (contactType: ContactType, contactValue: string) => void
}) {
  function setContactKV(contactType: ContactType, contactValue?: string) {
    // console.log("setting contact kv", contactType, contactValue)
    setContactKVs({ ...contactKVs, [contactType]: contactValue })
  }
  function removeContactKV(contactType: ContactType) {
    const { [contactType]: _, ...rest } = contactKVs
    setContactKVs(rest)
  }

  if (editSection === sections.contact)
    return (
      <div className="flex justify-between py-4">
        <EditableContacts {...{ contactKVs, setContactKV, removeContactKV }} />
        <DoneButton
          label="Done"
          onClick={() => {
            // console.log("updating contact")
            for (const [contactType, _] of Object.entries(contactTypes)) {
              const contactValue = contactKVs[contactType]
              // if (!contactValue) continue
              // console.log(
              //   "calling updateContact with",
              //   contactType,
              //   contactValue
              // )
              updateContact(contactType as ContactType, contactValue || "")
            }
            setEditSection(null)
          }}
        />
      </div>
    )
  else {
    for (const [contactType, contactValue] of Object.entries(contactKVs)) {
      if (!contactValue) {
        removeContactKV(contactType as ContactType)
      }
    }
    return (
      <div className="flex justify-between py-4">
        <Contact contactKVs={contactKVs} />
        <EditButton
          alt="Edit links"
          onClick={() => setEditSection("contact")}
        />
      </div>
    )
  }
}

function EditableContacts({
  contactKVs,
  setContactKV,
  removeContactKV,
}: {
  contactKVs: Record<string, string | undefined>
  setContactKV: (contactType: ContactType, contactValue?: string) => void
  removeContactKV: (contactType: ContactType) => void
}) {
  const [editingContactType, setEditingContactType] =
    useState<ContactType | null>(null)

  useEffect(() => {
    if (editingContactType === null) {
      for (const [contactType, contactValue] of Object.entries(contactKVs)) {
        if (!contactValue) {
          removeContactKV(contactType as ContactType)
        }
      }
    }
  }, [editingContactType])

  function getAddableContactTypes() {
    return [...Object.keys(contactTypes)]
      .filter(contactType => {
        return !(contactType in contactKVs)
      })
      .map((contactType, i) => {
        return (
          <AddButton
            key={i}
            onClick={() => {
              setEditingContactType(contactType as ContactType)
              setContactKV(contactType as ContactType, "")
            }}
            label={contactType}
          />
        )
      })
  }

  return (
    <ul className="flex flex-col gap-2">
      {Object.entries(contactKVs).map(([contactType, contactValue]) => (
        <EditableContactItem
          key={contactType}
          contactType={contactType as ContactType}
          {...{
            contactValue,
            editingContactType,
            setEditingContactType,
            setContactKV,
            removeContactKV,
          }}
        />
      ))}
      {getAddableContactTypes()}
    </ul>
  )
}

function EditableContactItem({
  editingContactType,
  setEditingContactType,
  contactType,
  contactValue,
  setContactKV,
  removeContactKV,
}: {
  editingContactType: ContactType | null
  setEditingContactType: (contactType: ContactType | null) => void
  contactType: ContactType
  contactValue?: string
  setContactKV: (contactType: ContactType, contactValue?: string) => void
  removeContactKV: (contactType: ContactType) => void
}) {
  const [currentContactValue, setCurrentContactValue] = useState(contactValue)
  if (contactType === editingContactType)
    return (
      <li className="flex items-center gap-1">
        {getIcon(contactType)} <label>{contactType}</label>
        <input
          autoFocus
          value={currentContactValue}
          onChange={e => {
            setCurrentContactValue(e.target.value)
            setContactKV(contactType, e.target.value)
          }}
        />
        <DoneButton onClick={() => setEditingContactType(null)} />
      </li>
    )
  else
    return (
      <li className="flex items-center gap-1">
        <ContactItem {...{ contactType, contactValue }} />
        <EditButton
          alt="Edit links"
          onClick={() => setEditingContactType(contactType)}
        />
        <DeleteButton
          onClick={() => {
            removeContactKV(contactType)
            setEditingContactType(null)
          }}
        />
      </li>
    )
}
