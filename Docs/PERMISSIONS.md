# Mentora Role and Permission Matrix

**Status:** Phase 0 — Architecture review document (pre-implementation)  
**Source of truth:** PRD §4 (Users and roles), PRD §14 (Two-Admin approval policy), AGENTS.md §6 (Security and privacy rules), AGENTS.md §7 (Critical business rules)

---

## 1. Roles

| Role | How created | Count | Permissions summary |
|------|-------------|-------|---------------------|
| **Public visitor** | None (unauthenticated) | Unlimited | Browse courses, batches, public pages. Cannot apply without logging in. |
| **Student** | Self-registration via `/auth/register` | Unlimited | Manage profile, apply to batches, view enrollments, access resources for active enrollments, bookmark, manually mark complete, mentorship features. |
| **Teacher** | Created by Admin only | Managed by Admin | Access assigned courses/batches only, view students in assigned batches (name + progress), create/edit/publish resources, request deletion, manage own mentorship bookings, mark attendance where permitted. |
| **Admin** | Two initial bootstrapped via secure one-time command | Exactly 2 (initial) | Full platform management. Critical decisions require both distinct Admin approvals. |

---

## 2. Permission Matrix by Domain

### 2.1 Public Website

| Action | Public | Student | Teacher | Admin |
|--------|--------|---------|---------|-------|
| Browse courses & batches | ✅ | ✅ | ✅ | ✅ |
| View course details & prices | ✅ | ✅ | ✅ | ✅ |
| View public teacher profiles (if consent-based & enabled) | ✅ | ✅ | ✅ | ✅ |
| View About Us / Testimonials / Contact | ✅ | ✅ | ✅ | ✅ |
| Login / Signup | ✅ | ✅ (already logged in) | ✅ (already logged in) | ✅ (already logged in) |
| Submit batch application | ❌ (must authenticate) | ✅ | ❌ | ❌ |

---

### 2.2 Identity and Profile

