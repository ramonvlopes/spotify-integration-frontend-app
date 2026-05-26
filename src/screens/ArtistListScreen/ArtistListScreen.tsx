import { useState } from 'react'
import { Header } from '@/components/Header'
import { SearchBar } from '@/containers/SearchBar'
import { ArtistGrid } from '@/containers/ArtistGrid'
import { Pagination } from '@/components/Pagination'
import { usePagination } from '@/hooks/usePagination'

const PAGE_SIZE = 10

export function ArtistListScreen() {
  const [total, setTotal] = useState(0)
  const { currentPage, totalPages, goToPage } = usePagination(total, PAGE_SIZE)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6">
        <SearchBar />
        <ArtistGrid onTotalChange={setTotal} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
      </main>
    </div>
  )
}
