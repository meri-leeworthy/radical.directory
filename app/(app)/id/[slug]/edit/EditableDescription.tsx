import { EditButton, DoneButton } from "../../../../../components/IconButton"
import { SectionType, sections } from "./SectionType"

export function EditableDescription({
  editSection,
  setEditSection,
  description,
  setDescription,
  updateDescription,
}: {
  editSection: SectionType
  setEditSection: (section: SectionType) => void
  description?: string
  setDescription: (name: string) => void
  updateDescription: (name: string) => void
}) {
  if (editSection === sections.description)
    return (
      <div className="flex justify-between py-4">
        <textarea
          autoFocus
          className="self-start w-full text-base h-80 font-body bg-transparent border border-[#1D170C33] px-2 rounded-md"
          value={description}
          id="description"
          aria-label="group-description"
          onChange={e => setDescription(e.target.value)}
        />
        <DoneButton
          onClick={() => {
            setEditSection(null)
            if (!description) throw new Error("description is empty")
            updateDescription(description)
          }}
        />
      </div>
    )
  else
    return (
      <div className="flex py-4">
        <p className="font-body whitespace-pre-line">
          {description ?? "loading..."}
        </p>
        <EditButton
          alt="Edit description"
          onClick={() => setEditSection("description")}
        />
      </div>
    )
}
