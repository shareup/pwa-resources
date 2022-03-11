import { createContext } from 'preact'
import type { FunctionalComponent } from 'preact'
import { useContext, useState } from 'preact/hooks'
import { open } from './db'
import type { DB } from './db'
import { useFetched } from './hooks/use-fetched'

type Value = DB | undefined

const Context = createContext<Value>(undefined)

export function useDB(): Value {
  return useContext(Context)
}

export const DBContext: FunctionalComponent = ({ children }) => {
  const { state, error } = useFetched(undefined, () => {
    if (self.indexedDB) {
      return open()
    } else {
      return undefined
    }
  }, [])

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  )
}
