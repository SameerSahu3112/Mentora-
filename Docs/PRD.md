Mentora --- Product Requirements Document (PRD)
Status: Initial product specification
Product: Mentora
Audience: Students in Classes 9--12 preparing for JEE
Initial delivery model: Recorded/self-paced learning plus weekly and
one-to-one mentorship
Document purpose: Source of truth for product behavior and initial
release scope.
1. Product vision
Mentora is a student-focused JEE preparation platform that helps
students discover courses and batches, register for a programme, speak
with the Mentora team, complete manual enrollment, access learning
resources, and receive mentorship.

Mentora is not an instant self-checkout platform. Enrollment is managed
by the administrative team:

Browse course → Select batch → Register → Introductory phone call →
Manual payment → Admin activates enrollment → Access learning resources
and mentorship.

The platform has three portals:
1. Student Portal
2. Teacher Portal
3. Admin Portal
There are two initial Admin accounts with equal permissions.
2. Goals
- Present courses and available batches publicly.
- Let students register interest in a selected batch.
- Automatically create an introductory-call record after registration.
- Let Admins manage calls, payments, applications, batches, teachers,
  and enrollments.
- Give enrolled students access to course resources.
- Let teachers manage resources for assigned courses/batches.
- Provide weekly batch mentorship and one-to-one mentorship.
- Preserve student accounts and learning history after enrollment
  expiry.
- Protect critical business decisions through approval from both
  Admins.
- Keep the first release maintainable and affordable.
3. Non-goals for the first release
Do not implement these unless explicitly approved later:
- Online payment gateway or checkout.
- OTP/SMS authentication.
- Live classroom streaming.
- Assignment answer submission, grading, or marking.
- AI tutor, AI chatbot, or AI-generated learning features.
- NEET or non-JEE course catalogue (keep the model extensible, but
  initial content is JEE).
- Microservices.
- Paid custom domain or paid infrastructure as a launch prerequisite.
4. Users and roles
4.1 Public visitor
Can browse public pages, courses, course details, and batches. Must
authenticate to submit a batch application.
4.2 Student
Can manage their profile, apply to batches, see application and
introductory-call status, view enrollments, access resources for active
enrollments, bookmark resources, manually mark lessons complete, and use
mentorship features.

A student may have multiple applications and multiple enrollments,
including more than one batch of the same course.
4.3 Teacher
Teacher accounts are created by Admin only. Teachers can access only
their assigned courses and batches, see names and learning progress of
students in assigned batches, create/edit/publish resources, request
resource deletion, manage their own mentorship bookings, and mark
attendance where permitted.

Teachers cannot self-register, manage payments, assign themselves to
batches, unpublish resources, or directly delete resources without Admin
permission. Teacher phone numbers are not shown to students.
4.4 Admin
There are two initial Admins with equal permissions. Both can manage the
entire platform. Critical business decisions require approval from both
Admin accounts.
5. Courses and batches
5.1 Initial courses
  Course   Exam target                      Initial price
  Rise     JEE Main --- January attempt              ₹299
Spark    JEE Main --- April attempt                ₹499
Apex     JEE Advanced                              ₹699

These are the three initial course names, not a separate plans
catalogue. There is no Plans page.

Course price and exam date must be stored in the database and editable
by Admin. Admin may offer a discount. A price change must not silently
alter the price already quoted to an existing application/enrollment.
5.2 Batch model
A course has many batches. Admin names batches manually, for example
Apex 1.0, Apex 2.0.

Each batch has:
- Course
- Name
- Description
- Start date and end date
- Weekly schedule
- Maximum capacity
- Assigned teachers
- Availability/status
A batch belongs to exactly one course.

A batch can have multiple teachers. A teacher can be assigned to
multiple batches.

Admin manages batch details and capacity. Batch schedule and capacity
are managed by Admin.
5.3 Capacity
- No waitlist.
- When a batch is full, prevent new applications and show the batch as
  full/closed.
