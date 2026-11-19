Mentora --- Architecture Review and Implementation Plan
Status: Phase 0 complete — awaiting product owner review and approval
Rule: Do not begin feature implementation until the architecture
review gate is approved by the product owner.
1. Purpose
This plan turns the Mentora PRD into a controlled implementation
sequence. The goal is to prevent an AI coding agent from generating a
large, inconsistent application in one pass.

Read: - AGENTS.md - docs/PRD.md - This file

Keep the PRD as the source of truth for product behavior. Keep this file
updated as phases are completed.
2. Initial architecture
Use a modular monolith:
Browser
  |
  +-- Next.js / React / JavaScript
  |      Public pages
  |      Student Portal
  |      Teacher Portal
  |      Admin Portal
  |
  +-- HTTPS API requests
         |
       Render / API service
         |
       FastAPI application
         |
         +-- Auth and users
         +-- Courses and batches
         +-- Applications and intro calls
         +-- Enrollments and payments
         +-- Resources and progress
         +-- Mentorship and attendance
         +-- Notifications
         +-- Admin approvals and audit
         |
         +-- PostgreSQL (permanent data)
         +-- Redis (cache/temporary state)
         +-- Private object storage (resource files)
Nginx configuration should be available for local development and
possible future unified routing. Do not add a paid or always-on Nginx
deployment service unless there is a concrete need.
Architecture principles
- One frontend.
- One FastAPI backend.
- One PostgreSQL database.
- Redis is optional and non-authoritative.
- Private object storage behind a storage abstraction.
- REST API under /api/v1.
- SQLAlchemy 2.x and Alembic.
- Backend owns business logic and permissions.
- Database transactions protect capacity and approval workflows.
- No microservices in the first release.
3. Repository inspection checklist (completed — Phase 0)
- [x] Inspect root directory and existing source files.
  Findings: Repository contains only documentation — AGENTS.md (project rules),
  Docs/PRD.md (product requirements), Docs/IMPLEMENTATION_PLAN.md (this plan).
  No application source code exists yet.
- [x] Inspect Git status and current branch.
  Findings: Not a git repository yet. Git initialization is a Phase 1 task.
- [x] Identify existing frontend/backend applications.
  Findings: None exist. Frontend (Next.js) and backend (FastAPI) must be scaffolded in Phase 1.
- [x] Identify package managers and dependency versions.
  Findings: None exist yet. To be selected in Phase 1 (Python/pip for backend, npm for frontend).
- [x] Identify existing environment files without printing secret values.
  Findings: None exist yet. .env.example to be created in Phase 1.
- [x] Identify existing Docker and Nginx configuration.
  Findings: None exist yet. Dockerfiles and docker-compose.yml to be added in Phase 1.
- [x] Identify tests and CI workflows.
  Findings: None exist yet. GitHub Actions workflow to be added in Phase 1/CI setup.
- [x] Identify reusable code and existing conventions.
  Findings: None exist yet. Conventions are defined in AGENTS.md and this plan.
- [x] Identify files that must not be overwritten.
  Findings: AGENTS.md, Docs/PRD.md, Docs/IMPLEMENTATION_PLAN.md are source-of-truth documents
  and must be preserved. Do not modify or delete existing application files (none exist yet).
- [x] Record technical debt and blockers.
  Findings: No technical debt (greenfield project). Blocker: product owner approval of Phase 0
  architecture documents is required before Phase 1 coding begins.
4. Architecture review gate --- deliverables produced (Phase 0 complete)
All architecture documents have been created and are ready for product owner review:
1. docs/ARCHITECTURE.md — COMPLETE
   - Context and component diagram.
   - Frontend/backend boundaries.
   - Module responsibilities.
   - External services.
   - Deployment topology.
   - Failure/degradation behavior.
2. docs/ERD.md — COMPLETE
   - Mermaid ER diagram.
   - Entity descriptions.
   - Cardinalities.
   - Important constraints.
   - Enrollment, application, payment and booking relationships.
