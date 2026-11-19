AGENTS.md --- Mentora Project Rules
This file contains persistent instructions for any AI coding agent or
developer working in this repository.
1. Project identity
- Product: Mentora
- Domain: JEE preparation courses, student learning resources, and
  mentorship.
- Initial audience: students in Classes 9--12.
- Initial subjects/programmes: JEE Main January, JEE Main April, and
  JEE Advanced.
- Future expansion to NEET and other programmes is possible, but must
  not complicate the first release.
2. Non-negotiable engineering rules
1. Inspect the repository before editing it. Preserve useful existing
   code.
2. Read docs/PRD.md and docs/IMPLEMENTATION_PLAN.md before
   implementing a feature.
3. Do not start a later implementation phase until the current phase is
   tested and documented.
4. Do not silently change confirmed product rules. If requirements
   conflict or are ambiguous, record the issue and ask for
   clarification or isolate it behind configuration.
5. Do not implement all features in one giant file. Use small, cohesive
   modules.
6. Do not introduce microservices. Mentora starts as a modular
   monolith.
7. Do not use TypeScript. The requested frontend language is
   JavaScript.
8. Do not add payment gateways, OTP/SMS, assignment submission, live
   classroom streaming, or AI features to the initial release unless
   the product owner explicitly approves them.
9. Never commit secrets, credentials, private keys, tokens, or real
   student data.
10. Never claim a feature is complete merely because a screen exists.
    Its API, persistence, authorization, validation, and tests must
    work.
11. Prefer simple, well-supported dependencies. Explain significant new
    dependencies.
12. Keep the application runnable after each phase.
3. Technology choices
- Frontend: Next.js, React, JavaScript.
- Backend: Python, FastAPI.
- Database: PostgreSQL.
- ORM and migrations: SQLAlchemy 2.x and Alembic.
- Validation: Pydantic.
- Cache/temporary state: Redis.
- Reverse proxy: Nginx configuration is required for local/future
  unified routing; do not add an unnecessary always-on Nginx service
  to a free Render deployment if Render's routing already handles the
  public services.
- Containers: Docker and Docker Compose.
- Version control: GitHub.
- CI: GitHub Actions.
- Initial hosting target: Render, with external managed
  PostgreSQL/Redis/object storage considered where free-tier
  constraints require it.
- File storage: provider is not yet finalized. Use a storage
  abstraction; never rely on Render Free local filesystem for
  permanent uploads.
Do not assume that all services must be hosted by the same provider.
4. Architecture rules
- Use one FastAPI application and one PostgreSQL database, divided
  into domain modules.
- Keep business logic in service/domain layers, not directly in route
  handlers.
- Keep API routes thin: validate input, invoke services, return typed
  responses.
- The backend is the authority for authentication, authorization,
  capacity, enrollment access, approvals, and resource access.
- The frontend must never connect directly to PostgreSQL or Redis.
- Use dependency injection for database sessions, current user,
  permissions, Redis, and storage.
- Use REST endpoints under /api/v1.
- Generate and maintain FastAPI OpenAPI documentation.
- Use database transactions for multi-step business operations.
- Use row-level locking or equivalent transactional protection for
  batch seat reservations and other concurrency-sensitive operations.
- Redis is never the only source of truth for permanent records.
5. Data and time rules
- Use UUID primary keys where appropriate.
- Store timestamps consistently in UTC.
- Display and schedule user-facing dates/times in Asia/Kolkata.
- Use foreign keys, check constraints, indexes, and unique constraints
  deliberately.
- Do not delete student accounts or historical learning records merely
  because an enrollment expires.
- Keep payment, enrollment, attendance, approval, and audit history in
  PostgreSQL.
- Student ID must be unique.
- Email should be normalized and unique.
- Phone numbers must be validated and normalized. Do not assume phone
  number is unique; the owner has indicated that family members may
  share a number. If a login/recovery design depends on phone
  uniqueness, raise the issue rather than silently enforcing it.
6. Security and privacy rules
- Hash passwords with Argon2id or another maintained password-hashing
  algorithm.
- Never store plain-text passwords.
- Never hard-code a default permanent Admin password.
- Bootstrap the two Admin accounts through a secure one-time command
  or deployment configuration, then require secure credential setup.
- Use secure, HTTP-only cookie/session handling where appropriate. Do
  not store long-lived authentication tokens in localStorage.
- Enforce role-based and object-level authorization in FastAPI.
- A student must not access another student's records.
- A teacher must only access students, batches, and resources assigned
  to them.