- Prevent overbooking through PostgreSQL transactions and
  concurrency-safe capacity checks.
- Pending-payment and active enrollments reserve seats according to
  the enrollment workflow.
- Release a reserved seat when the application/enrollment is rejected
  or cancelled.
- Do not automatically transfer a student to another batch.
5.4 Batch transfer
A student must request a transfer before Admin changes their batch.
Admin handles the request manually. Record the reason, original batch,
requested batch, decision, responsible Admin, and timestamps.
6. Public website and navigation
There is no Plans page.

Suggested public navigation:
- Home
- Courses
- About Us
- Teachers (public visibility of teacher profiles must be configurable
  and consent-based)
- Testimonials / Student Success Stories
- Contact / Help
- Login / Signup
Course journey:

Courses → Course Details → Batch Listings → Batch Details →
Login/Signup → Application.

Public visitors can see course/batch information and prices without
logging in.
7. Student registration and account
7.1 Registration fields
- Full name
- Class (9, 10, 11, or 12)
- Email
- Phone number
- School name
- Coaching institute name
- Password
The system generates a unique Student ID.
7.2 Identity rules
- Student ID must be unique.
- Email should be normalized and unique.
- Phone number must be validated and normalized.
- Phone number is not assumed unique; families may share a phone
  number.
- Authentication must not rely on phone number alone if duplicate
  numbers are allowed.
- Proposed login: Student ID or email plus password.
- Password hashing is mandatory.
- No OTP/SMS login in the first release.
- Students can edit permitted profile fields.
Open policy question: The owner mentioned a registration reset
"after around 15," but the unit/meaning is unclear. Do not implement
automatic account reset/deletion until clarified. Never delete student
history based on an assumed 15-day/15-month rule.
8. Application and introductory call
8.1 Application flow
1. Student selects a course.
2. Student selects a batch.
3. Student logs in or signs up.
4. System creates a batch application.
5. System automatically creates an introductory-session record.
6. Student receives an in-app confirmation.
7. Admin calls the student by phone.
8. Admin records call outcome and any follow-up.
Confirmation copy:
Thank you for registering with Mentora! Our team will contact you soon
for your introductory session.

8.2 Introductory-session rules
- The introductory session is a phone call.
- The session duration is configurable by the owner/Admin.
- The system automatically creates the session after registration.
- Admin must conduct/contact the student within seven days of
  registration.
- Admin manually records that the call was completed.
- Admin schedules/reschedules the call if the student is unavailable.
- Student can see the current status and scheduled time.
- Student receives an in-app notification when the call is
  rescheduled.
- Student does not need to select a calendar slot during registration.
Suggested statuses: PENDING, SCHEDULED, RESCHEDULE_REQUESTED,
COMPLETED, MISSED, CANCELLED.
9. Payment and enrollment
9.1 Manual payment
Payment is handled outside the platform. Admin records:
- Student
- Course and batch
- Original amount
- Discount
- Final amount
- Payment status
- Payment date
- Payment method
- Optional transaction/reference information
- Admin who recorded the payment
No payment gateway in the initial release.
9.2 Enrollment activation
After confirming payment, Admin activates the enrollment. Student access
to published resources is enabled after activation.

Applications and enrollments must be separate entities.

Suggested enrollment states:
- PENDING_PAYMENT
- ACTIVE
- EXPIRED
- CANCELLED
- REJECTED
Admin can reject or cancel enrollments. These are critical actions
requiring both Admin approvals.
9.3 Expiry
Each course has an editable exam date.

Enrollment expiry is one week after the course exam date:

access_until = exam_date + 7 days

After expiry: - Enrollment becomes expired. - Protected learning
resources are no longer accessible through the platform. - Student can
still log in. - Student account remains active. - Learning history,
lesson completion, bookmarks, attendance, payments, and past enrollments
remain. - Student can enroll in another batch.

