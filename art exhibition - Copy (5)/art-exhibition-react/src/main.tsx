import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CartProvider } from './context/CartContext.tsx'
import { ToastProvider } from './context/ToastContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </CartProvider>
  </React.StrictMode>,
)
