export function Signatory({
  name,
  work,
  location,
}: {
  name: string
  work: string
  location: string
}) {
  return (
    <li className="pb-2 flex flex-col items-start gap-1 w-56">
      <span className="">{name}</span>
      <div className="">
        <span className="italic opacity-60">
          {work.trim() !== "" && `${work} • `}
        </span>
        <span className="italic opacity-60">{location}</span>
      </div>
    </li>
  )
}
