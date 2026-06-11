// Feature flags for the first delivery. All four extras are on, per DK.
// Flip any of these off without touching the engine.
export const FEATURES = {
  /** Show a name and team sign-in before the launcher. Not real auth. */
  login: true,
  /** Show a join QR on the launcher so phones can open the app quickly. */
  joinQR: true,
  /** Facilitator notes panel, toggled with Ctrl/Cmd+Shift+F or ?fac=1. */
  facilitator: true,
} as const
