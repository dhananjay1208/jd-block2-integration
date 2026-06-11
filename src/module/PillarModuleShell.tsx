import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { moduleById } from '../content/modules'
import { useProgress } from '../store/progress'
import { ChevronLeft, Clock } from '../components/icons'
import { ScenarioTag } from '../components/ui'
import { scenarioById } from '../content/scenarios'
import { IntroScreen } from './IntroScreen'
import { PlayingScreen } from './PlayingScreen'
import { ResultsScreen } from './ResultsScreen'
import type { PlayRun } from './run'

type Phase = 'intro' | 'playing' | 'results'

export function PillarModuleShell() {
  const { id } = useParams()
  const navigate = useNavigate()
  const pillar = id ? moduleById(id) : undefined
  const markVisited = useProgress((s) => s.markVisited)
  const recordPillar = useProgress((s) => s.recordPillar)

  const [phase, setPhase] = useState<Phase>('intro')
  const [run, setRun] = useState<PlayRun | null>(null)
  const [runKey, setRunKey] = useState(0)

  useEffect(() => {
    if (pillar) {
      window.scrollTo({ top: 0 })
      markVisited(pillar.id)
    }
  }, [pillar, markVisited])

  if (!pillar) return <Navigate to="/" replace />
  const sc = scenarioById(pillar.scenario)

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
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-jd-yellow text-sm font-extrabold text-jd-green-deep">
            {pillar.order}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-base font-extrabold leading-tight">
              {pillar.name}
            </div>
            <div className="mt-0.5 flex items-center gap-1 text-xs text-white/80">
              <Clock size={12} /> approx {pillar.minutes} min
            </div>
          </div>
          <span className="hidden shrink-0 sm:inline-flex">
            <ScenarioTag name={sc.name} />
          </span>
        </div>
      </div>

      {phase === 'intro' && (
        <IntroScreen pillar={pillar} onStart={() => setPhase('playing')} />
      )}
      {phase === 'playing' && (
        <PlayingScreen
          key={runKey}
          pillar={pillar}
          onComplete={(r) => {
            recordPillar(pillar.id, r.score, r.max)
            setRun(r)
            setPhase('results')
          }}
        />
      )}
      {phase === 'results' && run && (
        <ResultsScreen
          pillar={pillar}
          run={run}
          onRetry={() => {
            setRun(null)
            setRunKey((k) => k + 1)
            setPhase('playing')
          }}
        />
      )}
    </div>
  )
}
