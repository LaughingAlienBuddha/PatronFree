/**
 * After login, use a full URL so static hosts (e.g. GitHub Pages with basePath)
 * always navigate correctly; client router alone can miss basePath after OAuth.
 */
export function redirectToDashboard(): void {
  if (typeof window === "undefined") return;
  const base = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
  const url = `${window.location.origin}${base}/dashboard`;
  window.location.replace(url);
}
