# Mentora Database Design

**Status:** Phase 0 — Architecture review document (pre-implementation)  
**ORM / Migrations:** SQLAlchemy 2.x + Alembic  
**Database:** PostgreSQL  
**Source of truth:** PRD §17, AGENTS.md §5, docs/ERD.md

---

## 1. Design Principles

- UUID primary keys where appropriate.
- All timestamps stored in UTC (`created_at`, `updated_at`).
- User-facing dates/times displayed in Asia/Kolkata.
- Foreign keys, check constraints, indexes, and unique constraints used deliberately.
- No cascading deletes of student accounts or historical learning records merely because enrollment expires.
- Payment, enrollment, attendance, approval, and audit history kept in PostgreSQL permanently.
- Soft deletes preferred where business history must be preserved.

---

## 2. Proposed Tables and Columns

### 2.1 Core Identity

#### `users`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | Primary key |
| email | VARCHAR(255) | NOT NULL, UNIQUE | Normalized (lowercase, trimmed) |
| password_hash | VARCHAR(255) | NOT NULL | Argon2id hash, never plain text |
| role | VARCHAR(32) | NOT NULL | Check: student, teacher, admin |
| is_active | BOOLEAN | NOT NULL DEFAULT true | |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | UTC |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | UTC |
| last_login_at | TIMESTAMPTZ | NULL | UTC |

#### `user_roles`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| user_id | UUID | NOT NULL, FK → users.id | |
| role | VARCHAR(32) | NOT NULL | Check: student, teacher, admin |
| assigned_by | UUID | NULL, FK → users.id | Admin who assigned |
| assigned_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| UNIQUE(user_id, role) | | | Prevent duplicate role assignment |

---

### 2.2 Student / Teacher Profiles

#### `student_profiles`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| user_id | UUID | NOT NULL, UNIQUE, FK → users.id | One profile per user |
| student_id | VARCHAR(32) | NOT NULL, UNIQUE | System-generated unique Student ID |
| full_name | VARCHAR(255) | NOT NULL | |
| class | VARCHAR(4) | NOT NULL | Check: 9, 10, 11, or 12 |
| email | VARCHAR(255) | NOT NULL | Denormalized for quick access; normalized |
| phone | VARCHAR(32) | NOT NULL | Validated and normalized; NOT unique |
| school_name | VARCHAR(255) | NULL | |
| coaching_institute_name | VARCHAR(255) | NULL | |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |

#### `teacher_profiles`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| user_id | UUID | NOT NULL, UNIQUE, FK → users.id | |
| full_name | VARCHAR(255) | NOT NULL | |
| phone | VARCHAR(32) | NULL | Not shown to students |
| bio | TEXT | NULL | Consent-based public visibility |
| is_public | BOOLEAN | NOT NULL DEFAULT false | Configurable public teacher profile |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |

---

### 2.3 Courses and Batches

#### `courses`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| name | VARCHAR(100) | NOT NULL | e.g., Rise, Spark, Apex |
| exam_target | VARCHAR(100) | NOT NULL | e.g., JEE Main January |
| exam_date | DATE | NULL | Editable by Admin |
| price | DECIMAL(10, 2) | NOT NULL | Initial price in INR |
| description | TEXT | NULL | |
| is_active | BOOLEAN | NOT NULL DEFAULT true | |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |

#### `batches`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| course_id | UUID | NOT NULL, FK → courses.id | Batch belongs to exactly one course |
| name | VARCHAR(100) | NOT NULL | e.g., Apex 1.0, Apex 2.0 |
| description | TEXT | NULL | |
| start_date | DATE | NOT NULL | |
| end_date | DATE | NOT NULL | |
| weekly_schedule | JSONB | NULL | Structured weekly schedule |
| max_capacity | INTEGER | NOT NULL | Check: > 0 |
| status | VARCHAR(32) | NOT NULL DEFAULT 'active' | Check: active, full, closed, archived |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| INDEX idx_batches_course_id (course_id) | | | |
| INDEX idx_batches_status (status) | | | |

#### `batch_teachers`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| batch_id | UUID | NOT NULL, FK → batches.id | |
| teacher_profile_id | UUID | NOT NULL, FK → teacher_profiles.id | |
| assigned_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| assigned_by | UUID | NOT NULL, FK → users.id | Admin who assigned |
| UNIQUE(batch_id, teacher_profile_id) | | | Prevent duplicate assignment |

