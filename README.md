# PatronFree

**GitHub-first, trust-focused funding for open-source maintainers and indie builders.**  
Convert repo visitors into predictable sponsors with per-repo memberships, verifiable metrics, and tamper-evident accounting — hackathon friendly and self-hostable.

---

## Short tagline
PatronFree (PatreonJi) is a GitHub-first, community-focused funding layer that helps open-source maintainers and indie builders receive recurring, transparent, and verifiable support — with practical anti-abuse protections and a blockchain-free public ledger.

---

## Problem
Open-source projects and independent creators need predictable recurring funding and clear accountability. Existing platforms (GitHub Sponsors, Patreon, Open Collective) trade off discoverability, fees, or auditability, and donation/reputation signals can be manipulated by fake accounts (Sybil attacks). There is no single practical service that (a) converts interested users into recurring sponsors, (b) ties money to verifiable contribution evidence, and (c) defends against abuse — all without introducing blockchain/Web3 complexity.

---

## Overview
PatronFree is an open-source, GitHub-first platform focused on recurring memberships, repo-centric discovery, corporate sponsorship support, and tamper-evident public financial records — implemented without blockchain. The product centers on reliable subscriptions and structured sponsorship agreements that are discoverable from project READMEs and auditable for sponsors.

---

## Key goals
- Increase recurring conversion via repo-first CTAs and membership UX.  
- Build trust by showing contribution metrics and publishing verifiable ledger entries.  
- Reduce abuse via GitHub-based reputation and pragmatic anti-Sybil rules.  
- Offer self-hosting and transparent fee breakdowns so projects control costs and privacy.

---

## Features

**Repo-First Creator Pages**  
Public project pages with project bio, repo links, funding summary, and contribution metrics (PRs merged, releases, issues closed). Clear "what membership supports" copy.

**GitHub-First Onboarding**  
OAuth GitHub connect to import repo metadata and contribution signals automatically. README badge generator for one-click onboarding.

**Recurring Memberships & Structured Sponsorships**  
Monthly/annual tiers with benefits. Corporate/org mode for company contributions (logo, SLA notes, matching programs).

**Milestone Escrow**  
Sponsors can pledge funds against milestones/releases; funds held in escrow and released on verifiable completion (release tag detection or moderator confirmation).

**Transparent Public Ledger (No Blockchain)**  
Append-only ledger of subscriptions, sponsorships, escrow events, payouts, and refunds. Each entry hashed & server-signed; batch hashes periodically anchored to a public location (e.g., Git commits). Downloadable CSV/JSON reports.

**Low-Fee & Self-Host Option**  
Dockerized deployment for community hosting. Optional Stripe Connect for managed payouts. UI displays exact fee breakdown before payout.

**Moderation & Trust Tools**  
Flagging, manual review flows, lightweight KYC for high-value payouts, and public moderation logs.

**Sybil Protection & Reputation**  
GitHub link + reputation score (age + contributions). Example rule: verification-eligible when GitHub account age ≥ 30 days or total contributions ≥ 3. Rate limits, CAPTCHA, anomaly detection, and community vouching supplement protections.

---

## MVP (demo scope)
- Repo-first creator profile with membership tiers and GitHub metrics.  
- README badge generator & one-click GitHub onboarding.  
- Recurring subscription flows (Stripe test mode or mocked payments).  
- Corporate sponsorship demo with milestone escrow (simulated verification).  
- Public ledger UI with signed entries, CSV export, and a verification script.  
- Admin payout dashboard, moderation tools, and a reputation-scoring demo.

---

## How the public ledger works (blockchain-free)
- **Append-only storage:** ledger entries are write-once via DB rules/triggers.  
- **Canonical JSON + hash:** each entry serialized deterministically and hashed (SHA-256).  
- **Server signature:** server signs each hash with a private key; public key is published.  
- **Public anchoring:** batch hashes committed to a public Git repo (or other public anchor) on a cadence to provide tamper-evident timestamps.  
- **Verification:** open script recomputes hashes, verifies signatures, and confirms commits in the public history. Ledger entries include payment processor IDs (e.g., Stripe) for cross-checks.

---

## Recommended tech stack
- **Frontend:** React (Vite) or Next.js — deploy on Vercel.  
- **Backend / Data:** Firebase Auth + Firestore (append-only collections) or PostgreSQL with write-once triggers. Serverless functions for signing & anchoring.  
- **Payments:** Stripe (test mode for demo), Stripe Connect for payouts; UPI gateway path for India (Razorpay / Cashfree).  
- **CI/CD:** GitHub Actions.  
- **Self-host:** Docker Compose (frontend + backend + DB).  

---

## Data & reporting
- Monthly expense report generation.  
- One-click CSV/JSON exports of transactions, sponsors, and distributions for transparency and accounting.

---

## License
MIT License

---

## Vision
Make recurring sponsorship the default for open-source projects by combining repo-first discovery, membership UX, practical anti-abuse protections, and a blockchain-free audit trail so interest converts into sustainable funding while preserving fairness and trust.

---
