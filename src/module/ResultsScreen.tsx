import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { PillarModule } from '../content/types'
import { percent, verdictLine } from '../lib/scoring'
import {
  Callout,
  GhostButton,
  LeaderLens,
  PrimaryButton,
  ProofPoint,
  SectionLabel,
  ShiftStory,
} from '../components/ui'
import { ScoreBar } from '../components/ScoreBar'
import { Trophy, Refresh, ArrowRight, Check, Close, Spark } from '../components/icons'
import type { PlayRun } from './run'

function RecapIcon({ verdict }: { verdict: PlayRun['recaps'][number]['verdict'] }) {
  if (verdict === 'success')
    return <Check size={15} className="text-jd-green" />
  if (verdict === 'partial')
    return <Spark size={15} className="text-jd-yellow-dark" />
  return <Close size={15} className="text-red-500" />
}

export function ResultsScreen({
  pillar,
  run,
  onRetry,
}: {
  pillar: PillarModule
  run: PlayRun
  onRetry: () => void
}) {
  const navigate = useNavigate()
  const pct = percent(run.score, run.max)

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="overflow-hidden rounded-2xl ring-1 ring-line shadow-[var(--shadow-card)]"
      >
        <div className="bg-gradient-to-r from-jd-green-deep to-jd-green p-5 text-center text-white">
          <Trophy size={34} className="mx-auto" />
          <h2 className="mt-1 text-xl font-extrabold">Topic complete</h2>
          <p className="text-sm text-white/80">{pillar.name}</p>
        </div>

        <div className="bg-white p-4 sm:p-5">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-jd-green-deep">
              {run.score}
            </div>
            <div className="text-sm text-ink-soft">
              of {run.max} points ({pct}%)
            </div>
          </div>
          <div className="mt-3">
            <ScoreBar pct={pct} />
          </div>
          <p className="mt-2 text-center text-sm font-semibold text-ink-soft">
            {verdictLine(pct)}
          </p>

          <div className="mt-4 rounded-xl bg-cream p-3 ring-1 ring-line">
            <SectionLabel className="mb-2">What you worked through</SectionLabel>
            <ul className="space-y-1.5">
              {run.recaps.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px]">
                  <span className="mt-0.5 shrink-0">
                    <RecapIcon verdict={r.verdict} />
                  </span>
                  <span className="flex-1 text-ink-soft">
                    {r.recap ?? 'Step complete.'}
                  </span>
                  {r.points > 0 && (
                    <span className="shrink-0 text-xs font-bold text-jd-green-dark">
                      +{r.points}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5">
            <SectionLabel className="mb-2">
              What this topic changes on the line
            </SectionLabel>
            <ShiftStory
              situation={pillar.anchor.today}
              shift={pillar.anchor.shift}
              payoff={pillar.anchor.payoff}
            />
          </div>

          <Callout tone="green" title="Key points" className="mt-5">
            <ul className="space-y-1.5">
              {pillar.results.keyPoints.map((k, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-jd-green">•</span>
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </Callout>

          <div className="mt-4">
            <ProofPoint>{pillar.results.proof}</ProofPoint>
            <div className="mt-1.5 text-xs text-ink-soft">
              Source: {pillar.results.source}
            </div>
          </div>

          <div className="mt-4">
            <LeaderLens>{pillar.results.leaderLens}</LeaderLens>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <GhostButton block icon={<Refresh size={16} />} onClick={onRetry}>
              Try again
            </GhostButton>
            <PrimaryButton
              block
              icon={<ArrowRight size={16} />}
              onClick={() => navigate('/')}
            >
              Back to all topics
            </PrimaryButton>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