| Action | Public | Student | Teacher | Admin |
|--------|--------|---------|---------|-------|
| Register (student) | ✅ | ❌ (already registered) | ❌ | ❌ |
| Login / Logout | ✅ | ✅ | ✅ | ✅ |
| View own profile | ❌ | ✅ | ✅ | ✅ |
| Edit own permitted profile fields | ❌ | ✅ | ✅ (limited fields) | ✅ |
| View any user's profile | ❌ | ❌ | ❌ | ✅ |
| Edit any user's profile | ❌ | ❌ | ❌ | ✅ |
| Create teacher account | ❌ | ❌ | ❌ | ✅ (Admin only; no self-registration) |
| Bootstrap initial Admin accounts | ❌ | ❌ | ❌ | ✅ (secure one-time command; no hard-coded default password) |
| Admin-assisted password reset | ❌ | ❌ | ❌ | ✅ (policy TBD — open question #14) |

---

### 2.3 Courses and Batches

| Action | Public | Student | Teacher | Admin |
|--------|--------|---------|---------|-------|
| Create course | ❌ | ❌ | ❌ | ✅ |
| Edit course (name, exam_target, exam_date, price) | ❌ | ❌ | ❌ | ✅ |
| Delete course | ❌ | ❌ | ❌ | ⚠️ Critical — two-Admin approval |
| View batches (public) | ✅ | ✅ | ✅ | ✅ |
| Create batch | ❌ | ❌ | ❌ | ✅ |
| Edit batch (dates, schedule, capacity, status) | ❌ | ❌ | ❌ | ✅ |
| Delete batch | ❌ | ❌ | ❌ | ⚠️ Critical — two-Admin approval |
| Assign teacher to batch | ❌ | ❌ | ❌ | ✅ |
| Remove teacher from batch | ❌ | ❌ | ❌ | ⚠️ Critical — two-Admin approval |
| Teacher assigns self to batch | ❌ | ❌ | ❌ (cannot self-assign) | ✅ |

---

### 2.4 Applications and Introductory Calls

| Action | Public | Student | Teacher | Admin |
|--------|--------|---------|---------|-------|
| Apply to a batch | ❌ | ✅ | ❌ | ❌ |
| View my applications | ❌ | ✅ (own only) | ❌ | ✅ (all) |
| View application detail | ❌ | ✅ (own only) | ❌ | ✅ (all) |
| Approve/reject application | ❌ | ❌ | ❌ | ✅ (reject is critical — two-Admin approval) |
| Auto-create intro-session record | ❌ | System | System | System |
| View intro-session status | ❌ | ✅ (own) | ❌ | ✅ (all) |
| Schedule/reschedule intro call | ❌ | ❌ | ❌ | ✅ |
| Record call outcome / follow-up | ❌ | ❌ | ❌ | ✅ |
| 7-day follow-up deadline tracking | ❌ | ❌ | ❌ | ✅ (system + Admin) |

---

### 2.5 Payments and Enrollments

| Action | Public | Student | Teacher | Admin |
|--------|--------|---------|---------|-------|
| Record manual payment | ❌ | ❌ | ❌ | ✅ (routine — one Admin) |
| View my payments | ❌ | ✅ (own) | ❌ | ✅ (all) |
| Activate enrollment | ❌ | ❌ | ❌ | ✅ (routine — one Admin, after payment verification) |
| Reject enrollment | ❌ | ❌ | ❌ | ⚠️ Critical — two-Admin approval |
| Cancel enrollment | ❌ | ❌ | ❌ | ⚠️ Critical — two-Admin approval |
| View all enrollments | ❌ | ❌ | ❌ | ✅ |
| Enrollment expiry (exam_date + 7 days) | ❌ | System | System | System (oversight) |

---

### 2.6 Learning Resources

| Action | Public | Student | Teacher | Admin |
|--------|--------|---------|---------|-------|
| View published resources (my active enrollments) | ❌ | ✅ | ✅ (assigned only) | ✅ |
| View batch-restricted resource (not my batch) | ❌ | ❌ | ❌ | ✅ |
| Download PDF / open external link | ❌ | ✅ (authorized only) | ✅ (assigned only) | ✅ |
| Signed download URL (backend-authorized) | ❌ | ✅ | ✅ | ✅ |
| Create draft resource | ❌ | ❌ | ✅ (assigned courses/batches) | ✅ |
| Edit own draft resource | ❌ | ❌ | ✅ (own only) | ✅ |
| Publish resource | ❌ | ❌ | ✅ (own draft) | ✅ |
| Unpublish resource | ❌ | ❌ | ❌ (cannot unpublish) | ✅ (routine — one Admin) |
| Request resource deletion | ❌ | ❌ | ✅ (own resource) | ✅ |
| Approve resource deletion | ❌ | ❌ | ❌ | ⚠️ Critical — two-Admin approval (removal of teacher content) |
| Directly delete resource without Admin approval | ❌ | ❌ | ❌ | ❌ |
| View student contact details | ❌ | ❌ | ❌ (unless explicitly authorized) | ✅ |

---

### 2.7 Learning Progress

| Action | Public | Student | Teacher | Admin |
|--------|--------|---------|---------|-------|
| Bookmark a resource | ❌ | ✅ (own) | ❌ | ✅ |
| Remove bookmark | ❌ | ✅ (own) | ❌ | ✅ |
| Manually mark lesson complete | ❌ | ✅ (own; opening ≠ completion) | ❌ | ✅ |
| Unmark lesson complete | ❌ | ✅ (own, if allowed) | ❌ | ✅ |
| View student progress (assigned batches) | ❌ | ❌ | ✅ (name + progress only) | ✅ |

---

### 2.8 Mentorship

| Action | Public | Student | Teacher | Admin |
|--------|--------|---------|---------|-------|
| View weekly batch sessions (my batch) | ❌ | ✅ | ✅ (assigned) | ✅ |
| Create weekly mentorship schedule | ❌ | ❌ | ❌ (cannot edit recurring schedule) | ✅ (routine — one Admin) |
| Change weekly mentorship time | ❌ | ❌ | ❌ | ✅ (routine — one Admin) |
| Request one-to-one booking (assigned teacher) | ❌ | ✅ | ❌ | ✅ (Admin one-to-one for general concerns) |
| Approve/reject my own booking | ❌ | ❌ | ✅ (own bookings only) | ❌ |
| View all bookings | ❌ | ❌ | ❌ | ✅ |
| Approve/reschedule Admin one-to-one booking | ❌ | ❌ | ❌ | ✅ |
| Mark attendance (weekly session) | ❌ | ❌ | ✅ (my batch) | ✅ |
| Mark attendance (one-to-one) | ❌ | ❌ | ✅ (my booking) | ✅ |
| View attendance records | ❌ | ❌ | ✅ (my batch) | ✅ |
| Cancel mentorship booking | ❌ | ⚠️ (cutoff TBD — open question #10) | ⚠️ (cutoff TBD) | ✅ |

---

### 2.9 Batch Transfer

| Action | Public | Student | Teacher | Admin |
|--------|--------|---------|---------|-------|
| Request batch transfer | ❌ | ✅ (own) | ❌ | ❌ |
| View transfer requests | ❌ | ❌ | ❌ | ✅ |
| Approve/reject transfer | ❌ | ❌ | ❌ | ✅ (manual; record reason, batches, decision, Admin, timestamps) |
| Auto-transfer student | ❌ | ❌ | ❌ | ❌ (never automatic) |

---

### 2.10 Notifications

| Action | Public | Student | Teacher | Admin |
|--------|--------|---------|---------|-------|
| View my notifications | ❌ | ✅ (own) | ✅ (own) | ✅ (own) |
| Mark notification read | ❌ | ✅ (own) | ✅ (own) | ✅ (own) |
| Send system notifications | ❌ | ❌ | ❌ | ✅ |

---

### 2.11 Two-Admin Approvals and Audit

| Action | Public | Student | Teacher | Admin |
|--------|--------|---------|---------|-------|
| Propose critical action | ❌ | ❌ | ❌ | ✅ (one Admin proposes) |
| Cast approval vote | ❌ | ❌ | ❌ | ✅ (distinct Admin only; no duplicates; no self double-approval) |
| Execute critical action | ❌ | ❌ | ❌ | ✅ (only after two distinct approvals) |
| View pending approvals | ❌ | ❌ | ❌ | ✅ |
| View audit logs | ❌ | ❌ | ❌ | ✅ |

---

## 3. Object-Level Access Rules

| Rule | Enforcement |
|------|-------------|
| A student must not access another student's records. | Backend checks `student_profile_id` matches current user on every student-scoped endpoint. |
| A teacher must only access students, batches, and resources assigned to them. | Backend checks `batch_teachers` membership and resource course/batch assignment. |
| Teachers must not access payment records or unnecessary student contact details. | Payment endpoints are Admin-only; student phone/email excluded from teacher-facing student lists. |
| Students must not see teacher phone numbers. | Teacher profile `phone` field excluded from student responses. |
| Admin-only operations must be protected server-side, not just hidden in UI. | Every Admin endpoint checks `role == admin`; critical actions additionally check two-Admin approval state. |
| Resource access requires active enrollment and respects course/batch restrictions. | Backend joins enrollments → resources with status check and batch restriction check. |
| Opening a resource must not automatically mark it complete. | Completion requires explicit POST to `/student/lesson-completions`. |
| No duplicate active enrollment for same student/batch (default). | Unique constraint / application-level check pending confirmation (open question #13). |

---

## 4. Critical-Action Approval Policy

### 4.1 Critical Actions (require both distinct Admin approvals)

| Action | Reason |
|--------|--------|
| Reject/cancel enrollment | Affects student access and finances |
| Remove a teacher | Affects batch staffing and student experience |
| Delete a course or batch | Affects all enrollments and resources |
| Change course prices | Affects quoted prices and revenue |
| Major enrollment changes | Affects student access |
| Refund decisions | Affects finances |
| Approve teacher resource deletion | Removes teacher content |
| Major business-setting changes | Platform-wide impact |

### 4.2 Routine Actions (one Admin sufficient)

| Action | Reason |
|--------|--------|
| Record payment | Operational |
| Activate a paid enrollment | Operational (after payment verification) |
| Edit ordinary profile details | Operational |
| Approve normal mentorship bookings | Operational |
| Change weekly mentorship time | Operational |
| Publish/unpublish resources | Operational |
| Approve teacher resource deletion requests | Note: deletion approval itself is critical; the deletion *request* workflow is routine |

### 4.3 Approval Workflow

1. Admin A proposes an action → system records proposal + payload snapshot.
2. First Admin approves → vote recorded.
3. Second Admin (distinct from first) reviews and approves/rejects → vote recorded.
4. Execute only after both approvals.
5. Write audit record: requester, action type, payload snapshot, both votes, timestamps, reasons, execution outcome.

### 4.4 Approval Safety Rules

- Prevent duplicate votes: `UNIQUE(approval_request_id, voter_id)`.
- Prevent self-approval twice: `CHECK(first_approver_id <> second_approver_id)`.
- Never execute arbitrary code or arbitrary SQL from an approval payload.
- If critical-action classification is uncertain, ask the product owner before implementation.
- The exact critical-action list should be configurable and confirmed with the owner (stored in `application_settings`).

---

## 5. Denied Actions (Explicitly Prohibited in v1)

| Action | Who might attempt | Why denied |
|--------|-------------------|------------|
| Online payment gateway / checkout | Student | PRD non-goal; payment is manual |
| OTP/SMS login | Student | PRD non-goal; no phone uniqueness |
| Assignment submission / grading | Student / Teacher | PRD non-goal |
| Live classroom streaming | Anyone | PRD non-goal |
| AI tutor / chatbot / AI-generated content | Anyone | PRD non-goal |
| Teacher self-registration | Teacher | Admin creates teachers only |
| Teacher unpublish resources | Teacher | Admin-only |
| Teacher direct delete without Admin approval | Teacher | Deletion request + approval workflow |
| Student access another student's records | Student | Object-level authorization |
| Automatic account reset/deletion after "15" | System | Open question #1 — not implemented until clarified |
| Automatic batch transfer | System | Student must request; Admin handles manually |