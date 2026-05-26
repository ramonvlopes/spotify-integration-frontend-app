import { createContext, useContext, useReducer } from 'react'
import type { Dispatch, ReactNode } from 'react'
import { appReducer, initialAppState } from './AppContext.reducer'
import type { AppState, AppAction } from './AppContext.types'

interface AppContextValue {
  state: AppState
  dispatch: Dispatch<AppAction>
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialAppState)
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used within AppProvider')
  return ctx
}
