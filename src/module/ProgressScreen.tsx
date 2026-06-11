import { useNavigate } from 'react-router-dom'
import { PILLAR_MODULES } from '../content/modules'
import {
  useProgress,
  selectTotalScore,
  selectCompletedCount,
} from '../store/progress'
import { percent } from '../lib/scoring'
import { ScoreBar } from '../components/ScoreBar'
import { ChevronLeft, Trophy, Refresh } from '../components/icons'

export function ProgressScreen() {
  const navigate = useNavigate()
  const results = useProgress((s) => s.results)
  const name = useProgress((s) => s.name)
  const team = useProgress((s) => s.team)
  const resetAll = useProgress((s) => s.resetAll)
  const total = selectTotalScore({ results })
  const completed = selectCompletedCount({ results })

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-gradient-to-r from-jd-green-deep to-jd-green text-white">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-4">
          <button
            onClick={() => navigate('/')}
            aria-label="Back to all topics"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/15 transition hover:bg-white/25"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="min-w-0 flex-1">
            <div className="text-base font-extrabold leading-tight">
              Your progress
            </div>
            {name && (
              <div className="text-xs text-white/80">
                {name}
                {team ? ` · ${team}` : ''}
              </div>
            )}
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-jd-yellow px-3 py-1.5 text-sm font-extrabold text-jd-green-deep">
            <Trophy size={15} /> {total}
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-2xl px-4 py-5">
        <div className="mb-4 text-sm font-semibold text-ink-soft">
          {completed} of {PILLAR_MODULES.length} topics completed.
        </div>

        <div className="space-y-2.5">
          {PILLAR_MODULES.map((p) => {
            const r = results[p.id]
            const pct = r ? percent(r.score, r.max) : 0
            return (
              <button
                key={p.id}
                onClick={() => navigate(`/pillar/${p.id}`)}
                className="block w-full rounded-2xl bg-white p-4 text-left ring-1 ring-line shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-soft">
                      Topic {p.order}
                    </div>
                    <div className="truncate text-[15px] font-extrabold text-jd-green-deep">
                      {p.name}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    {r?.completed ? (
                      <div className="text-sm font-extrabold text-jd-green-dark">
                        {r.score}/{r.max}
                      </div>
                    ) : (
                      <div className="text-xs font-semibold text-ink-soft">
                        Not started
                      </div>
                    )}
                  </div>
                </div>
                {r?.completed && (
                  <div className="mt-2">
                    <ScoreBar pct={pct} />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <button
          onClick={() => {
            if (
              window.confirm(
                'Reset all progress and sign-in on this device? This cannot be undone.',
              )
            ) {
              resetAll()
              navigate('/')
            }
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-ink-soft ring-1 ring-line transition hover:bg-jd-green-mist"
        >
          <Refresh size={15} /> Reset all progress
        </button>
      </div>
    </div>
  )
}
