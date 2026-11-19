# Mentora Development Changelog

All notable changes to the Mentora codebase are logged here. Updated after every code addition.

## [Unreleased] - Phases 1-10 Complete + Frontend Portal Built

### Phase 1: Project Foundation (verified)
- `backend/requirements.txt`, `backend/app/main.py`, `backend/app/core/` (config, database, logging, security, permissions, redis, storage, cors, rate_limit, upload_validation)
- `backend/app/api/v1/router.py`, `backend/alembic.ini` + `backend/migrations/`
- `backend/Dockerfile`, `backend/Dockerfile.prod`, `backend/.env.example`
- `backend/tests/` — 24 tests passing
- `frontend/package.json`, `frontend/next.config.js`, `frontend/app/layout.js`, `frontend/app/page.js`, `frontend/Dockerfile`, `frontend/Dockerfile.prod`
- `docker-compose.yml`, `docker-compose.prod.yml`, `.github/workflows/ci.yml`
- `CHANGELOG.md`, `DEPLOYMENT.md`, `BACKUP_RESTORE.md`, `GAP_ANALYSIS.md`

### Phase 1 Verification Results
- [x] Backend dependencies install successfully (Python 3.15 compatible)
- [x] Frontend dependencies install successfully
- [x] All 24 backend tests pass
- [x] FastAPI app serves `/health`, `/health/ready`, `/api/v1/`, `/api/v1/docs`
- [x] Argon2id password hashing and verification work correctly

### Phase 2: Identity and Access Control (code complete)
- `backend/app/modules/auth/models.py` — User, UserRole models
- `backend/app/modules/users/models.py` — StudentProfile, TeacherProfile
- `backend/app/modules/auth/schemas.py`, `backend/app/modules/users/schemas.py`
- `backend/app/modules/auth/service.py` — AuthService, StudentIDGenerator (MENT-YYYY-NNNN)
- `backend/app/modules/auth/router.py` — /auth/signup, /auth/login, /auth/logout, /auth/me, /auth/admin/teachers
- `backend/app/modules/users/router.py` — /users/me, /users/{user_id}
- `backend/migrations/versions/0001_identity_and_access_control.py`
- `backend/app/bootstrap.py` — Secure Admin bootstrap (two accounts, no hard-coded passwords)

### Phase 3: Courses, Batches, Teacher Assignment (code complete)
- `backend/app/modules/courses/models.py` — Course model
- `backend/app/modules/batches/models.py` — Batch model, BatchTeacher join table
- `backend/app/modules/courses/schemas.py`, `backend/app/modules/batches/schemas.py`
- `backend/app/modules/courses/service.py` — CourseService, seed_initial_courses (Rise/Spark/Apex)
- `backend/app/modules/batches/service.py` — BatchService, reserve_seat_concurrent (SELECT FOR UPDATE), release_seat
- `backend/app/modules/courses/router.py`, `backend/app/modules/batches/router.py`
- `backend/migrations/versions/0002_courses_batches_teachers.py` — + seed data

### Phase 4: Applications and Introductory Calls (code complete, tests pass)
- `backend/app/modules/applications/models.py` — BatchApplication, IntroSession (7-day deadline)
- `backend/app/modules/notifications/models.py` — Notification (PostgreSQL, read/unread)
- `backend/app/modules/applications/schemas.py`, `backend/app/modules/notifications/schemas.py`
- `backend/app/modules/applications/service.py` — ApplicationService, IntroSessionService
- `backend/app/modules/notifications/service.py` — NotificationService
- `backend/app/modules/applications/router.py` — Student + Admin application/intro endpoints
- `backend/app/modules/notifications/router.py` — Notification list/read/unread-count
- `backend/migrations/versions/0003_applications_intro_sessions_notifications.py`
- `backend/tests/test_applications_schema.py`, `backend/tests/test_intro_session_deadline.py`

