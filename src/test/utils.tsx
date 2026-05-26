/* eslint-disable react-refresh/only-export-components */
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from '@/context/AppContext'
import { SearchProvider } from '@/context/SearchContext'
import type { ReactNode } from 'react'

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  })
}

function AllProviders({ children }: { children: ReactNode }) {
  const queryClient = createTestQueryClient()
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <SearchProvider>{children}</SearchProvider>
        </AppProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

function customRender(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: AllProviders, ...options })
}

export * from '@testing-library/react'
export { customRender as render }
