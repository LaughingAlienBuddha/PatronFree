# PatronFree

Community-powered funding with transparent accountability for creators.

## Overview

PatronFree is an open-source, community-first funding platform that empowers creators — including open-source maintainers — to receive direct support from their communities.

The platform combines one-click tipping with a democratic Community Grant Pool, where contributors collectively decide which projects should receive pooled funding. PatronFree focuses on transparency, simplicity, and fast deployment — making it ideal for hackathons and real-world iteration.

---

## Problem

Creators and OSS maintainers struggle to secure sustainable, community-backed funding. Existing platforms are centralized and rarely allow communities to democratically allocate pooled support.

---

## PatronFree MVP (Hackathon Scope)

The MVP includes:

- Creator profile with integrated **Tip button** (Stripe test mode or mocked payment)
- Grant proposal page (create and list proposals)
- Voting UI for grant allocation (with simulated pool balance)
- Public ledger page (showing transactions and mock approvals)

---

## Tech Stack (Fastest + Hackable)

**Frontend**
- React (Vite) or Next.js
- Deployed on Vercel

**Backend / Infra**
- Firebase Auth (authentication)
- Firestore (database)
- Firebase Storage
- Firebase Functions (optional backend logic)

**Payments**
- Stripe (test mode) or mocked payment buttons

**CI/CD**
- GitHub Actions for basic linting and deploy

**License**
- MIT License  
- Includes CONTRIBUTING.md

---

## Vision

PatronFree aims to create a sustainable, community-governed funding ecosystem where creators — from open-source developers to digital builders — can receive transparent, democratic support.

---