Previously downloaded files cannot be revoked from a student's device.
10. Student Portal requirements
Before enrollment
- Profile
- Selected course and batch
- Application status
- Introductory-call status
- Rescheduling information
- Contact/help information
- Enrollment progress
After enrollment
- Active courses and batches
- Modules and chapters
- Published resources
- PDF downloads
- Images/diagrams
- External video links
- External document links
- Bookmarks
- Manual lesson completion
- Learning progress/history
- Weekly mentorship schedule
- One-to-one mentorship bookings
- Attendance/session history
- In-app notifications
- Assigned teacher names
Students can access only resources covered by their active enrollments
and resource restrictions.

Teacher phone numbers must not be displayed. Students contact teachers
through mentorship bookings.
11. Teacher Portal
Admin creates and manages teacher accounts. No teacher
self-registration.

Teacher can: - View assigned courses and batches. - View students in
assigned batches by name. - View permitted learning progress of assigned
students. - Create resources. - Edit their own resources. - Save
drafts. - Publish resources. - Request resource deletion. - View and
manage their own mentorship bookings. - Mark attendance for relevant
sessions. - View their own profile.

Teacher cannot: - Assign themselves to courses/batches. - Access
unrelated students. - Access payment details. - Unpublish resources. -
Directly delete resources without Admin approval. - Edit recurring
weekly mentorship schedules. - View student contact information unless
explicitly required and authorized.

Admin can edit teacher profiles and manage all teacher resources.
12. Learning content and resources
Hierarchy:

Course → Module → Chapter → Resource

A course contains modules; modules contain chapters; chapters contain
resources.

Resources belong to a course and may optionally be restricted to a
batch.

Initial resource types: 1. PDF notes/documents 2. Images/diagrams 3.
Assignment/practice sheets as downloadable material only 4. External
video links 5. External document links 6. Text-based lessons

No assignment submissions or grading in the first release.

Resource fields should include title, description, type, course,
optional batch restriction, module/chapter, file or external URL,
uploader, status, and timestamps.

Resource lifecycle: - Teacher creates draft. - Teacher edits draft. -
Teacher publishes. - Admin can unpublish. - Teacher requests deletion. -
Admin approves deletion.

Student features: - View published authorized resources. - Download
PDFs. - Open external links. - Bookmark resources. - Manually mark a
lesson complete.

Opening a resource must not automatically mark it completed.
13. Mentorship
Weekly mentorship and one-to-one mentorship are available to every
enrolled student, regardless of course price.
13.1 Weekly batch mentorship
- Every batch has a recurring weekly group session.
- Admin creates and manages the recurring schedule.
- Admin can change the time.
- Teachers cannot edit the recurring schedule.
- Students and assigned teachers can view upcoming sessions.
- Teachers mark attendance.
- Admin can view/manage attendance.
- Store recurring schedules separately from individual session
  occurrences.
- Retain attendance and session history.
13.2 Teacher one-to-one mentorship
- Student selects a preferred teacher.
- Only teachers assigned to the student's relevant batch should be
  selectable.
- Student requests an available session.
- Teacher approves or rejects their own booking.
- Admin can view all bookings.
- Store preferred time, confirmed time, status, reason, mentor,
  student, and attendance.
13.3 Admin one-to-one mentorship
Used for general concerns: - Batch questions - Refund-related
questions - Website problems - General course/enrollment issues

Student requests a meeting and suggests a suitable time. Admin accepts
or reschedules it.

There is no separate calendar product for Admin mentorship. Reuse the
common mentorship booking module and allow Admin to schedule/confirm.

Meeting method is not finalized. Keep call/meeting method configurable
rather than hard-coding a provider.
14. Two-Admin approval policy
Both Admins have equal permissions.

Critical decisions require approval from both distinct Admin accounts.
One Admin cannot approve twice.

Initial critical-action candidates: - Reject/cancel enrollment - Remove
a teacher - Delete a course or batch - Change course prices - Major
enrollment changes - Refund decisions - Major business-setting changes

