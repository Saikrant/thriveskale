import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/bricolage-grotesque/wght.css'
import '@fontsource/hind/400.css'
import '@fontsource/hind/500.css'
import './index.css'
import App from './App.jsx'

/* Opt in to scroll-in reveals only when they can run and the user allows motion.
   Without this class all content is simply visible. */
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-reveal')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
