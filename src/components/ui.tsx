import type { ComponentProps, ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Tractor, Target, Compass } from './icons'

/* ---------- text bits ---------- */

export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'text-xs font-bold uppercase tracking-[0.16em] text-jd-green',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Pill({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: 'green' | 'yellow' | 'neutral' | 'dark'
  className?: string
}) {
  const tones = {
    green: 'bg-jd-green-mist text-jd-green-dark',
    yellow: 'bg-jd-yellow-soft text-jd-green-deep',
    neutral: 'bg-white text-ink-soft ring-1 ring-line',
    dark: 'bg-jd-green-deep text-white',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

/* ---------- containers ---------- */

export function Card({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white ring-1 ring-line shadow-[var(--shadow-card)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Callout({
  children,
  tone = 'green',
  title,
  className,
}: {
  children: ReactNode
  tone?: 'green' | 'yellow' | 'neutral'
  title?: string
  className?: string
}) {
  const tones = {
    green: 'bg-jd-green-mist border-jd-green',
    yellow: 'bg-jd-yellow-soft border-jd-yellow-dark',
    neutral: 'bg-white border-line',
  }
  return (
    <div
      className={cn('rounded-xl border-l-4 p-4 sm:p-5', tones[tone], className)}
    >
      {title && (
        <div className="mb-1 text-sm font-bold text-jd-green-deep">{title}</div>
      )}
      <div className="text-[15px] leading-relaxed text-ink-soft">{children}</div>
    </div>
  )
}

/** The signature "At John Deere · Pune" example callout. */
export function JDExample({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-xl bg-jd-green-mist p-4 ring-1 ring-jd-green/20 sm:p-5',
        className,
      )}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-jd-green text-white">
          <Tractor size={16} />
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-jd-green-dark">
          At John Deere · Pune
        </span>
      </div>
      <div className="text-[15px] leading-relaxed text-ink">{children}</div>
    </div>
  )
}

/* ---------- buttons ---------- */

type BtnProps = ComponentProps<'button'> & {
  icon?: ReactNode
  block?: boolean
}

export function PrimaryButton({
  children,
  icon,
  block,
  className,
  ...rest
}: BtnProps) {
  return (
    <button
      {...rest}
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-jd-green px-5 py-3 text-sm font-bold text-white transition',
        'hover:bg-jd-green-dark active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40',
        block && 'w-full',
        className,
      )}
    >
      {children}
      {icon}
    </button>
  )
}

export function GhostButton({
  children,
  icon,
  block,
  className,
  ...rest
}: BtnProps) {
  return (
    <button
      {...rest}
      className={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-jd-green-dark ring-1 ring-line transition',
        'hover:bg-jd-green-mist active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40',
        block && 'w-full',
        className,
      )}
    >
      {icon}
      {children}
    </button>
  )
}

/* ---------- layout helpers ---------- */

export function Section({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <section className={cn('mt-8 sm:mt-10', className)}>{children}</section>
}

export function SectionHeading({
  kicker,
  children,
}: {
  kicker?: string
  children: ReactNode
}) {
  return (
    <div className="mb-4">
      {kicker && <SectionLabel className="mb-1.5">{kicker}</SectionLabel>}
      <h2 className="h-display text-2xl font-extrabold text-jd-green-deep sm:text-[28px]">
        {children}
      </h2>
    </div>
  )
}

/* ---------- deep-content pieces ---------- */

/** Small chip linking a piece of content to one of the anchor plant scenarios. */
export function ScenarioTag({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-jd-green-mist px-2.5 py-1 text-[11px] font-bold text-jd-green-dark">
      <Tractor size={12} />
      {name}
    </span>
  )
}

/** The before / with-the-technology / payoff story, shown as three steps. */
export function ShiftStory({
  situation,
  shift,
  payoff,
}: {
  situation: string
  shift: string
  payoff: string
}) {
  const rows = [
    {
      label: 'Today',
      text: situation,
      box: 'bg-cream ring-line',
      tag: 'bg-line text-ink-soft',
    },
    {
      label: 'The shift',
      text: shift,
      box: 'bg-jd-green-mist ring-jd-green/25',
      tag: 'bg-jd-green text-white',
    },
    {
      label: 'The payoff',
      text: payoff,
      box: 'bg-jd-yellow-soft ring-jd-yellow-dark/40',
      tag: 'bg-jd-yellow-dark text-jd-green-deep',
    },
  ]
  return (
    <div className="space-y-1.5">
      {rows.map((r) => (
        <div key={r.label} className={cn('rounded-lg p-3 ring-1', r.box)}>
          <span
            className={cn(
              'mb-1 inline-block rounded px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide',
              r.tag,
            )}
          >
            {r.label}
          </span>
          <p className="text-[13px] leading-relaxed text-ink">{r.text}</p>
        </div>
      ))}
    </div>
  )
}

/** A cited real-world fact that shows the idea works in practice. */
export function ProofPoint({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl bg-white p-4 ring-1 ring-jd-yellow-dark/40">
      <div className="mb-1.5 flex items-center gap-1.5">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-jd-yellow text-jd-green-deep">
          <Target size={14} />
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-jd-yellow-dark">
          Proof it works
        </span>
      </div>
      <div className="text-[14px] leading-relaxed text-ink-soft">{children}</div>
    </div>
  )
}

/** The leadership angle: the question to ask, the trap to avoid. */
export function LeaderLens({
  children,
  label = "The leader's lens",
}: {
  children: ReactNode
  label?: string
}) {
  return (
    <div className="rounded-xl bg-jd-green-deep p-4 text-white">
      <div className="mb-1.5 flex items-center gap-1.5">
        <Compass size={16} className="text-jd-yellow" />
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-jd-yellow">
          {label}
        </span>
      </div>
      <div className="text-[14px] leading-relaxed text-white/90">{children}</div>
    </div>
  )
}
