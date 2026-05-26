import { SEARCH_ACTIONS } from './SearchContext.actions'
import type { SearchState, SearchAction } from './SearchContext.types'

export const initialSearchState: SearchState = {
  query: '',
  searchType: 'artist',
  currentPage: 1,
}

export function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case SEARCH_ACTIONS.SET_QUERY:
      return { ...state, query: action.payload, currentPage: 1 }
    case SEARCH_ACTIONS.SET_SEARCH_TYPE:
      return { ...state, searchType: action.payload, query: '', currentPage: 1 }
    case SEARCH_ACTIONS.SET_PAGE:
      return { ...state, currentPage: action.payload }
    case SEARCH_ACTIONS.RESET_SEARCH:
      return { ...initialSearchState }
    default:
      return state
  }
}
