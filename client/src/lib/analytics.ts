export function initAnalytics() {
  const id = import.meta.env.VITE_GA_ID
  if (!id) return
  // GA4 snippet placeholder
  // Load at runtime for performance; keep minimal to avoid blocking LCP.
}
