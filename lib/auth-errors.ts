/** Maps Firebase Auth errors to actionable messages for production (e.g. GitHub Pages). */
export function formatAuthError(err: unknown): string {
  const code =
    typeof err === "object" && err !== null && "code" in err
      ? String((err as { code?: string }).code)
      : "";

  switch (code) {
    case "auth/unauthorized-domain":
      return "This domain is not allowed for sign-in. In Firebase Console → Authentication → Settings → Authorized domains, add your GitHub Pages host (e.g. yourname.github.io).";
    case "auth/operation-not-allowed":
      return "This sign-in provider is disabled. Enable Google/GitHub under Firebase Console → Authentication → Sign-in method.";
    case "auth/invalid-api-key":
      return "Invalid API key. In Google Cloud → APIs & Credentials → your Browser key → Application restrictions, add an HTTP referrer for your live site (e.g. https://yourname.github.io/*).";
    default:
      if (typeof err === "object" && err !== null && "message" in err) {
        return String((err as { message: string }).message);
      }
      return "Sign-in failed. Check Firebase authorized domains and API key referrer restrictions.";
  }
}
