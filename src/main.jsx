import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Router'
import AuthProvider from './providers/AuthProvider'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import Container from './components/Container'

const queryClient = new QueryClient();



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Container>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </Container>
    </QueryClientProvider>
  </React.StrictMode>,
)