Routine operations can be completed by one Admin: - Record payment -
Activate a paid enrollment - Edit ordinary profile details - Approve
normal mentorship bookings - Change weekly mentorship time -
Publish/unpublish resources - Approve teacher resource deletion requests

Use a reusable approval workflow: 1. Admin proposes an action. 2. System
records the proposal and data snapshot. 3. First Admin approves. 4.
Second Admin reviews and approves/rejects. 5. Execute only after both
approvals. 6. Write audit record.

Store requester, action type, payload snapshot, votes, reasons,
timestamps, execution status, and result. Prevent duplicate votes and
same-Admin double approval. Do not execute arbitrary code/SQL from
approval payloads.

The exact list of critical actions should be configurable and confirmed
with the owner.
15. Notifications
Initial release uses in-app notifications only.

Notify relevant users about: - Registration - Introductory call
scheduling/rescheduling/completion - Enrollment
activation/rejection/cancellation - New resource publication -
Mentorship booking status changes - Weekly mentorship updates -
Attendance updates - Batch transfer request status - Important
administrative updates

Notifications are permanently stored in PostgreSQL. Redis may cache
unread counts but is not the notification source of truth.
16. Admin Portal
Admin can manage: - Students - Teachers - Courses - Batches - Teacher
assignments - Applications - Introductory calls - Enrollments - Payments
and discounts - Batch transfer requests - Resources - Mentorship
schedules and bookings - Attendance - Notifications - Testimonials and
About Us content - Settings - Approval requests - Audit logs

Dashboard metrics: - Total students - Registered students -
Active/expired enrollments - Course-wise enrollments - Batch
occupancy/capacity - Introductory calls due - Pending applications -
Pending payments - Upcoming mentorship sessions - Pending approvals -
Recent administrative actions
17. Suggested data model
Core entities (final schema must be reviewed before migrations):
- users
- user_roles
- student_profiles
- teacher_profiles
- courses
- batches
- batch_teachers
- batch_applications
- intro_sessions
- enrollments
- payments
- batch_transfer_requests
- modules
- chapters
- resources
- resource_deletion_requests
- bookmarks
- lesson_completions
- weekly_mentorship_schedules
- weekly_mentorship_sessions
- mentorship_bookings
- mentorship_attendance
- notifications
- admin_approval_requests
- admin_approval_votes
- audit_logs
- activity_events
- application_settings
Use UUIDs where appropriate, foreign keys, indexes, check constraints,
unique constraints, and transactional operations.

Important relationships: - Course 1-to-many Batches. - Batch
many-to-many Teachers. - Student 1-to-many Applications. - Student
1-to-many Enrollments. - Batch 1-to-many Applications and Enrollments. -
Course 1-to-many Modules. - Module 1-to-many Chapters. - Chapter
1-to-many Resources. - Student many-to-many Resources through Bookmarks
and Lesson Completions. - Batch 1-to-many Weekly Mentorship
Schedules/Sessions. - Student and Mentor participate in Mentorship
Bookings. - Approval Request 1-to-many Approval Votes. - Users are
referenced by audit records.

Do not impose a unique constraint on (student_id, course_id) because
multiple enrollments in the same course are allowed.
18. Technology architecture
- Frontend: Next.js + React + JavaScript.
- Backend: FastAPI.
- Database: PostgreSQL.
- ORM: SQLAlchemy 2.x.
- Migrations: Alembic.
- Validation: Pydantic.
- Cache/temporary state: Redis.
- Reverse proxy: Nginx configuration for local/future unified routing.
- Containers: Docker and Docker Compose.
- CI: GitHub Actions.
- Hosting target: Render.
- Object storage: provider not finalized; select a suitable free-tier
  option only after checking current limits and persistence
  guarantees.
Start with a modular monolith: - One frontend application. - One FastAPI
backend. - One PostgreSQL database. - Redis as optional cache/temporary
store. - Private object storage through an abstraction.