- Teachers must not access payment records or unnecessary student
  contact details.
- Students must not see teacher phone numbers.
- Admin-only operations must be protected server-side, not just hidden
  in the UI.
- Validate uploaded file type, size, and content handling. Never trust
  a browser-provided filename or MIME type without validation.
- Keep object storage private. Serve protected resources only after
  backend authorization, preferably with short-lived signed URLs.
- Rate-limit login and abuse-prone endpoints.
- Restrict CORS to known frontend origins.
- Use environment variables for secrets and deployment configuration.
- Provide appropriate privacy notices and consent handling because
  students may be minors. Do not publish photos, names, testimonials,
  or results without appropriate permission.
7. Critical business rules
- Public users can browse courses and batches without logging in.
- A student selects a course, then a batch, then logs in/registers to
  submit an application.
- A student can have multiple applications and enrollments, including
  multiple batches of the same course.
- A batch belongs to exactly one course.
- A batch can have multiple teachers; a teacher can teach multiple
  batches.
- Batch capacity must not be exceeded. Pending-payment and active
  enrollments reserve seats according to the approved enrollment
  workflow.
- No waitlist in the first release.
- Admin must not move a student to another batch without a student
  request; record transfer requests and decisions.
- Payment is manually handled and recorded by Admin. No payment
  gateway in the first release.
- Course access requires an active enrollment and must respect
  course/batch resource restrictions.
- Enrollment expires one week after the relevant course's exam date.
  Keep the account and learning history.
- Weekly mentorship is available to all enrolled students.
- Students can manually mark learning resources complete. Opening a
  resource must not automatically mark it complete.
- Teacher can publish resources. Admin can unpublish. Teacher deletion
  requires Admin permission.
- Both Admins must approve critical business decisions. One Admin
  cannot provide both approvals.
8. Admin approval safety
- Implement approvals through a dedicated service, not ad hoc frontend
  logic.
- A critical action must not execute until two distinct Admin accounts
  have approved it.
- Record requester, proposed action, payload snapshot, both votes,
  timestamps, reasons, and execution outcome.
- Prevent duplicate votes and self-approval twice.
- Never execute arbitrary code or arbitrary SQL from an approval
  payload.
- Routine operations may use one Admin, according to the PRD.
- If the critical-action classification is uncertain, ask the product
  owner before implementation.
9. Resource and Redis rules
- Use a storage-provider interface so local development and a future
  cloud provider can be swapped.
- Do not store permanent uploaded files on ephemeral hosting
  filesystems.
- Store file metadata and object keys in PostgreSQL.
- Keep the object bucket private.
- Redis may cache course lists, dashboards, unread counts, temporary
  locks, rate limits, and recent activity.
- Permanent activity history must be written to PostgreSQL. Redis may
  only cache it.
- Core business functions should degrade gracefully if Redis is
  unavailable.
10. Frontend rules
- Use Next.js App Router and JavaScript.
- Separate public, student, teacher, and admin layouts/routes.
- Use reusable components for navigation, forms, tables, filters,
  pagination, dialogs, status indicators, course/batch cards, resource
  cards, notifications, and dashboards.
- Include loading, empty, error, and success states.
- Make layouts responsive for desktop, tablet, and mobile.
- Support both light and dark themes.
- Brand identity: Abyss Teal approximately 80%, Desert Sand
  approximately 20%. Exact final hex values should be confirmed in
  design tokens; do not invent them as immutable brand decisions.
- Maintain readable contrast and accessible labels.
- Never rely on hidden UI controls as authorization.
11. Testing and quality
- Add tests as features are implemented.
- Test authentication, role/object permissions, capacity concurrency,
  application/enrollment lifecycle, resource access, mentorship
  bookings, attendance, two-Admin approvals, and expiry.
- Add unit tests for business services and integration tests for
  database workflows.
- Run linting, tests, and build checks before marking a phase
  complete.
- Document commands to run tests locally.
- Avoid broad refactors unrelated to the active phase.
12. Required workflow for the coding agent
At the start of a task:
1. Read this file and the relevant PRD sections.
2. Inspect repository status and current implementation.
3. Identify the smallest safe change.
4. State the intended files and behavior to change.
5. Implement the change.
6. Add/update tests.
7. Run relevant checks.
8. Summarize changed files, tests run, results, and remaining issues.
9. Update docs/IMPLEMENTATION_PLAN.md only when progress is genuinely
   complete.
Do not begin implementation from the master prompt alone. First complete
the architecture/review gate described in docs/IMPLEMENTATION_PLAN.md