---

### 2.4 Applications and Introductory Sessions

#### `batch_applications`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| student_profile_id | UUID | NOT NULL, FK → student_profiles.id | |
| course_id | UUID | NOT NULL, FK → courses.id | |
| batch_id | UUID | NOT NULL, FK → batches.id | |
| status | VARCHAR(32) | NOT NULL DEFAULT 'pending' | Check: pending, approved, rejected, cancelled |
| applied_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | UTC |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| INDEX idx_applications_student (student_profile_id) | | | |
| INDEX idx_applications_batch (batch_id) | | | |
| INDEX idx_applications_status (status) | | | |

#### `intro_sessions`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| application_id | UUID | NOT NULL, UNIQUE, FK → batch_applications.id | Exactly one per application |
| status | VARCHAR(32) | NOT NULL DEFAULT 'pending' | Check: pending, scheduled, reschedule_requested, completed, missed, cancelled |
| scheduled_at | TIMESTAMPTZ | NULL | UTC; displayed in Asia/Kolkata |
| completed_at | TIMESTAMPTZ | NULL | |
| outcome_notes | TEXT | NULL | Admin records call outcome |
| follow_up_required | BOOLEAN | NOT NULL DEFAULT false | |
| deadline_at | TIMESTAMPTZ | NOT NULL | Registration + 7 days |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |

---

### 2.5 Enrollments and Payments

#### `enrollments`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| student_profile_id | UUID | NOT NULL, FK → student_profiles.id | |
| course_id | UUID | NOT NULL, FK → courses.id | |
| batch_id | UUID | NOT NULL, FK → batches.id | |
| application_id | UUID | NULL, UNIQUE, FK → batch_applications.id | Links to originating application |
| status | VARCHAR(32) | NOT NULL DEFAULT 'pending_payment' | Check: pending_payment, active, expired, cancelled, rejected |
| access_until | DATE | NOT NULL | exam_date + 7 days; UTC |
| activated_at | TIMESTAMPTZ | NULL | When Admin activates |
| activated_by | UUID | NULL, FK → users.id | Admin who activated |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| INDEX idx_enrollments_student (student_profile_id) | | | |
| INDEX idx_enrollments_batch (batch_id) | | | |
| INDEX idx_enrollments_status (status) | | | |
| INDEX idx_enrollments_access_until (access_until) | | | For expiry service |

#### `payments`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| student_profile_id | UUID | NOT NULL, FK → student_profiles.id | |
| course_id | UUID | NOT NULL, FK → courses.id | |
| batch_id | UUID | NOT NULL, FK → batches.id | |
| enrollment_id | UUID | NULL, FK → enrollments.id | |
| original_amount | DECIMAL(10, 2) | NOT NULL | Quoted price at time of application |
| discount | DECIMAL(10, 2) | NOT NULL DEFAULT 0 | Admin-applied discount |
| final_amount | DECIMAL(10, 2) | NOT NULL | original_amount - discount |
| status | VARCHAR(32) | NOT NULL DEFAULT 'recorded' | Check: recorded, verified, failed, refunded |
| payment_date | DATE | NOT NULL | |
| payment_method | VARCHAR(64) | NULL | Manual: bank transfer, UPI, cash, cheque, etc. |
| transaction_reference | VARCHAR(255) | NULL | Optional reference info |
| recorded_by | UUID | NOT NULL, FK → users.id | Admin who recorded |
| recorded_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | UTC |
| INDEX idx_payments_student (student_profile_id) | | | |
| INDEX idx_payments_enrollment (enrollment_id) | | | |

---

### 2.6 Batch Transfer Requests

#### `batch_transfer_requests`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| student_profile_id | UUID | NOT NULL, FK → student_profiles.id | |
| original_batch_id | UUID | NOT NULL, FK → batches.id | |
| requested_batch_id | UUID | NOT NULL, FK → batches.id | |
| enrollment_id | UUID | NOT NULL, FK → enrollments.id | |
| reason | TEXT | NOT NULL | |
| status | VARCHAR(32) | NOT NULL DEFAULT 'pending' | Check: pending, approved, rejected, cancelled |
| decision_by | UUID | NULL, FK → users.id | Admin who decided |
| decision_at | TIMESTAMPTZ | NULL | |
| decision_notes | TEXT | NULL | |
| requested_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |

