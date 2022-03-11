import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

type Fetched<T> = {
  state: T
  error: Error | undefined
  fetch: () => void
}

export function useFetched<T>(
  initialState: T,
  fetch: () => Promise<T>,
  deps: unknown[]
): Fetched<T> {
  let fetchAgain = false
  let isFetching = false
  const stillMounted = useRef(true)
  const [state, update] = useState<T>(initialState)
  const [error, setError] = useState<Error | undefined>(undefined)

  useEffect(() => {
    stillMounted.current = true
    return () => {
      stillMounted.current = false
    }
  }, deps || [])

  const refetch = useCallback(async () => {
    if (isFetching) {
      fetchAgain = true
      return
    }

    fetchAgain = false
    isFetching = true

    const response = await fetch()

    if (stillMounted.current) {
      // NOTE: we should be careful to not update state when unmounted
      update(response)
    }

    isFetching = false

    if (fetchAgain) {
      setTimeout(() => refetch(), 1)
    }
  }, deps || [])

  const syncRefetch = useCallback(() => {
    refetch().catch(e => setError(e))
  }, deps || [])

  // NOTE: go ahead and call fetch on component mount
  useEffect(() => syncRefetch(), deps)

  return { error, state, fetch: syncRefetch }
}
