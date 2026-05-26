import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <h1 className="text-primary text-2xl font-bold p-8">Spotify Explorer</h1>
      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  )
}

export default App
