import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useProgress } from '../store/progress'
import { FacilitatorPanel } from './FacilitatorPanel'
import { LoginGate } from '../launcher/LoginGate'
import { FEATURES } from '../config'

export function Shell() {
  const facilitator = useProgress((s) => s.facilitator)
  const name = useProgress((s) => s.name)

  // Facilitator mode: ?fac=1 in the URL, or Ctrl/Cmd+Shift+F.
  useEffect(() => {
    if (window.location.href.includes('fac=1')) {
      useProgress.getState().setFacilitator(true)
    }
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault()
        const s = useProgress.getState()
        s.setFacilitator(!s.facilitator)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const bypass = window.location.href.includes('fac=1')
  const gated = FEATURES.login && !name && !bypass
  if (gated) return <LoginGate />

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      {FEATURES.facilitator && facilitator && <FacilitatorPanel />}
    </div>
  )
}
