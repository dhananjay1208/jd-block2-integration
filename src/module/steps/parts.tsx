import type { ReactNode } from 'react'

/** Neutral context or data box shown above a prompt. */
export function StepSetup({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3 rounded-xl bg-cream p-3.5 text-[14px] leading-relaxed text-ink-soft ring-1 ring-line">
      {children}
    </div>
  )
}

/** The question or task line. */
export function StepPrompt({ children }: { children: ReactNode }) {
  return <h3 className="text-[16px] font-extrabold leading-snug text-ink">{children}</h3>
}
