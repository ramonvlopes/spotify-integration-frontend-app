import { appReducer, initialAppState } from './AppContext.reducer'
import { APP_ACTIONS } from './AppContext.actions'

describe('appReducer', () => {
  it('returns initial state for unknown action', () => {
    const state = appReducer(initialAppState, { type: 'UNKNOWN' } as never)
    expect(state).toEqual(initialAppState)
  })

  it('SET_LANGUAGE updates language', () => {
    const state = appReducer(initialAppState, {
      type: APP_ACTIONS.SET_LANGUAGE,
      payload: 'pt-BR',
    })
    expect(state.language).toBe('pt-BR')
  })

  it('SET_SEARCH_TYPE updates searchType', () => {
    const state = appReducer(initialAppState, {
      type: APP_ACTIONS.SET_SEARCH_TYPE,
      payload: 'album',
    })
    expect(state.searchType).toBe('album')
  })

  it('does not mutate state', () => {
    const original = { ...initialAppState }
    appReducer(initialAppState, { type: APP_ACTIONS.SET_LANGUAGE, payload: 'pt-BR' })
    expect(initialAppState).toEqual(original)
  })
})