3. docs/DATABASE_DESIGN.md — COMPLETE
   - Proposed tables and columns (20+ tables).
   - Primary/foreign keys, unique/check constraints, indexes.
   - Lifecycle/status fields.
   - Migration strategy (Alembic).
4. docs/API_DESIGN.md — COMPLETE
   - Endpoint list by module (public, student, teacher, admin).
   - Authentication requirements (session-based, HTTP-only cookies).
   - Role/object authorization.
   - Request/response schema examples.
   - Error and pagination conventions.
5. docs/PERMISSIONS.md — COMPLETE
   - Student/Teacher/Admin permission matrix across all domains.
   - Object-level access rules.
   - Critical-action approval policy (two distinct Admins).
6. docs/OPEN_QUESTIONS.md — COMPLETE
   - All 14 unresolved PRD decisions with proposed defaults.
   - 10 technical risks with likelihood/impact/mitigation.
   - Phase-blocking analysis for each question.
7. docs/IMPLEMENTATION_PLAN.md — COMPLETE (this file, updated).
   - Repository-specific tasks and progress recorded.
Stop after producing these documents. Ask the product owner to review
and approve them. Do not implement application features before
approval.
5. Proposed backend module boundaries
Keep one deployable FastAPI application, with modules such as:
backend/
  app/
    main.py
    core/
      config.py
      database.py
      security.py
      permissions.py
      redis.py
      storage.py
      logging.py
    api/
      v1/
        router.py
    modules/
      auth/
      users/
      courses/
      batches/
      applications/
      introductory_sessions/
      enrollments/
      payments/
      resources/
      progress/
      mentorship/
      attendance/
      notifications/
      approvals/
      audit/
      admin/
    tests/
  migrations/
Each domain module should own its schemas, routes, services and
models/repository code as appropriate. Avoid circular dependencies.
Shared infrastructure belongs in core, not duplicated across modules.
6. Proposed frontend boundaries
Use Next.js App Router and JavaScript.

Suggested route groups:
frontend/
  app/
    (public)/
      page.js
      about/
      courses/
      testimonials/
      contact/
    (auth)/
      login/
      signup/
    student/
      dashboard/
      applications/
      enrollments/
      resources/
      mentorship/
      profile/
      notifications/
    teacher/
      dashboard/
      batches/
      students/
      resources/
      mentorship/
      attendance/
      profile/
    admin/
      dashboard/
      students/
      teachers/
      courses/
      batches/
      applications/
      enrollments/
      payments/
      resources/
      mentorship/
      approvals/
      audit-logs/
      settings/
This is a proposed route layout, not permission enforcement. FastAPI
must enforce access on every protected operation.
7. Implementation phases and exit criteria
Phase 0 --- Inspection and architecture (no application feature coding) — COMPLETE
Tasks: - Inspect repository. - Produce architecture, ERD, database, API
and permission documents. - List open questions and risks. - Confirm
existing code preservation strategy. - Present the phased plan.

Exit criteria: - [x] All architecture documents exist. - [ ] Product owner has
  reviewed and approved the architecture (PENDING). - [x] No unresolved question
  blocks the next phase (all open questions have safe reversible defaults).
Status: Awaiting product owner approval before Phase 1 begins.
Phase 1 --- Project foundation
Tasks: - Establish frontend and backend project structure. - Configure
environment settings. - Configure PostgreSQL connection. - Configure
Redis as optional. - Configure SQLAlchemy and Alembic. - Add Dockerfiles
and Docker Compose for local development. - Add health/readiness
endpoints. - Add structured logging and centralized error handling. -
Add initial CI checks.

Exit criteria: - Frontend and backend start locally. - Database
migration can run from a clean database. - Health checks work. - Docker
Compose works. - No secrets are committed. - Basic tests and build
checks pass.
Phase 2 --- Identity and access control
Tasks: - User and role models. - Student profile. - Teacher profile. -
Student ID generation. - Student signup/login/logout. - Teacher account
creation by Admin. - Secure initial Admin bootstrap for two Admin
accounts. - Password hashing and recovery baseline. - Role and
object-level permission dependencies.

