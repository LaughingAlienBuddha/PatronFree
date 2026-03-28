import { getEffectivePublicBasePath } from "@/lib/public-base-path";

/**
 * Build /dashboard URL from the current URL so it works for:
 * - root hosts (…/signin → …/dashboard)
 * - subpath hosts (…/repo/signin → …/repo/dashboard)
 * - OAuth return on / or /repo when env basePath was wrong for the host
 */
function dashboardUrlFromLocation(): string {
  if (typeof window === "undefined") return "/dashboard";
  const p = window.location.pathname.replace(/\/$/, "") || "/";

  if (p.endsWith("/signin")) {
    return `${p.slice(0, -"/signin".length)}/dashboard`;
  }
  if (p.endsWith("/signup")) {
    return `${p.slice(0, -"/signup".length)}/dashboard`;
  }
  if (p === "/") {
    return "/dashboard";
  }

  const env = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
  if (env && (p === env || p.startsWith(`${env}/`))) {
    return `${env}/dashboard`;
  }

  return "/dashboard";
}

/**
 * After login: full URL navigation (reliable on static hosts, Workers, GitHub Pages).
 */
export function redirectToDashboard(): void {
  if (typeof window === "undefined") return;
  const path = dashboardUrlFromLocation();
  window.location.replace(new URL(path, window.location.origin).href);
}

/** Full navigation to site home. */
export function redirectToHome(): void {
  if (typeof window === "undefined") return;
  const base = getEffectivePublicBasePath();
  const path = base ? `${base}/` : "/";
  const url = `${window.location.origin}${path}`;
  window.location.replace(url);
}
