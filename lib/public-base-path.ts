/**
 * NEXT_PUBLIC_BASE_PATH is baked at build time. If you deploy the same build to a
 * root host (e.g. *.workers.dev) but built with a subpath (e.g. GitHub Pages /repo),
 * treat base as empty so / and /dashboard resolve correctly.
 */
export function getEffectivePublicBasePath(): string {
  const fromEnv = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
  if (typeof window === "undefined") return fromEnv;
  if (!fromEnv) return "";
  const p = window.location.pathname;
  const under = p === fromEnv || p.startsWith(`${fromEnv}/`);
  if (!under) return "";
  return fromEnv;
}
