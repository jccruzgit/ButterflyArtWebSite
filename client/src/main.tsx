import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/tailwind.css'

import AppRoutes from './routes/AppRoutes'
import { initAnalytics } from './lib/analytics'

initAnalytics()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={AppRoutes} />
  </React.StrictMode>
)
