import { createContext } from 'preact'
import type { FunctionalComponent } from 'preact'
import { useContext } from 'preact/hooks'

const Context = createContext<boolean>(false)

export function isPrerenderContext(): boolean {
  return useContext(Context)
}

export const PrerenderContext: FunctionalComponent = ({ children }) => {
  return (
    <Context.Provider value={true}>
      {children}
    </Context.Provider>
  )
}