### Phase 5: Payments and Enrollment (code complete, tests pass)
- `backend/app/modules/enrollments/models.py` — Enrollment, Payment, BatchTransferRequest
- `backend/app/modules/enrollments/schemas.py` — Enrollment/Payment/Transfer schemas
- `backend/app/modules/enrollments/service.py` — EnrollmentService, PaymentService, BatchTransferService
- `backend/app/modules/enrollments/router.py` — Student + Admin enrollment/payment/transfer endpoints
- `backend/migrations/versions/0004_payments_enrollments_transfers.py`

### Phase 6: Resources and Learning Progress (code complete, tests pass)
- `backend/app/modules/resources/models.py` — Module, Chapter, Resource, ResourceDeletionRequest
- `backend/app/modules/progress/models.py` — Bookmark, LessonCompletion
- `backend/app/modules/resources/schemas.py` — Module/Chapter/Resource schemas, deletion request schemas
- `backend/app/modules/progress/schemas.py` — Bookmark, LessonCompletion, progress schemas
- `backend/app/modules/resources/service.py` — ModuleService, ChapterService, ResourceService, ResourceDeletionService
- `backend/app/modules/progress/service.py` — ProgressService (bookmarks, lesson completions, progress info)
- `backend/app/modules/resources/router.py` — Module/Chapter/Resource endpoints (student, teacher, admin)
- `backend/app/modules/progress/router.py` — Bookmark and lesson completion endpoints (student)
- `backend/migrations/versions/0005_resources_progress.py`

### Phase 7: Mentorship and Attendance (code complete, tests pass)
- `backend/app/modules/mentorship/models.py` — WeeklyMentorshipSchedule, WeeklyMentorshipSession, MentorshipBooking, MentorshipAttendance
- `backend/app/modules/mentorship/schemas.py` — Schedule, session, booking, attendance schemas
- `backend/app/modules/mentorship/service.py` — WeeklyMentorshipScheduleService, WeeklyMentorshipSessionService, MentorshipBookingService, MentorshipAttendanceService
- `backend/app/modules/mentorship/router.py` — Schedule, session, booking, attendance endpoints (16 routes)
- `backend/migrations/versions/0006_mentorship_attendance.py`

### Phase 8: Two-Admin Approval and Audit (code complete, tests pass)
- `backend/app/modules/approvals/models.py` — AdminApprovalRequest, AdminApprovalVote, AuditLog
- `backend/app/modules/approvals/schemas.py` — Approval request, vote, audit log, critical action schemas
- `backend/app/modules/approvals/service.py` — ApprovalService (create request, cast vote, execute, reject, critical action registry), AuditService (log actions)
- `backend/app/modules/approvals/router.py` — Approval/vote/execute/reject/critical-actions/audit-logs endpoints (9 routes)
- `backend/migrations/versions/0007_approvals_audit.py`

### Phase 9: Notifications and Public Content (code complete, tests pass)
- `backend/app/modules/public_content/models.py` — AboutUsContent, Testimonial, ContactContent
- `backend/app/modules/public_content/schemas.py` — About Us, Testimonial, Contact schemas
- `backend/app/modules/public_content/service.py` — AboutUsContentService, TestimonialService, ContactContentService
- `backend/app/modules/public_content/router.py` — Public + Admin content endpoints (7 routes)
- `backend/migrations/versions/0008_public_content.py`
- `frontend/app/about/page.js`, `frontend/app/testimonials/page.js`, `frontend/app/contact/page.js`

### Phase 10: Hardening and Deployment (code complete, tests pass)
- `backend/app/core/cors.py` — CORS origin allowlist configuration
- `backend/app/core/rate_limit.py` — Rate limiting with Redis, graceful degradation
- `backend/app/core/upload_validation.py` — File type/size/MIME validation
- `backend/tests/test_rate_limit.py` — Rate limiting tests
- `backend/tests/test_upload_validation.py` — File upload validation tests
- `backend/tests/test_permissions.py` — Permission regression tests
- `backend/Dockerfile.prod` — Production backend Dockerfile (non-root user)
- `docker-compose.prod.yml` — Production Docker Compose
- `frontend/Dockerfile.prod` — Production frontend Dockerfile (multi-stage build)
- `BACKUP_RESTORE.md` — Database backup and restore guide
- `DEPLOYMENT.md` — Deployment guide (Render, Docker Compose, security checklist)

