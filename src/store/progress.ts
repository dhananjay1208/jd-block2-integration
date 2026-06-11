import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Per-device progress store. Offline-first: everything is persisted to
 * localStorage on the participant's own phone. No backend, no accounts.
 * Keyed per pillar so the launcher can show completion and a real percentage.
 */
export interface PillarResult {
  /** best points earned on this pillar */
  score: number
  /** points available on this pillar (for the percentage) */
  max: number
  /** reached the results screen at least once */
  completed: boolean
}

interface ProgressState {
  name: string
  team: string

  /** keyed by pillar id → best result */
  results: Record<string, PillarResult>
  visited: string[]
  facilitator: boolean

  setName: (v: string) => void
  setTeam: (v: string) => void

  recordPillar: (id: string, score: number, max: number) => void
  markVisited: (id: string) => void
  setFacilitator: (v: boolean) => void
  resetAll: () => void
}

const initial = {
  name: '',
  team: '',
  results: {} as Record<string, PillarResult>,
  visited: [] as string[],
  facilitator: false,
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      ...initial,

      setName: (v) => set({ name: v }),
      setTeam: (v) => set({ team: v }),

      recordPillar: (id, score, max) =>
        set((s) => {
          const prev = s.results[id]
          const best = prev && prev.score >= score ? prev.score : score
          const bestMax = prev ? Math.max(prev.max, max) : max
          return {
            results: {
              ...s.results,
              [id]: { score: best, max: bestMax, completed: true },
            },
          }
        }),

      markVisited: (id) =>
        set((s) =>
          s.visited.includes(id) ? s : { visited: [...s.visited, id] },
        ),
      setFacilitator: (v) => set({ facilitator: v }),
      resetAll: () => set({ ...initial }),
    }),
    {
      name: 'jd-integration-progress-v1',
      partialize: (s) => ({
        name: s.name,
        team: s.team,
        results: s.results,
        visited: s.visited,
        facilitator: s.facilitator,
      }),
    },
  ),
)

/** Total points earned across every pillar. */
export function selectTotalScore(s: Pick<ProgressState, 'results'>): number {
  return Object.values(s.results).reduce((a, r) => a + r.score, 0)
}
/** How many pillars have been completed at least once. */
export function selectCompletedCount(s: Pick<ProgressState, 'results'>): number {
  return Object.values(s.results).filter((r) => r.completed).length
}
