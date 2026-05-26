import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '@/components/Header'
import { SearchBar } from '@/containers/SearchBar'
import { ArtistGrid } from '@/containers/ArtistGrid'
import { Pagination } from '@/components/Pagination'
import { usePagination } from '@/hooks/usePagination'
import { useSearchContext } from '@/context/SearchContext'

const PAGE_SIZE = 10

export function ArtistListScreen() {
  const [total, setTotal] = useState(0)
  const { currentPage, totalPages, goToPage } = usePagination(total, PAGE_SIZE)
  const { state } = useSearchContext()
  const { t } = useTranslation('artists')
  const hasQuery = state.query.trim().length > 0

  if (!hasQuery) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-4 -mt-16">
          <p className="text-text-secondary text-sm">{t('searchPrompt')}</p>
          <div className="w-full max-w-2xl">
            <SearchBar />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-8">
        <SearchBar />
        <ArtistGrid onTotalChange={setTotal} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
      </main>
    </div>
  )
}