Exit criteria: - Student can register and log in. - Student ID is
unique. - Email normalization/uniqueness works. - Shared phone number
behavior matches approved policy. - Teacher cannot self-register. -
Admin accounts are securely provisioned. - Student, Teacher and Admin
route access is tested.
Phase 3 --- Courses, batches and teacher assignment
Tasks: - Course CRUD. - Three initial course seed records: Rise, Spark,
Apex. - Exam target/date and editable price. - Batch CRUD. - Batch
naming. - Batch dates, schedule and capacity. - Many-to-many teacher
assignments. - Public course and batch browsing. - Capacity calculation
and concurrency-safe reservation service.

Exit criteria: - One course can have multiple batches. - One batch can
have multiple teachers. - One teacher can teach multiple batches. -
Public browsing works without login. - Full batches cannot accept new
applications. - Concurrent seat allocation cannot overbook.
Phase 4 --- Applications and introductory calls
Tasks: - Student selects course and batch. - Preserve selected batch
through login/signup. - Create batch application. - Automatically create
introductory-call record. - Seven-day follow-up deadline. - Admin call
scheduling and completion. - Admin rescheduling. - Student status
visibility. - In-app notifications.

Exit criteria: - Application is tied to the correct
student/course/batch. - Introductory call is created exactly once per
relevant application. - Admin can record outcome. - Rescheduling is
visible to student. - Deadline and timezone behavior are tested.
Phase 5 --- Payments and enrollment
Tasks: - Manual payment record. - Discount and quoted-price snapshot. -
Payment status. - Admin activation workflow. - Enrollment access
rules. - Enrollment expiry service. - Student enrollment history. -
Batch transfer request workflow.

Exit criteria: - No payment gateway exists. - Admin can record payment
and activate enrollment. - Active enrollment grants the correct
access. - Expiry occurs at exam date plus seven days. - Expired students
retain account/history. - Multiple enrollments per student work. - Batch
capacity and cancellation/rejection release rules are tested.
Phase 6 --- Resources and learning progress
Tasks: - Course/module/chapter structure. - Resource metadata and
types. - Storage abstraction. - Private object storage integration after
provider selection. - Teacher draft/edit/publish. - Admin unpublish. -
Teacher deletion request and Admin approval. - Protected student
resource access. - PDF download. - Bookmarks. - Manual completion and
progress.

Exit criteria: - Teacher sees only assigned courses/batches. - Students
see only authorized resources. - Private files are not publicly
enumerable. - Teacher cannot unpublish or directly delete. - Admin can
unpublish and approve deletion. - Opening a resource does not mark it
complete. - Progress persists in PostgreSQL.
Phase 7 --- Mentorship and attendance
Tasks: - Recurring weekly batch schedule. - Individual weekly session
occurrences. - Admin schedule/time management. - Teacher one-to-one
booking. - Admin one-to-one booking. - Teacher approval/rejection. -
Admin approval/rescheduling. - Attendance. - Student/teacher/admin
booking views.

Exit criteria: - Every eligible batch can have a recurring weekly
schedule. - Only Admin edits the recurring schedule. - Students can
request a preferred assigned teacher. - Teacher can manage own
bookings. - Admin can view all bookings. - Attendance is persisted and
permission-checked.
Phase 8 --- Two-Admin approval and audit
Tasks: - Approval request model/service. - Distinct Admin votes. -
Critical-action policy registry. - Two-approval execution. - Rejection
handling. - Audit log. - Admin approval dashboard.

Exit criteria: - Critical action cannot execute after only one
approval. - Same Admin cannot cast both approvals. - Duplicate votes are
blocked. - Rejected request does not execute. - Executed action and
votes are audited. - Approval payload cannot execute arbitrary code/SQL.
Phase 9 --- Notifications and public content
Tasks: - In-app notification center. - Read/unread state. - Event-driven
notification creation. - Home page. - About Us. - Founder profiles. -
Courses and batch landing pages. - Testimonials and success stories with
consent controls. - Contact/help content.

