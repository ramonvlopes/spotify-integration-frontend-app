import type { APP_ACTIONS } from './AppContext.actions'

export interface AppState {
  language: 'en-US' | 'pt-BR'
  searchType: 'artist' | 'album'
}

export type AppAction =
  | { type: typeof APP_ACTIONS.SET_LANGUAGE; payload: AppState['language'] }
  | { type: typeof APP_ACTIONS.SET_SEARCH_TYPE; payload: AppState['searchType'] }
