import { searchReducer, initialSearchState } from './SearchContext.reducer'
import { SEARCH_ACTIONS } from './SearchContext.actions'

describe('searchReducer', () => {
  it('SET_QUERY updates query and resets page to 1', () => {
    const state = searchReducer(
      { ...initialSearchState, currentPage: 3 },
      { type: SEARCH_ACTIONS.SET_QUERY, payload: 'radiohead' },
    )
    expect(state.query).toBe('radiohead')
    expect(state.currentPage).toBe(1)
  })

  it('SET_SEARCH_TYPE clears query and resets page', () => {
    const state = searchReducer(
      { ...initialSearchState, query: 'test', currentPage: 2 },
      { type: SEARCH_ACTIONS.SET_SEARCH_TYPE, payload: 'album' },
    )
    expect(state.searchType).toBe('album')
    expect(state.query).toBe('')
    expect(state.currentPage).toBe(1)
  })

  it('SET_PAGE updates currentPage', () => {
    const state = searchReducer(initialSearchState, {
      type: SEARCH_ACTIONS.SET_PAGE,
      payload: 5,
    })
    expect(state.currentPage).toBe(5)
  })

  it('RESET_SEARCH returns to initial state', () => {
    const modified = { query: 'test', searchType: 'album' as const, currentPage: 4 }
    const state = searchReducer(modified, { type: SEARCH_ACTIONS.RESET_SEARCH })
    expect(state).toEqual(initialSearchState)
  })

  it('returns state for unknown action', () => {
    const state = searchReducer(initialSearchState, { type: 'UNKNOWN' } as never)
    expect(state).toEqual(initialSearchState)
  })
})