Exit criteria: - Notifications are persisted in PostgreSQL. - Correct
users receive relevant notifications. - Public content is editable where
required. - No unverified founder/student claims are published.
Phase 10 --- Hardening and deployment
Tasks: - Unit and integration test coverage. - Permission regression
tests. - End-to-end critical flows. - Upload validation. - Rate
limiting. - CORS and security configuration. - Database backup/export
and restore guide. - Docker production configuration. - GitHub Actions
checks. - Render frontend/backend deployment. - External
database/Redis/storage configuration. - Deployment and rollback
documentation.

Exit criteria: - Production build succeeds. - Tests pass. - Environment
variables are documented. - No secrets in repository. - Protected files
and routes are tested. - Database backup/restore procedure is documented
and tested. - Free-tier limitations are documented. - Application
degrades safely if Redis or a free service is unavailable.
8. Cross-cutting test scenarios
These must be tested throughout implementation, not postponed until the
end:
Identity
- Duplicate email rejected.
- Unique Student ID generated.
- Shared phone number does not cause account confusion.
- Passwords never stored in plain text.
- Student cannot access Admin endpoints.
Capacity
- Two users compete for the last seat.
- Only one reservation succeeds.
- Rejected/cancelled reservation releases capacity.
- No waitlist is created.
Enrollment
- Student can enroll in multiple courses.
- Student can enroll in multiple batches where permitted.
- Enrollment requires Admin activation after manual payment
  verification.
- Expiry blocks resources but preserves history.
Resources
- Student without enrollment cannot download a protected file.
- Student from another batch cannot access a batch-restricted file.
- Teacher cannot edit another teacher's resource unless explicitly
  authorized.
- Admin unpublish takes effect immediately.
Mentorship
- Teacher can approve only their own booking.
- Student cannot book an unassigned teacher.
- Admin can view all bookings.
- Attendance can be marked only by authorized users.
Approvals
- Two distinct Admins required.
- Same Admin cannot approve twice.
- Rejection prevents execution.
- Audit log records proposal, votes and execution.
9. Open questions to resolve before the relevant phase
Do not guess these:
1. What does registration reset "after around 15" mean? Do not
   implement deletion/reset yet.
2. Exact account recovery process and whether email provider will be
   configured.
3. Final storage provider and current free-tier terms.
4. Exact final Abyss Teal and Desert Sand hex values.
5. Exact critical-action list requiring both Admin approvals.
6. Introductory-call no-show and rescheduling policy.
7. Public teacher profile visibility.
8. Mentorship cancellation/rescheduling cutoff.
9. Batch transfer seat/payment treatment.
10. Whether pending-payment applications reserve a seat indefinitely or
    for a fixed period.
11. Whether duplicate active enrollment in the same batch is allowed.
12. Exact meeting method for mentorship.
13. Exact profile fields students can edit.
14. Admin-assisted password reset procedure.
A question only blocks a phase if that phase depends on its answer. Use
safe, reversible defaults where possible and document them.
10. Definition of done for every phase
A phase is complete only when:
- Requirements for that phase are implemented.
- API and UI behavior are connected.
- Authorization is enforced server-side.
- Database migrations are included.
- Relevant tests pass.
- Build/lint checks pass.
- Documentation is updated.
- Known limitations are listed.
- The application remains runnable.
At the end of each phase, report: - What was implemented. - Files
created/changed. - Database changes. - API endpoints added/changed. -
Tests run and results. - Remaining issues. - Any decision needed from
the product owner.

Do not silently continue to the next phase if a blocking issue is
discovered.
11. First instruction to the coding agent
Phase 0 is complete. All architecture documents have been produced:

docs/ARCHITECTURE.md, docs/ERD.md, docs/DATABASE_DESIGN.md,
docs/API_DESIGN.md, docs/PERMISSIONS.md, docs/OPEN_QUESTIONS.md,
docs/IMPLEMENTATION_PLAN.md (updated).

Do not implement application features yet. Present these documents to the
product owner for review and approval. Once approved, proceed to Phase 1
(Project foundation).