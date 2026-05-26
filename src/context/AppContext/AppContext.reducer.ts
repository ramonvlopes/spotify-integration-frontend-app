import { APP_ACTIONS } from './AppContext.actions'
import type { AppState, AppAction } from './AppContext.types'

export const initialAppState: AppState = {
  language: 'en-US',
  searchType: 'artist',
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case APP_ACTIONS.SET_LANGUAGE:
      return { ...state, language: action.payload }
    case APP_ACTIONS.SET_SEARCH_TYPE:
      return { ...state, searchType: action.payload }
    default:
      return state
  }
}
