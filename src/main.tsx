import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App'
import './styles/globals.css'
import './styles/animations.css'

// Restore intended route from GitHub Pages 404.html SPA fallback
const storedRoute = sessionStorage.getItem('spa-route')
if (storedRoute) {
  sessionStorage.removeItem('spa-route')
  window.history.replaceState(null, '', storedRoute)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
