import { useState } from 'react'
import { motion } from 'framer-motion'
import type { MatchStep, StepResult, Verdict } from '../../content/types'
import { cn } from '../../lib/cn'
import { Check, Close } from '../../components/icons'
import { FeedbackBanner } from '../../components/FeedbackBanner'
import { StepSetup, StepPrompt } from './parts'

export function MatchStepView({
  step,
  isLast,
  onDone,
}: {
  step: MatchStep
  isLast: boolean
  onDone: (r: StepResult) => void
}) {
  const [placed, setPlaced] = useState<Record<string, string | undefined>>({})
  const [selected, setSelected] = useState<string | null>(null)
  const [checked, setChecked] = useState(false)

  const unplaced = step.items.filter((i) => !placed[i.id])
  const allPlaced = unplaced.length === 0
  const bucketLabel = (key: string) =>
    step.buckets.find((b) => b.key === key)?.label ?? ''

  const correctCount = step.items.filter((i) => placed[i.id] === i.bucket).length
  const points = correctCount * step.points
  const verdict: Verdict =
    correctCount === step.items.length
      ? 'success'
      : correctCount === 0
        ? 'error'
        : 'partial'

  const place = (bucketKey: string) => {
    if (checked || !selected) return
    setPlaced((p) => ({ ...p, [selected]: bucketKey }))
    setSelected(null)
  }
  const removeItem = (id: string) => {
    if (checked) return
    setPlaced((p) => ({ ...p, [id]: undefined }))
  }

  const gridClass = step.buckets.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'

  return (
    <div>
      {step.setup && <StepSetup>{step.setup}</StepSetup>}
      <StepPrompt>{step.prompt}</StepPrompt>

      {!checked && (
        <div className="mb-3 mt-3 rounded-xl bg-cream p-3 ring-1 ring-line">
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-ink-soft">
            {allPlaced
              ? 'All cards placed. Check your answers'
              : selected
                ? 'Now tap the box it belongs in'
                : 'Tap a card to pick it up'}
          </div>
          <div className="flex flex-wrap gap-2">
            {unplaced.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  setSelected(selected === item.id ? null : item.id)
                }
                className={cn(
                  'rounded-lg px-3 py-2 text-left text-[13px] font-semibold transition',
                  selected === item.id
                    ? 'bg-jd-green text-white ring-2 ring-jd-yellow'
                    : 'bg-white text-ink ring-1 ring-line hover:ring-jd-green',
                )}
              >
                {item.text}
              </button>
            ))}
            {allPlaced && <span className="text-sm text-ink-soft">tray empty</span>}
          </div>
        </div>
      )}

      <div className={cn('grid gap-3', gridClass)}>
        {step.buckets.map((b) => {
          const inside = step.items.filter((i) => placed[i.id] === b.key)
          return (
            <button
              key={b.key}
              onClick={() => place(b.key)}
              disabled={checked}
              className={cn(
                'flex flex-col rounded-xl border-2 p-3 text-left transition',
                selected && !checked
                  ? 'border-jd-yellow-dark bg-jd-yellow-soft'
                  : 'border-line bg-cream',
              )}
            >
              <div className="text-sm font-extrabold text-jd-green-deep">
                {b.label}
              </div>
              {b.hint && (
                <div className="text-[11px] text-ink-soft">{b.hint}</div>
              )}
              <div className="mt-2 flex flex-1 flex-wrap content-start gap-1.5">
                {inside.length === 0 && (
                  <span className="text-[12px] italic text-ink-soft/70">
                    Tap to place here
                  </span>
                )}
                {inside.map((item) => {
                  const ok = item.bucket === b.key
                  return (
                    <motion.span
                      key={item.id}
                      layout
                      onClick={(e) => {
                        e.stopPropagation()
                        removeItem(item.id)
                      }}
                      className={cn(
                        'inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] font-semibold',
                        !checked && 'bg-white text-ink ring-1 ring-line',
                        checked &&
                          ok &&
                          'bg-jd-green-mist text-jd-green-deep ring-1 ring-jd-green',
                        checked &&
                          !ok &&
                          'bg-red-50 text-red-700 ring-1 ring-red-300',
                      )}
                    >
                      {checked && (ok ? <Check size={12} /> : <Close size={12} />)}
                      {item.text}
                      {checked && !ok && (
                        <span className="font-bold">
                          {'→'} {bucketLabel(item.bucket)}
                        </span>
                      )}
                    </motion.span>
                  )
                })}
              </div>
            </button>
          )
        })}
      </div>

      {!checked ? (
        <button
          onClick={() => setChecked(true)}
          disabled={!allPlaced}
          className="mt-4 w-full rounded-xl bg-jd-green py-3 text-sm font-extrabold text-white transition hover:bg-jd-green-dark disabled:opacity-35"
        >
          Check my answers
        </button>
      ) : (
        <>
          <div className="mt-4 rounded-xl bg-cream p-3 ring-1 ring-line">
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-ink-soft">
              Why each card lands where it does
            </div>
            <ul className="space-y-1.5">
              {step.items.map((item) => {
                const ok = placed[item.id] === item.bucket
                return (
                  <li key={item.id} className="flex gap-2 text-[13px]">
                    <span
                      className={cn(
                        'mt-0.5 shrink-0',
                        ok ? 'text-jd-green' : 'text-red-500',
                      )}
                    >
                      {ok ? <Check size={14} /> : <Close size={14} />}
                    </span>
                    <span className="text-ink-soft">
                      <span className="font-semibold text-ink">{item.text}.</span>{' '}
                      {item.why}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
          <FeedbackBanner
            verdict={verdict}
            points={points}
            continueLabel={isLast ? 'See results' : 'Continue'}
            onContinue={() => onDone({ points, verdict, detail: step.recap })}
          >
            {correctCount} of {step.items.length} placed correctly.
          </FeedbackBanner>
        </>
      )}
    </div>
  )
}
