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
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-8">
        <SearchBar />
        <ArtistGrid onTotalChange={setTotal} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />
      </main>
    </div>
  )
}
