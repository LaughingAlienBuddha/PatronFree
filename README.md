# Patronex

> **The open-source funding layer that actually works.**

Patronex is a **GitHub-first, community-powered platform** helping open-source maintainers and indie builders earn **recurring, transparent, and verifiable support** — with practical anti-abuse protections and a blockchain-free public ledger.

---

##  What Makes Patronex Different

| Others | Patronex |
|--------|----------|
| High platform fees | Transparent, minimal fees |
| Opaque transactions | Public, verifiable ledger |
| Vulnerable to fake accounts | GitHub-backed reputation + Sybil protection |
| Complex Web3 onboarding | Simple OAuth + repo-first discovery |

---

## Live Features

### **Repo-First Creator Pages**
Beautiful public profiles showcasing project bios, repo links, funding goals, and contribution metrics (PRs merged, releases, issues closed). Visitors immediately understand what their membership supports.

### **GitHub-First Onboarding**
One-click GitHub OAuth imports your repo metadata and contribution history automatically. README badge generator included for seamless project integration.

### **Multi-Role Dashboard Experience**
Three tailored dashboard experiences for different user types:

**🎨 Creator Dashboard**
- 📊 **Audience** — track followers, growth analytics, and engagement
- 📝 **Content** — manage posts, updates, and creator feed
- 💰 **Earnings** — view revenue, payouts, and financial insights
- 🔖 **Saved** — bookmark projects and creators for later
- 🔍 **Explore** — discover other creators and collaboration opportunities

**💻 Developer Dashboard**
- 🔍 **Explore** — discover open-source projects
- 📈 **Insights** — track project metrics and contributor activity
- 🚀 **Projects** — manage your repositories and funding goals
- 🔖 **Saved** — bookmark interesting projects
- 🤝 **Sponsors** — view and manage sponsor relationships

**❤️ Supporter Dashboard**
- 💝 **Donations** — track all your contributions in one place
- 📅 **Subscriptions** — manage recurring memberships
- 🔍 **Explore** — discover new creators and projects to support
- 👥 **Following** — keep up with creators you support
- 🔖 **Saved** — bookmark creators for later support
- ⚙️ **Settings** — customize your supporter profile

### **Dynamic Feed System**
- **Feed Composer** — creators can post updates to their supporters
- **Feed Post Cards** — rich posts with media, reactions, and engagement
- **Feed Filters** — sort by creator type, trending, or newest
- **Creator Spotlight** — highlighted creators and success stories
- **Real-time Search** — find creators and projects instantly

### **Role-Based Profiles**
- **CreatorProfile** — showcase content, earnings, and audience
- **DeveloperProfile** — highlight projects, contributions, and GitHub stats
- **SupporterProfile** — display supported creators and giving history

### **Recurring Memberships & Corporate Sponsorships**
Monthly/annual membership tiers with benefits. Corporate mode for company contributions with logo display and SLA notes.

### **Transparent Public Ledger (No Blockchain!)**--POTENTIAL FEATURE
- Append-only ledger with SHA-256 hashed entries
- Server-signed for integrity
- Periodic batch anchoring to public Git commits
- One-click CSV/JSON exports

### **Anti-Abuse & Reputation System**-- POTENTIAL FEATURE
GitHub account verification with reputation scoring (account age + contributions). Rate limiting, CAPTCHA, and anomaly detection keep the platform fair.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16 + React 19 + TypeScript |
| **Styling** | Tailwind CSS 4 + Radix UI components |
| **Backend** | Firebase Auth + Firestore |
| **Animations** | Framer Motion |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Payments** | Razor Pay integration ready |
| **Deployment** | Vercel-ready |

---

## Complete Project Structure

