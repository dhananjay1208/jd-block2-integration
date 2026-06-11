import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)

// Dev-only content checks. Stripped from the production bundle.
if (import.meta.env.DEV) {
  void import('./content/validate').then((m) => m.validateModules())
}
