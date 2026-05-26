import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppProvider } from '@/context/AppContext'
import { SearchProvider } from '@/context/SearchContext'

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
            <div className="min-h-screen bg-background text-text-primary">
              <h1 className="text-primary text-2xl font-bold p-8">Spotify Explorer</h1>
            </div>
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
