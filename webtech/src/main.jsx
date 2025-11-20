import React from 'react'
import ReactDOM from 'react-dom/client'
import { MarketplaceProvider } from './context/MarketplaceContext'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MarketplaceProvider>
      <App />
    </MarketplaceProvider>
  </React.StrictMode>,
)

