# PatronFree

PatronFree aims to create a sustainable, community-governed funding ecosystem where creators — from open-source developers to digital builders — can receive transparent, democratic support.

---

## Problem

Creators — including open-source maintainers — struggle to secure sustainable, community-backed funding. Existing platforms are centralized, opaque, and rarely allow communities to democratically allocate pooled support.

---

## Overview

PatronFree is an open-source, community-first funding platform that enables creators to receive direct support from their communities. It combines one-click tipping with a democratic Community Grant Pool, where contributors collectively decide how pooled funds are allocated.

Designed to be simple, transparent, and hackathon-friendly, PatronFree focuses on fast deployment, clear user flows, and community governance without relying on complex infrastructure.

---

## 🛠️ PatronFree MVP

The MVP includes:

- Creator profile with integrated **Tip button** (Stripe test mode or mocked payment)
- Grant proposal page (create and list proposals)
- Voting UI for grant allocation (with simulated pool balance)
- Public ledger page (showing transactions and mock approvals)

---

## ⚙️ Tech Stack (Fastest + Hackable)

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

