# SEVCO Platform Rebuild Spec

## Goal
Rebuild the sevco-web Next.js app to match the SEVCO Wiki (wiki.sevco.pro) UI/UX exactly, while keeping all existing features and adding wiki functionality as a public-facing section.

## Design Reference
See: /data/.openclaw/workspace/memory/sevco-wiki-design-reference.md
Wiki source: /data/.openclaw/workspace/sevcowiki/

## Phase 1: Foundation (THIS PHASE)

### 1.1 Install ShadCN/UI Dependencies
The wiki uses shadcn/ui components. Install into the Next.js app:
- Already have: tailwindcss, lucide-react
- Need to add: @radix-ui packages (dialog, tabs, separator, badge, select, etc.), class-variance-authority, clsx, tailwind-merge, cmdk
- Need: shadcn/ui component files in src/components/ui/

### 1.2 Replace Color System
Replace current CSS variables in globals.css with the wiki's HSL-based system:
- Copy the full :root and .dark blocks from /data/.openclaw/workspace/sevcowiki/client/src/index.css
- Include all shadow, elevate, and utility classes
- Remove old SEVCO color system (keep SEVCO_COLORS constant for brand reference only)
- Add the wiki-content typography styles

### 1.3 Replace App Shell Layout
Current: Top navbar (Nav.tsx) + Footer (Footer.tsx) wrapping all pages
New: Sidebar + Main content layout (wiki pattern)

**Root Layout (layout.tsx):**
- Remove Nav and Footer from global layout
- Add SidebarProvider + Sidebar + main content area
- Sticky header with SidebarTrigger + ThemeToggle
- Inter font (already using Geist — switch to Inter or keep Geist, both work)

**New Sidebar (AppSidebar.tsx):**
- SEVCO logo + "SEVCO" title + "sevelovesyou.com" subtitle
- Navigation section: Home, Services, Music, Work, Shop, About, Contact
- Admin section (if authenticated): Dashboard, Users, Pages, Projects
- Wiki section: Wiki Home, Search, New Article, Review Queue
- Recent articles section (dynamic)
- Footer: "© 2026 SEVCO. All rights reserved."

**Keep separate layouts:**
- Public pages use the sidebar layout
- Auth page can be standalone (no sidebar)

### 1.4 Theme System
Replace current ThemeProvider with wiki's next-themes pattern:
- Light mode default
- Dark mode toggle
- Clean sun/moon toggle button in sticky header
- HSL variables swap between :root and .dark

### 1.5 Supabase Auth
Wire up actual Supabase authentication:
- Sign in / Sign up with email+password
- Session management
- Protected admin routes (redirect to /auth if not authenticated)
- The auth page already exists but bypasses auth — make it real
- Use the existing supabase.ts client

## Phase 2: Rebuild Existing Pages

### Admin Dashboard (/admin)
- Keep KPI cards, charts, activity feed
- Restyle using ShadCN Card components with wiki patterns
- Compact spacing (p-3/p-4, gap-3)
- hover-elevate effects instead of shadow-on-hover

### Admin Users, Pages, Projects
- Restyle tables and cards using ShadCN components
- Use wiki's badge, button, dialog patterns
- Functional search/filter (client-side filtering of the list)

### Public Pages
- All 9 public pages (services, work, music, shop, about, contact, privacy, terms, jobs)
- Restyle to use the wiki's clean card-based layout
- Use bg-background/text-foreground instead of hardcoded black/white
- Cards with hover-elevate
- Consistent with sidebar layout

## Phase 3: Wiki Integration

### Add Wiki as /wiki section
Port the wiki functionality into Next.js:
- /wiki — Wiki home (stats, featured article, recent, categories)
- /wiki/[slug] — Article view (content, infobox, citations, crosslinks, revision history)
- /wiki/new — Article editor
- /wiki/edit/[slug] — Edit existing article
- /wiki/search — Search with filters
- /wiki/review — Review queue
- /wiki/category/[slug] — Category view

### Database
Use Supabase (PostgreSQL) for wiki data. Create tables matching the wiki schema:
- categories, articles, revisions, citations, crosslinks
- Use Supabase client for queries (not Drizzle — keep it simple with the existing supabase.ts)

### API Routes
Port wiki API routes to Next.js API routes:
- /api/wiki/categories
- /api/wiki/articles
- /api/wiki/articles/[slug]
- /api/wiki/articles/search
- /api/wiki/revisions
- /api/wiki/citations
- /api/wiki/stats

## Key Files to Reference from Wiki
- index.css → Color system, utilities, wiki-content styles
- App.tsx → App shell structure
- app-sidebar.tsx → Sidebar layout
- theme-provider.tsx + theme-toggle.tsx → Theme system
- home.tsx → Home page patterns
- article-view.tsx → Article detail patterns
- article-editor.tsx → Form patterns
- search.tsx → Search UI patterns
- review-queue.tsx → Review queue patterns
- ui/*.tsx → All ShadCN components

## Build Constraints
- Must pass `npm run build` with zero errors
- All existing routes must still work
- Theme toggle must persist (localStorage)
- Responsive: mobile sidebar collapses
