import type { SEARCH_ACTIONS } from './SearchContext.actions'

export interface SearchState {
  query: string
  searchType: 'artist' | 'album'
  currentPage: number
}

export type SearchAction =
  | { type: typeof SEARCH_ACTIONS.SET_QUERY; payload: string }
  | { type: typeof SEARCH_ACTIONS.SET_SEARCH_TYPE; payload: SearchState['searchType'] }
  | { type: typeof SEARCH_ACTIONS.SET_PAGE; payload: number }
  | { type: typeof SEARCH_ACTIONS.RESET_SEARCH }
