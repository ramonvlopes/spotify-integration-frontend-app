import { createContext, useContext, useReducer } from 'react'
import type { Dispatch, ReactNode } from 'react'
import { searchReducer, initialSearchState } from './SearchContext.reducer'
import type { SearchState, SearchAction } from './SearchContext.types'

interface SearchContextValue {
  state: SearchState
  dispatch: Dispatch<SearchAction>
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState)
  return <SearchContext.Provider value={{ state, dispatch }}>{children}</SearchContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSearchContext(): SearchContextValue {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearchContext must be used within SearchProvider')
  return ctx
}
