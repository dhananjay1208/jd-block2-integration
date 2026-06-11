import { useState } from 'react'
import type { HotspotStep, StepResult, Verdict } from '../../content/types'
import { cn } from '../../lib/cn'
import { Check, Close } from '../../components/icons'
import { FeedbackBanner } from '../../components/FeedbackBanner'
import { StepSetup, StepPrompt } from './parts'

export function HotspotStepView({
  step,
  isLast,
  onDone,
}: {
  step: HotspotStep
  isLast: boolean
  onDone: (r: StepResult) => void
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [checked, setChecked] = useState(false)

  const toggle = (id: string) => {
    if (checked) return
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const correctIds = step.regions.filter((r) => r.correct).map((r) => r.id)
  const chosenCorrect = correctIds.filter((id) => selected.has(id)).length
  const chosenWrong = [...selected].filter(
    (id) => !correctIds.includes(id),
  ).length
  const verdict: Verdict =
    chosenCorrect === correctIds.length && chosenWrong === 0
      ? 'success'
      : chosenCorrect > 0 && chosenWrong === 0
        ? 'partial'
        : 'error'
  const points =
    verdict === 'success'
      ? step.points
      : verdict === 'partial'
        ? Math.round(step.points / 2)
        : 0

  return (
    <div>
      {step.setup && <StepSetup>{step.setup}</StepSetup>}
      <StepPrompt>{step.prompt}</StepPrompt>

      <div className="mt-3 rounded-xl bg-jd-green-deep p-3">
        <div className="mb-2 text-center text-xs font-bold uppercase tracking-[0.14em] text-jd-yellow">
          {step.caption}
        </div>
        <div className="relative h-52 w-full overflow-hidden rounded-lg bg-jd-green-deep ring-1 ring-white/15">
          {step.regions.map((r) => {
            const isSel = selected.has(r.id)
            const show = checked
            return (
              <button
                key={r.id}
                onClick={() => toggle(r.id)}
                disabled={show}
                style={{
                  left: `${r.rect.x}%`,
                  top: `${r.rect.y}%`,
                  width: `${r.rect.w}%`,
                  height: `${r.rect.h}%`,
                }}
                className={cn(
                  'absolute grid place-items-center rounded-md border-2 px-1 text-center text-[11px] font-bold leading-tight transition',
                  !show &&
                    isSel &&
                    'border-jd-yellow bg-jd-yellow/25 text-white',
                  !show &&
                    !isSel &&
                    'border-white/40 bg-white/10 text-white/90 hover:bg-white/20',
                  show && r.correct && 'border-jd-green bg-jd-green/35 text-white',
                  show &&
                    !r.correct &&
                    isSel &&
                    'border-red-400 bg-red-500/30 text-white',
                  show &&
                    !r.correct &&
                    !isSel &&
                    'border-white/25 bg-white/5 text-white/60',
                )}
              >
                <span className="flex items-center gap-1">
                  {show && r.correct && <Check size={12} />}
                  {show && !r.correct && isSel && <Close size={12} />}
                  {r.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {!checked ? (
        <button
          onClick={() => setChecked(true)}
          disabled={selected.size === 0}
          className="mt-4 w-full rounded-xl bg-jd-green py-3 text-sm font-extrabold text-white transition hover:bg-jd-green-dark disabled:opacity-35"
        >
          Check my answer
        </button>
      ) : (
        <FeedbackBanner
          verdict={verdict}
          points={points}
          continueLabel={isLast ? 'See results' : 'Continue'}
          onContinue={() => onDone({ points, verdict, detail: step.recap })}
        >
          <ul className="space-y-1">
            {step.regions
              .filter((r) => r.correct)
              .map((r) => (
                <li key={r.id}>
                  <span className="font-semibold text-ink">{r.label}:</span>{' '}
                  {r.explanation}
                </li>
              ))}
          </ul>
        </FeedbackBanner>
      )}
    </div>
  )
}