```
app/
├── page.tsx                    # Landing page (Hero, Features, About, CTA)
├── layout.tsx                  # Root layout with theme provider
├── globals.css                 # Global styles + Tailwind
│
├── creator/                    # Creator role flows
│   ├── page.tsx               # Creator dashboard home
│   ├── layout.tsx             # Creator sidebar layout
│   ├── audience/
│   │   └── page.tsx           # Audience analytics & followers
│   ├── content/
│   │   └── page.tsx           # Content management & posts
│   ├── earnings/
│   │   └── page.tsx           # Revenue & earnings dashboard
│   ├── explore/
│   │   └── page.tsx           # Discover other creators
│   ├── profile/
│   │   └── (empty)            # Creator public profile
│   └── saved/
│       └── page.tsx           # Saved bookmarks
│
├── developer/                  # Developer role flows
│   ├── page.tsx               # Developer dashboard home
│   ├── layout.tsx             # Developer sidebar layout
│   ├── explore/
│   │   └── page.tsx           # Discover projects
│   ├── insights/
│   │   └── page.tsx           # Project analytics
│   ├── projects/
│   │   └── page.tsx           # Manage repositories
│   ├── saved/
│   │   └── page.tsx           # Saved projects
│   └── sponsors/
│       └── page.tsx           # Sponsor management
│
├── dashboard/                  # Supporter role flows
│   ├── page.tsx               # Supporter dashboard home
│   ├── layout.tsx             # Dashboard sidebar layout
│   ├── donations/
│   │   └── page.tsx           # Donation history
│   ├── explore/
│   │   └── page.tsx           # Discover creators
│   ├── following/
│   │   └── page.tsx           # Following list
│   ├── saved/
│   │   └── page.tsx           # Saved creators
│   ├── settings/
│   │   └── page.tsx           # Account settings
│   └── subscriptions/
│       └── page.tsx           # Manage memberships
│
├── profile/
│   └── page.tsx               # User profile page
├── signin/
│   └── page.tsx               # Authentication (sign in)
├── signup/
│   └── page.tsx               # Authentication (sign up)
└── supporter/                  # (Reserved for future)

components/
├── dashboard/                  # Dashboard-specific components
│   ├── ActivityAndEarnings.tsx
│   ├── CreatorSidebar.tsx     # 36K lines - full creator navigation
│   ├── DeveloperSidebar.tsx   # 19K lines - dev navigation
│   ├── SupporterSidebar.tsx   # 40K lines - supporter navigation
│   ├── IntegrationPanel.tsx
│   ├── ProgressChecklist.tsx
│   ├── Sidebar.tsx            # Base sidebar component
│   ├── StatsGrid.tsx
│   ├── TopBar.tsx
│   └── WelcomeSection.tsx
│
├── feed/                       # Social feed components
│   ├── CreatorSpotlightCard.tsx
│   ├── FeedComposer.tsx
│   ├── FeedFilterChips.tsx
│   ├── FeedPostCard.tsx
│   ├── FeedSidebar.tsx
│   ├── FeedSkeleton.tsx
│   ├── FeedSkeletonCard.tsx
│   ├── FeedTopBar.tsx
│   ├── RightPanel.tsx
│   └── SearchSpotlight.tsx
│
├── profile/                    # Profile page components
│   ├── CreatorProfile.tsx     # 32K lines
│   ├── DeveloperProfile.tsx   # 31K lines
│   └── SupporterProfile.tsx   # 35K lines
│
├── ui/                         # 57+ Radix-based UI primitives
│   ├── accordion.tsx
│   ├── alert-dialog.tsx
│   ├── alert.tsx
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── carousel.tsx
│   ├── chart.tsx
│   ├── command.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── form.tsx
│   ├── input.tsx
│   ├── navigation-menu.tsx
│   ├── select.tsx
│   ├── sheet.tsx
│   ├── sidebar.tsx
│   ├── table.tsx
│   ├── tabs.tsx
│   ├── toast.tsx
│   └── [40+ more components...]
│
├── about-section.tsx          # Landing: About section
├── creators-developers-section.tsx
├── cta-section.tsx            # Landing: Call-to-action
├── features-section.tsx       # Landing: Features grid
├── footer.tsx                 # Site footer
├── hero-section.tsx           # Landing: Hero banner
├── navbar.tsx                 # Navigation bar
├── sliding-cards.tsx          # Landing: Animated cards
├── auth-guard.tsx             # Auth protection
├── auth-redirect-handler.tsx  # Post-auth redirects
├── reveal.tsx                 # Scroll reveal animations
└── theme-provider.tsx         # Dark/light mode

lib/
├── firebase.ts                # Firebase configuration 
├── auth-errors.ts             # Auth error handling
└── utils.ts                   # Utility functions

hooks/
├── use-mobile.ts              # Mobile detection hook
└── use-toast.ts               # Toast notification hook

types/
└── lucide-react.d.ts          # Type definitions

styles/
└── globals.css                # Global styles

public/
├── icon.svg                   # App icon
├── icon-dark-32x32.png
├── icon-light-32x32.png
├── apple-icon.png
├── placeholder-logo.png
├── placeholder-logo.svg
├── placeholder-user.jpg
├── placeholder.jpg
└── placeholder.svg
```

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase credentials
# Run development server
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) to see the magic ✨
---

## Data & Reporting

- **Monthly reports** — automated expense and revenue summaries
- **One-click exports** — CSV/JSON of transactions, sponsors, and distributions
- **Public verification** — anyone can audit the ledger independently

---

## Roadmap

- [x] Landing page with modern animations (Framer Motion)
- [x] Multi-role dashboard (Creator / Developer / Supporter)
- [x] Dynamic feed system with composer and interactions
- [x] GitHub OAuth integration
- [x] Firebase backend (Auth + Firestore) 
- [x] Role-based profiles with full feature sets
- [x] 57+ UI components (Radix + Tailwind)
- [ ] Live Razor Pay payments
- [ ] Milestone escrow system
- [ ] Self-hosted Docker deployment
- [ ] Mobile app (React Native)

---

## Contributing

Patronex is open source and built by the community, for the community. PRs welcome!

---

## License

MIT License — use it, fork it, make it yours.

---

## Vision

> *Make recurring sponsorship the default for open-source projects.*

By combining **repo-first discovery**, **smooth membership UX**, **practical anti-abuse protections**, and a **blockchain-free audit trail** — we turn casual interest into sustainable funding, fairly and transparently.

---

** Star this repo if you believe open-source deserves better funding tools!**
