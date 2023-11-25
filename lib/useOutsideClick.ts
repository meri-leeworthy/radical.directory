import { useEffect, useRef } from "react"

//https://www.robinwieruch.de/react-hook-detect-click-outside-component/
//didn't quite finish getting this to work

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLButtonElement>()

  useEffect(() => {
    const handleClick = (event: any) => {
      callback()
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return ref
}
