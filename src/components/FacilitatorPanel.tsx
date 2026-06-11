import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FACILITATOR_NOTES } from '../content/facilitatorNotes'
import { moduleById } from '../content/modules'
import { useProgress } from '../store/progress'
import { Presenter, Close, Clock } from './icons'

function keyForPath(pathname: string): { key: string; title: string } {
  const m = pathname.match(/^\/pillar\/(.+)$/)
  if (m) {
    const p = moduleById(m[1])
    return { key: m[1], title: p ? p.name : 'Topic' }
  }
  if (pathname.startsWith('/journey'))
    return { key: 'journey', title: 'Data Journey' }
  if (pathname.startsWith('/progress')) return { key: 'progress', title: 'Progress' }
  return { key: 'home', title: 'All topics' }
}

/** Bottom-docked notes panel, only mounted when Facilitator Mode is on. */
export function FacilitatorPanel() {
  const { pathname } = useLocation()
  const setFacilitator = useProgress((s) => s.setFacilitator)
  const [open, setOpen] = useState(false)

  const { key, title } = keyForPath(pathname)
  const notes = FACILITATOR_NOTES[key]

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 right-3 z-40 inline-flex items-center gap-2 rounded-full bg-jd-green-deep px-4 py-2.5 text-sm font-bold text-jd-yellow shadow-[var(--shadow-lift)] ring-2 ring-jd-yellow/60"
      >
        <Presenter size={18} />
        Facilitator
      </button>

      <AnimatePresence>
        {open && notes && (
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-2xl bg-jd-green-deep text-white shadow-[var(--shadow-lift)]"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.26, ease: 'easeOut' }}
          >
            <div className="sticky top-0 flex items-center justify-between bg-jd-green-deep px-4 py-3">
              <div className="flex items-center gap-2">
                <Presenter size={18} className="text-jd-yellow" />
                <span className="text-sm font-extrabold">
                  Facilitator Notes · {title}
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close facilitator notes"
                className="grid h-8 w-8 place-items-center rounded-lg hover:bg-white/10"
              >
                <Close size={18} />
              </button>
            </div>

            <div className="space-y-4 px-4 pb-6">
              <div className="inline-flex items-center gap-2 rounded-lg bg-jd-yellow px-3 py-1.5 text-xs font-bold text-jd-green-deep">
                <Clock size={13} />
                {notes.timing}
              </div>

              <div>
                <div className="mb-1.5 text-xs font-bold uppercase tracking-[0.14em] text-jd-yellow">
                  Talking points
                </div>
                <ul className="space-y-1.5">
                  {notes.talkingPoints.map((t, i) => (
                    <li key={i} className="flex gap-2 text-sm text-white/90">
                      <span className="text-jd-yellow">▸</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {notes.discussion && (
                <div className="rounded-xl bg-white/10 p-3">
                  <div className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-jd-yellow">
                    Discussion question
                  </div>
                  <p className="text-sm text-white/90">{notes.discussion}</p>
                </div>
              )}

              {notes.answerKey && (
                <div>
                  <div className="mb-1.5 text-xs font-bold uppercase tracking-[0.14em] text-jd-yellow">
                    Answer key
                  </div>
                  <ul className="space-y-1.5">
                    {notes.answerKey.map((t, i) => (
                      <li key={i} className="flex gap-2 text-sm text-white/90">
                        <span className="text-jd-yellow">✓</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => {
                  setFacilitator(false)
                  setOpen(false)
                }}
                className="w-full rounded-xl bg-white/10 py-2.5 text-sm font-bold text-white/80 transition hover:bg-white/20"
              >
                Turn Facilitator Mode off
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
