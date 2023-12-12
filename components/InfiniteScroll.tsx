"use client"
import * as React from "react"

// currently not used

type loadMoreAction<T extends string = any> = (
  offset: T
) => Promise<readonly [React.JSX.Element, string | null]>

const InfiniteScroll = <T extends string = any>({
  children,
  initialOffset,
  loadMoreAction,
}: React.PropsWithChildren<{
  initialOffset: T
  loadMoreAction: loadMoreAction<T>
}>) => {
  const ref = React.useRef<HTMLButtonElement>(null)
  const [loadMoreNodes, setLoadMoreNodes] = React.useState<React.JSX.Element[]>(
    []
  )

  // const [disabled, setDisabled] = React.useState(false)
  const currentOffsetRef = React.useRef<string | undefined>(initialOffset)
  // const [scrollLoad, setScrollLoad] = React.useState(true);
  const scrollLoad = true
  const [loading, setLoading] = React.useState(false)

  const loadMore = React.useCallback(
    async (abortController?: AbortController) => {
      setLoading(true)

      // @ts-expect-error Can't yet figure out how to type this
      loadMoreAction(currentOffsetRef.current)
        .then(([node, next]) => {
          if (abortController?.signal.aborted) return

          setLoadMoreNodes(prev => [...prev, node])
          if (next === null) {
            currentOffsetRef.current ??= undefined
            // setDisabled(true)
            return
          }

          currentOffsetRef.current = next
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    },
    [loadMoreAction]
  )

  React.useEffect(() => {
    const signal = new AbortController()

    const element = ref.current

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && element?.disabled === false) {
        loadMore(signal)
      }
    })

    if (element && scrollLoad) {
      observer.observe(element)
    }

    return () => {
      signal.abort()
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [loadMore, scrollLoad])

  return (
    <>
      {children}
      {loadMoreNodes}
      <button ref={ref}>{loading ? "Loading..." : "Load More"}</button>
    </>
  )
}

export default InfiniteScroll