---

### 2.7 Learning Content Hierarchy

#### `modules`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| course_id | UUID | NOT NULL, FK → courses.id | |
| title | VARCHAR(255) | NOT NULL | |
| description | TEXT | NULL |
| sort_order | INTEGER | NOT NULL DEFAULT 0 | |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |

#### `chapters`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| module_id | UUID | NOT NULL, FK → modules.id | |
| title | VARCHAR(255) | NOT NULL | |
| description | TEXT | NULL |
| sort_order | INTEGER | NOT NULL DEFAULT 0 | |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |

#### `resources`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| course_id | UUID | NOT NULL, FK → courses.id | |
| batch_id | UUID | NULL, FK → batches.id | Optional batch restriction |
| module_id | UUID | NULL, FK → modules.id | |
| chapter_id | UUID | NULL, FK → chapters.id | |
| title | VARCHAR(255) | NOT NULL | |
| description | TEXT | NULL |
| type | VARCHAR(32) | NOT NULL | Check: pdf, image, assignment_sheet, external_video, external_document, text_lesson |
| file_url | VARCHAR(512) | NULL | Object storage key / signed URL |
| external_url | VARCHAR(512) | NULL | For external video/document links |
| uploader_id | UUID | NOT NULL, FK → users.id | Teacher who uploaded |
| status | VARCHAR(32) | NOT NULL DEFAULT 'draft' | Check: draft, published, unpublished, deleted |
| is_published | BOOLEAN | NOT NULL DEFAULT false | |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| INDEX idx_resources_course (course_id) | | | |
| INDEX idx_resources_batch (batch_id) | | | |
| INDEX idx_resources_status (status) | | | |

#### `resource_deletion_requests`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| resource_id | UUID | NOT NULL, FK → resources.id | |
| requested_by | UUID | NOT NULL, FK → users.id | Teacher |
| reason | TEXT | NULL | |
| status | VARCHAR(32) | NOT NULL DEFAULT 'pending' | Check: pending, approved, rejected |
| decided_by | UUID | NULL, FK → users.id | Admin |
| decided_at | TIMESTAMPTZ | NULL | |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |

---

### 2.8 Learning Progress

#### `bookmarks`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| student_profile_id | UUID | NOT NULL, FK → student_profiles.id | |
| resource_id | UUID | NOT NULL, FK → resources.id | |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| UNIQUE(student_profile_id, resource_id) | | | |

#### `lesson_completions`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| student_profile_id | UUID | NOT NULL, FK → student_profiles.id | |
| resource_id | UUID | NOT NULL, FK → resources.id | |
| completed_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | Manual student action only |
| UNIQUE(student_profile_id, resource_id) | | | |

---

### 2.9 Mentorship

#### `weekly_mentorship_schedules`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| batch_id | UUID | NOT NULL, FK → batches.id | |
| day_of_week | INTEGER | NOT NULL | Check: 0-6 (Monday=0) |
| start_time | TIME | NOT NULL | UTC; displayed in Asia/Kolkata |
| duration_minutes | INTEGER | NOT NULL DEFAULT 60 | |
| is_active | BOOLEAN | NOT NULL DEFAULT true | |
| created_by | UUID | NOT NULL, FK → users.id | Admin |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |

#### `weekly_mentorship_sessions`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| schedule_id | UUID | NOT NULL, FK → weekly_mentorship_schedules.id | |
| batch_id | UUID | NOT NULL, FK → batches.id | |
| session_date | DATE | NOT NULL | |
| start_time | TIMESTAMPTZ | NOT NULL | UTC |
| end_time | TIMESTAMPTZ | NOT NULL | UTC |
| status | VARCHAR(32) | NOT NULL DEFAULT 'upcoming' | Check: upcoming, completed, cancelled |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |

#### `mentorship_bookings`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| student_profile_id | UUID | NOT NULL, FK → student_profiles.id | |
| mentor_profile_id | UUID | NOT NULL, FK → teacher_profiles.id | Teacher assigned to student's batch |
| enrollment_id | UUID | NOT NULL, FK → enrollments.id | |
| preferred_time | TIMESTAMPTZ | NOT NULL | UTC |
| confirmed_time | TIMESTAMPTZ | NULL | |
| status | VARCHAR(32) | NOT NULL DEFAULT 'requested' | Check: requested, approved, rejected, cancelled, completed |
| reason | TEXT | NULL | |
| attended | BOOLEAN | NOT NULL DEFAULT false | |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |

#### `mentorship_attendance`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| weekly_session_id | UUID | NULL, FK → weekly_mentorship_sessions.id | |
| booking_id | UUID | NULL, FK → mentorship_bookings.id | |
| student_profile_id | UUID | NOT NULL, FK → student_profiles.id | |
| marked_by | UUID | NOT NULL, FK → users.id | Teacher or Admin |
| status | VARCHAR(32) | NOT NULL DEFAULT 'present' | Check: present, absent, excused |
| marked_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |

---

### 2.10 Notifications

#### `notifications`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| recipient_user_id | UUID | NOT NULL, FK → users.id | |
| actor_user_id | UUID | NULL, FK → users.id | Who triggered |
| type | VARCHAR(64) | NOT NULL | e.g., registration, intro_call_scheduled, enrollment_activated, resource_published, booking_approved |
| title | VARCHAR(255) | NOT NULL | |
| message | TEXT | NOT NULL | |
| data | JSONB | NULL | Structured payload for UI |
| is_read | BOOLEAN | NOT NULL DEFAULT false | |
| read_at | TIMESTAMPTZ | NULL | |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| INDEX idx_notifications_recipient (recipient_user_id) | | | |
| INDEX idx_notifications_unread (recipient_user_id, is_read) | | | For unread count cache |

---

### 2.11 Two-Admin Approvals and Audit

#### `admin_approval_requests`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| requester_id | UUID | NOT NULL, FK → users.id | Admin who proposed |
| action_type | VARCHAR(64) | NOT NULL | e.g., reject_enrollment, cancel_enrollment, remove_teacher, delete_course, delete_batch, change_price, refund_decision |
| payload_snapshot | JSONB | NOT NULL | Snapshot of proposed action data (no arbitrary SQL/code) |
| status | VARCHAR(32) | NOT NULL DEFAULT 'pending' | Check: pending, approved, rejected, executed |
| first_approver_id | UUID | NULL, FK → users.id | First Admin |
| second_approver_id | UUID | NULL, FK → users.id | Second Admin (distinct from first) |
| executed_at | TIMESTAMPTZ | NULL | |
| executed_by | UUID | NULL, FK → users.id | |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| CHECK(first_approver_id IS NULL OR second_approver_id IS NULL OR first_approver_id <> second_approver_id) | | | Distinct Admins |

#### `admin_approval_votes`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| approval_request_id | UUID | NOT NULL, FK → admin_approval_requests.id | |
| voter_id | UUID | NOT NULL, FK → users.id | Admin casting vote |
| vote | VARCHAR(16) | NOT NULL | Check: approve, reject |
| reason | TEXT | NULL | |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| UNIQUE(approval_request_id, voter_id) | | | Prevent duplicate votes |

#### `audit_logs`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| actor_user_id | UUID | NOT NULL, FK → users.id | |
| action | VARCHAR(128) | NOT NULL | |
| entity_type | VARCHAR(64) | NULL | |
| entity_id | UUID | NULL | |
| old_values | JSONB | NULL | |
| new_values | JSONB | NULL | |
| ip_address | VARCHAR(64) | NULL | |
| user_agent | VARCHAR(512) | NULL | |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| INDEX idx_audit_actor (actor_user_id) | | | |
| INDEX idx_audit_created (created_at) | | | |

---

### 2.12 Activity and Settings

#### `activity_events`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| id | UUID | PK | |
| user_id | UUID | NULL, FK → users.id | |
| event_type | VARCHAR(64) | NOT NULL | |
| entity_type | VARCHAR(64) | NULL | |
| entity_id | UUID | NULL | |
| data | JSONB | NULL | |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| INDEX idx_activity_created (created_at) | | | |

#### `application_settings`
| Column | Type | Nullable | Constraints / Notes |
|--------|------|----------|---------------------|
| key | VARCHAR(128) | PK | |
| value | JSONB | NOT NULL | |
| description | TEXT | NULL | |
| updated_at | TIMESTAMPTZ | NOT NULL DEFAULT now() | |
| updated_by | UUID | NULL, FK → users.id | |

