import { useState } from 'react'
import { useProgress } from '../store/progress'
import { Tractor, ArrowRight } from '../components/icons'

/** Light name and team capture before the launcher. Not real auth. */
export function LoginGate() {
  const setName = useProgress((s) => s.setName)
  const setTeam = useProgress((s) => s.setTeam)
  const [n, setN] = useState('')
  const [t, setT] = useState('')

  const submit = () => {
    if (!n.trim()) return
    setTeam(t.trim())
    setName(n.trim())
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-jd-green-deep via-jd-green-dark to-jd-green p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-[var(--shadow-lift)]">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-jd-green text-white">
            <Tractor size={24} />
          </span>
          <div className="min-w-0">
            <div className="text-base font-extrabold leading-tight text-jd-green-deep">
              Integration & Communication
            </div>
            <div className="text-xs text-ink-soft">
              John Deere Pune leadership workshop · Block 2
            </div>
          </div>
        </div>

        <label className="mb-1 block text-sm font-bold text-ink">Your name</label>
        <input
          value={n}
          onChange={(e) => setN(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="First name"
          className="mb-3 w-full rounded-xl border-2 border-line px-4 py-3 text-base outline-none transition focus:border-jd-green"
        />
        <label className="mb-1 block text-sm font-bold text-ink">
          Team or function
        </label>
        <input
          value={t}
          onChange={(e) => setT(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="e.g. Quality, Machining, Supply Chain"
          className="mb-5 w-full rounded-xl border-2 border-line px-4 py-3 text-base outline-none transition focus:border-jd-green"
        />
        <button
          onClick={submit}
          disabled={!n.trim()}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-jd-green px-5 py-3 text-sm font-bold text-white transition hover:bg-jd-green-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          Start the session <ArrowRight size={16} />
        </button>
        <p className="mt-3 text-center text-xs text-ink-soft">
          Your progress saves on this device only. No account, no password.
        </p>
      </div>
    </div>
  )
}
