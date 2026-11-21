# Mentora Development Changelog

All notable changes to the Mentora codebase are logged here. Updated after every code addition.

## [Unreleased] - Phases 1-10 Complete + Frontend Portal UI Redesign

### Phase 1: Project Foundation (verified)
- `backend/requirements.txt`, `backend/app/main.py`, `backend/app/core/` (config, database, logging, security, permissions, redis, storage, cors, rate_limit, upload_validation)
- `backend/app/api/v1/router.py`, `backend/alembic.ini` + `backend/migrations/`
- `backend/Dockerfile`, `backend/Dockerfile.prod`, `backend/.env.example`
- `backend/tests/` — 24 tests passing
- `frontend/package.json`, `frontend/next.config.js`, `frontend/app/layout.js`, `frontend/app/page.js`, `frontend/Dockerfile`, `frontend/Dockerfile.prod`
- `docker-compose.yml`, `docker-compose.prod.yml`, `.github/workflows/ci.yml`
- `nginx.conf` — Unified reverse proxy (port 80 → frontend + backend)
- `CHANGELOG.md`, `DEPLOYMENT.md`, `BACKUP_RESTORE.md`, `GAP_ANALYSIS.md`

### Phase 1 Verification Results
- [x] Backend dependencies install successfully (Python 3.15 compatible)
- [x] Frontend dependencies install successfully
- [x] All 24 backend tests pass
- [x] FastAPI app serves `/health`, `/health/ready`, `/api/v1/`, `/api/v1/docs`
- [x] Argon2id password hashing and verification work correctly

### Phase 2-8: Identity, Courses, Applications, Payments, Resources, Mentorship, Approvals
- All 12 domain modules implemented with models, schemas, services, routers
- 8 Alembic database migrations (0001-0008)
- All backend tests pass

### Phase 9: Notifications and Public Content
- Public content module with About Us, Testimonials, Contact
- Public + Admin content endpoints

### Phase 10: Hardening, Deployment & Frontend UI Redesign (NEW)
- `frontend/app/globals.css` — Design tokens: Abyss Teal (#0F4C5C ~80%) + Desert Sand (#E9C46A ~20%) ONLY
- `nginx.conf` — Nginx reverse proxy configuration (port 80 → frontend + backend)
- `nginx.Dockerfile` — Nginx Docker image
- `docker-compose.yml` — Fixed: nginx uses `image: nginx:alpine` with volume mount, removed node_modules volume mounts, added .env.example support
- `docker-compose.prod.yml` — Fixed: added nginx service to production compose
- `backend/.dockerignore` — Excludes __pycache__, .env, .pytest_cache, etc.
- `frontend/.dockerignore` — Excludes node_modules, .next, .env, etc.
- `frontend/.env.example` — Frontend environment variables template

- `frontend/app/components/Navbar.jsx` — Shared navigation with working Next.js Links
- `frontend/app/components/Footer.jsx` — Shared footer with site links
- All frontend pages rewritten with working navigation:
  - `frontend/app/page.js` — Home page with hero section, features grid, stats
  - `frontend/app/about/page.js` — About Us
  - `frontend/app/contact/page.js` — Contact / Help with form
  - `frontend/app/courses/page.js` — Public course listing
  - `frontend/app/courses/[courseId]/page.js` — Course detail with batches
  - `frontend/app/auth/login/page.js` — Login (Student ID or email + password)
  - `frontend/app/auth/signup/page.js` — Student registration
  - `frontend/app/student/layout.js` + 7 pages — Student portal
  - `frontend/app/teacher/layout.js` + 8 pages — Teacher portal
  - `frontend/app/admin/layout.js` + 12 pages — Admin portal
- All pages use ONLY Abyss Teal and Desert Sand colors (no other brand colors)
- All navigation uses Next.js `<Link>` for working client-side routing (fixes button/page not opening)
- Mobile-responsive design with cards, gradients, and clean typography (inspired by modern SaaS design)

### Neon Database Setup (NEW)
- `backend/alembic.ini` — Updated `sqlalchemy.url` to Neon PostgreSQL connection string; fixed `black.options` escaping (`%%(version)s`)
- `backend/.env` — Created with Neon `DATABASE_URL` (postgresql+asyncpg://neondb_owner:...@ep-falling-morning-bfxxdj5x-pooler.c-5.us-west-2.aws.neon.tech/neondb)
- `backend/migrations/versions/0002_courses_batches_teachers.py` — Fixed `sa.text("now()")` → `datetime.now(timezone.utc)` for asyncpg compatibility
- `backend/migrations/versions/0006_mentorship_attendance.py` — Fixed PostgreSQL-incompatible `XOR` → `((weekly_session_id IS NOT NULL) AND (booking_id IS NULL)) OR ...`
- All 8 Alembic migrations applied to Neon, creating all 30 tables
- All 24 backend tests pass against Neon database

### Design System
- Colors: Abyss Teal (#0F4C5C), Desert Sand (#E9C46A), neutral grays only
- Components: Buttons (primary/secondary/outline), Cards, Badges, Alerts, Forms, Tables, Stats
- Layout: Sticky navbar, hero section, feature grids, section headers, footer

### Gap Analysis
- `GAP_ANALYSIS.md` — Complete pre-deployment review

### Total Test Results
- [x] All 24 backend tests pass