---

## 3. Constraints Summary

### Primary Keys
- All tables use UUID primary keys (`id`).
- `application_settings` uses natural key `key`.

### Foreign Keys
- All `*_id` reference columns that point to another table are declared as `FOREIGN KEY` with `ON DELETE CASCADE` only where safe (e.g., join tables); otherwise `ON DELETE RESTRICT` to preserve history.

### Unique Constraints
- `users.email` — unique, normalized.
- `student_profiles.student_id` — unique.
- `student_profiles.user_id` — unique.
- `teacher_profiles.user_id` — unique.
- `user_roles(user_id, role)` — unique.
- `batch_teachers(batch_id, teacher_profile_id)` — unique.
- `intro_sessions.application_id` — unique (one intro session per application).
- `bookmarks(student_profile_id, resource_id)` — unique.
- `lesson_completions(student_profile_id, resource_id)` — unique.
- `admin_approval_votes(approval_request_id, voter_id)` — unique.

### Check Constraints
- `users.role` IN (student, teacher, admin).
- `student_profiles.class` IN (9, 10, 11, 12).
- `batches.status` IN (active, full, closed, archived).
- `batches.max_capacity > 0`.
- `batch_applications.status` IN (pending, approved, rejected, cancelled).
- `intro_sessions.status` IN (pending, scheduled, reschedule_requested, completed, missed, cancelled).
- `enrollments.status` IN (pending_payment, active, expired, cancelled, rejected).
- `payments.status` IN (recorded, verified, failed, refunded).
- `resources.type` IN (pdf, image, assignment_sheet, external_video, external_document, text_lesson).
- `resources.status` IN (draft, published, unpublished, deleted).
- `weekly_mentorship_schedules.day_of_week` BETWEEN 0 AND 6.
- `mentorship_bookings.status` IN (requested, approved, rejected, cancelled, completed).
- `mentorship_attendance.status` IN (present, absent, excused).
- `admin_approval_votes.vote` IN (approve, reject).
- `admin_approval_requests.status` IN (pending, approved, rejected, executed).
- `batch_transfer_requests.status` IN (pending, approved, rejected, cancelled).
- `first_approver_id <> second_approver_id` when both set.

### Indexes
- Foreign key columns are indexed by default for join performance.
- Additional indexes on frequently queried columns: status fields, dates (access_until, created_at, scheduled_at), recipient_user_id + is_read for notifications.

---

## 4. Lifecycle / Status Fields

| Entity | Statuses | Terminal States | Auto-transition |
|--------|----------|-----------------|-----------------|
| `batch_applications` | pending → approved/rejected/cancelled | approved, rejected, cancelled | None (Admin decision) |
| `intro_sessions` | pending → scheduled → reschedule_requested → completed/missed/cancelled | completed, missed, cancelled | None (Admin action) |
| `enrollments` | pending_payment → active → expired/cancelled/rejected | expired, cancelled, rejected | Expiry service: active → expired at access_until |
| `resources` | draft → published → unpublished/deleted | unpublished, deleted | Admin unpublish |
| `mentorship_bookings` | requested → approved/rejected → completed/cancelled | approved, rejected, completed, cancelled | Teacher/Admin decision |
| `admin_approval_requests` | pending → approved → executed / rejected | executed, rejected | Two Admin votes |

---

## 5. Migration Strategy

- **Alembic** manages schema migrations under `backend/migrations/`.
- Initial migration (`0001_initial.py`) creates all tables above.
- Seed data migration adds the three initial courses: Rise (JEE Main Jan, ₹299), Spark (JEE Main Apr, ₹499), Apex (JEE Advanced, ₹699).
- Two initial Admin accounts bootstrapped via secure one-time command (never hard-coded default password).
- Each subsequent migration is versioned, reviewed, and tested before applying.
- Downgrade paths are documented for each migration where safe.
- Production migrations run via CI/CD with backup verification.

---

## 6. Data Retention Rules

- Student accounts and learning history are **never deleted** merely because enrollment expires.
- Payment, enrollment, attendance, approval, and audit records are permanent.
- Resource deletion requests create an audit trail; soft delete preferred.
- Previously downloaded files cannot be revoked from student devices (PRD §9.3).