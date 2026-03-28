"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type HomeLinkProps = {
  className?: string;
  children: React.ReactNode;
};

/**
 * Logo / "Back to home" links: when the build has a subpath base but the app is
 * served at domain root (e.g. Cloudflare Workers), plain Link href="/" can resolve
 * to the wrong path; fall back to a real root <a href="/">.
 */
export function HomeLink({ className, children }: HomeLinkProps) {
  const pathname = usePathname();
  const fromEnv = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

  if (!fromEnv) {
    return (
      <Link href="/" className={className}>
        {children}
      </Link>
    );
  }

  const under = pathname === fromEnv || pathname.startsWith(`${fromEnv}/`);
  if (!under) {
    return (
      <a href="/" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href="/" className={className}>
      {children}
    </Link>
  );
}
