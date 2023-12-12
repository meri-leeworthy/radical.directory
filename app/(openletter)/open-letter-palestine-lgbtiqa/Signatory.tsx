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
    <li className="pb-2 text-sm lg:text-base flex gap-1 flex-wrap w-full justify-stretch items-center">
      <span className="">{name}</span>
      <hr className="h-0 border-0 border-t-[1px] border-black opacity-30 grow" />
      <div className="justify-self-stretch ml-auto text-right">
        <span className="italic opacity-60">
          {work}
          {work.trim() !== "" && location.trim() !== "" && " • "}
        </span>
        <span className="italic opacity-60">{location}</span>
      </div>
    </li>
  )
}

export function SideSignatory({
  name,
  work,
  location,
}: {
  name: string
  work: string
  location: string
}) {
  return (
    <li className="pb-2 text-right text-sm flex gap-1 flex-col w-56 justify-center">
      <span className="">{name}</span>
      <div className="">
        <span className="italic opacity-60">
          {work}
          {work.trim() !== "" && location.trim() !== "" && " • "}
        </span>
        <span className="italic opacity-60">{location}</span>
      </div>
    </li>
  )
}
