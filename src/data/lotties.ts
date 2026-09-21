/**
 * Lottie animations, referenced by URL rather than imported.
 *
 * Importing the JSON inlined every animation into the JS bundle — `Loading.json`
 * alone is ~108 KB and sat in the critical path. `lottie-react` fetches these at
 * runtime instead.
 */
export const lotties = {
  loading: "/lotties/Loading.json",
  magic: "/lotties/magic.json",
  coffee: "/lotties/coffee.json",
  mailSent: "/lotties/mail-sent.json",
} as const;
