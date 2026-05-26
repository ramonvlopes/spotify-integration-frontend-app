import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppProvider } from '@/context/AppContext'
import { SearchProvider } from '@/context/SearchContext'
import { ArtistListScreen } from '@/screens/ArtistListScreen'
import { ArtistDetailScreen } from '@/screens/ArtistDetailScreen'
import { FavoritesScreen } from '@/screens/FavoritesScreen'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
})

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <SearchProvider>
            <Routes>
              <Route path="/" element={<ArtistListScreen />} />
              <Route path="/artists/:id" element={<ArtistDetailScreen />} />
              <Route path="/favorites" element={<FavoritesScreen />} />
            </Routes>
            <ToastContainer
              position="bottom-right"
              theme="dark"
              autoClose={4000}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
            />
          </SearchProvider>
        </AppProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
