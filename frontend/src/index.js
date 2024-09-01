// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter  } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'  // This will be your main App component
import setupInterceptors from './utils/setupInterceptors'
import api from './utils/api'
import Navbar from './components/Navbar'

const queryClient = new QueryClient()

// Setup Axios interceptors
setupInterceptors(api)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)