Render Free local filesystems are ephemeral. Do not use them as
permanent file storage. Render Free PostgreSQL is not suitable for
permanent production records if its expiry policy applies. External
database/storage choices must be documented with free-tier limitations,
backups, and migration path.

Do not assume Nginx must be a separate always-on Render service. Render
can expose frontend and backend separately; configure the frontend API
URL, backend CORS, and HTTPS correctly. Keep Nginx configuration for
local development or a future unified deployment if useful.
19. Branding and UI
Brand identity: - Abyss Teal: approximately 80%. - Desert Sand:
approximately 20%. - Exact final hex codes to be confirmed during design
token creation. - Both light and dark themes. - Modern, energetic,
student-focused, professional, clean, responsive UI.

Public pages: - Home - About Us - Courses - Course/batch details -
Teachers (visibility configurable) - Testimonials - Student success
stories - Contact/Help - Login - Signup

About Us: - Include profiles for Harshitraj Singh Panwar and Naitik
Mujawadiya. - Both are described by the owner as NIT Bhopal
students/NITians with three years of JEE experience. - Do not invent
photos, roles, ranks, degrees, achievements, or biographies. Use
placeholders until supplied and verified. - Publish
testimonials/results/photos only with appropriate consent.
20. Security, privacy, and reliability
- Argon2id password hashing.
- Secure session/token handling.
- Backend role and object-level authorization.
- CORS allowlist.
- Rate limiting.
- Secure file validation and private downloads.
- Environment-based secrets.
- Audit logs for important Admin operations.
- Database transactions for capacity and approvals.
- PostgreSQL as permanent source of truth.
- Redis as non-authoritative cache.
- Database backup/export and restore documentation.
- Clear error states when free services sleep, pause, or become
  unavailable.
- Privacy notice and appropriate consent handling for students who may
  be minors.
21. Open decisions --- do not guess
Record these in docs/OPEN_QUESTIONS.md or the implementation plan:
1. Meaning and unit of the registration reset "after around 15." Do not
   implement automatic deletion/reset.
2. Whether email uniqueness is mandatory in every future account
   scenario; proposed default is unique email.
3. Exact login recovery flow/provider.
4. Exact weekly and one-to-one meeting medium (phone, online meeting,
   or in person).
5. Final storage provider and current free-tier suitability.
6. Exact final brand hex codes.
7. Exact critical-action list requiring both Admin approvals.
8. Exact rules for introductory-call rescheduling and no-show handling.
9. Whether public teacher profiles are displayed.
10. Whether students may request cancellation/rescheduling of mentorship
    bookings and the applicable cutoff.
11. How a batch transfer affects seat reservation and existing
    enrollment/payment records.
12. Whether a pending-payment application reserves a seat indefinitely
    or for a defined period. Do not invent an expiry.
13. Whether a student can have more than one active enrollment in the
    same batch. Default should prevent duplicate active enrollment for
    the same student/batch, but confirm before enforcing.
14. Exact policy for Admin-assisted password reset.
22. Acceptance criteria
The first release is not complete until:
- Public course/batch browsing works.
- Student can register and receive a unique Student ID.
- Student can apply to a selected batch.
- Introductory call record is created automatically.
- Admin can schedule, reschedule, and complete the call record.
- Admin can record manual payment.
- Admin can activate enrollment.
- Batch capacity cannot be exceeded under concurrent requests.
- Active enrollment grants only the correct resource access.
- Expired enrollment removes protected resource access but preserves
  history.
- Teacher permissions are limited to assigned courses/batches.
- Teacher can draft, publish, and request resource deletion.
- Admin can unpublish and approve resource deletion.
- Students can bookmark and manually complete resources.
- Weekly and one-to-one mentorship workflows work.
- Attendance is recorded.
- Critical actions cannot execute before two distinct Admin approvals.
- Audit records are created for important actions.
- Automated tests cover authorization and core business rules.
- Setup, migration, test, and deployment documentation exists.