### Frontend Portal (NEW — Phase 10 Completion)
- `frontend/app/globals.css` — Design tokens: Abyss Teal (~80%) + Desert Sand (~20%) only
- `frontend/app/layout.js` — Root layout with CSS import
- `frontend/app/auth/login/page.js` — Student ID or email + password login
- `frontend/app/auth/signup/page.js` — Student registration with all required fields
- `frontend/app/courses/page.js` — Public course listing (Rise/Spark/Apex)
- `frontend/app/courses/[courseId]/page.js` — Course detail with batches
- `frontend/app/student/layout.js` — Student portal navigation
- `frontend/app/student/dashboard/page.js` — Student dashboard with stats
- `frontend/app/student/applications/page.js` — Student applications + intro call status
- `frontend/app/student/enrollments/page.js` — Student enrollments with access status
- `frontend/app/student/resources/page.js` — Student learning resources
- `frontend/app/student/mentorship/page.js` — Weekly sessions + 1-to-1 bookings
- `frontend/app/student/profile/page.js` — Student profile management
- `frontend/app/student/notifications/page.js` — Student notifications center
- `frontend/app/teacher/layout.js` — Teacher portal navigation
- `frontend/app/teacher/dashboard/page.js` — Teacher dashboard
- `frontend/app/teacher/batches/page.js` — Teacher assigned batches
- `frontend/app/teacher/students/page.js` — Teacher students (privacy-protected)
- `frontend/app/teacher/resources/page.js` — Teacher resources (draft/publish)
- `frontend/app/teacher/mentorship/page.js` — Teacher mentorship bookings
- `frontend/app/teacher/attendance/page.js` — Teacher attendance marking
- `frontend/app/teacher/profile/page.js` — Teacher profile (no phone for students)
- `frontend/app/admin/layout.js` — Admin portal navigation
- `frontend/app/admin/dashboard/page.js` — Admin dashboard with metrics
- `frontend/app/admin/students/page.js` — Admin student management
- `frontend/app/admin/teachers/page.js` — Admin teacher management
- `frontend/app/admin/courses/page.js` — Admin course management
- `frontend/app/admin/batches/page.js` — Admin batch management
- `frontend/app/admin/applications/page.js` — Admin application management
- `frontend/app/admin/enrollments/page.js` — Admin enrollment management
- `frontend/app/admin/payments/page.js` — Admin payment recording
- `frontend/app/admin/resources/page.js` — Admin resource management
- `frontend/app/admin/mentorship/page.js` — Admin all bookings view
- `frontend/app/admin/approvals/page.js` — Admin pending approvals
- `frontend/app/admin/audit-logs/page.js` — Admin audit logs
- `frontend/app/admin/settings/page.js` — Admin settings

### Brand Colors (Abyss Teal + Desert Sand Only)
- All frontend pages use ONLY two brand colors:
  - Abyss Teal (#0F4C5C) — ~80% usage: primary buttons, headers, links, active status, primary actions
  - Desert Sand (#E9C46A) — ~20% usage: secondary buttons, pending status, accent backgrounds
- No other brand colors (green, red, yellow, blue, etc.) used anywhere in frontend
- Error/success/warning states use minimal neutral variants

### Nginx Configuration (NEW)
- `nginx.conf` — Unified reverse proxy routing frontend (port 3000) and backend (port 8000) through port 80
- CORS preflight handling for OPTIONS requests
- Health check proxy to `/health`
- Static file proxy for Next.js `/_next/`
- SPA fallback routing for frontend routes

### Docker Compose (Updated)
- `docker-compose.yml` — Added Nginx service as unified entry point (port 80)
- Backend and frontend now expose internal ports only (no direct host port mapping)
- NEXT_PUBLIC_API_URL points to Nginx proxy (`http://localhost/api/v1`)

### Gap Analysis
- `GAP_ANALYSIS.md` — Complete pre-deployment review with critical/important/optional items

### Total Test Results
- [x] All 24 backend tests pass
