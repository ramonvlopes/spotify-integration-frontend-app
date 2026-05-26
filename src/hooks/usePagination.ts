import { useSearchContext } from '@/context/SearchContext'
import { SEARCH_ACTIONS } from '@/context/SearchContext'

export interface UsePaginationResult {
  currentPage: number
  totalPages: number
  goToPage: (page: number) => void
  goNext: () => void
  goPrevious: () => void
}

export function usePagination(total: number, limit: number): UsePaginationResult {
  const { state, dispatch } = useSearchContext()
  const totalPages = Math.max(1, Math.ceil(total / limit))

  const goToPage = (page: number) => {
    dispatch({ type: SEARCH_ACTIONS.SET_PAGE, payload: page })
  }

  return {
    currentPage: state.currentPage,
    totalPages,
    goToPage,
    goNext: () => goToPage(state.currentPage + 1),
    goPrevious: () => goToPage(state.currentPage - 1),
  }
}
