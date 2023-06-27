import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router'
import AuthProvider from './providers/AuthProvider'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className='container mx-auto px-1 lg:px-0'>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </div>
    </QueryClientProvider>
  </React.StrictMode>,
)
