# Mentora Open Questions and Technical Risks

**Status:** Phase 0 — Architecture review document (pre-implementation)  
**Source of truth:** PRD §21 (Open decisions), PRD §9 (Open questions), AGENTS.md, docs/IMPLEMENTATION_PLAN.md §9

---

## 1. Unresolved PRD Decisions

| # | Question | Proposed Default | Risk if Unresolved | Blocks Phase |
|---|----------|------------------|-------------------|--------------|
| 1 | Meaning and unit of registration reset "after around 15." | **Do not implement** any automatic reset/deletion. | None if not implemented. | None |
| 2 | Is email uniqueness mandatory in every future account scenario? | Default: unique email (normalized). | Future account scenarios may need shared emails. | Phase 2 (Identity) |
| 3 | Exact account recovery flow and whether email provider will be configured. | Admin-assisted reset baseline; no email provider in v1. | Students may be locked out without recovery. | Phase 2 (Identity) |
| 4 | Exact weekly and one-to-one meeting medium (phone, online meeting, or in person). | Keep meeting method configurable; no hard-coded provider. | UX may need rework if medium changes. | Phase 7 (Mentorship) |
| 5 | Final storage provider and current free-tier suitability. | Storage abstraction layer; local filesystem for dev only. | Provider migration later could be costly. | Phase 6 (Resources) |
| 6 | Exact final brand hex codes (Abyss Teal ~80%, Desert Sand ~20%). | Use placeholders in design tokens; not immutable. | Minor rework during design token creation. | Phase 9 (UI) |
| 7 | Exact critical-action list requiring both Admin approvals. | PRD §14 initial candidates list; stored in `application_settings` as configurable. | Wrong list could over- or under-restrict Admin actions. | Phase 8 (Approvals) |
| 8 | Exact rules for introductory-call rescheduling and no-show handling. | Statuses: PENDING, SCHEDULED, RESCHEDULE_REQUESTED, COMPLETED, MISSED, CANCELLED; Admin manages. | Ambiguity in student communication and deadline enforcement. | Phase 4 (Applications/Intro calls) |
| 9 | Are public teacher profiles displayed? | Configurable; default off until consent obtained. | Privacy/consent risk if shown without consent. | Phase 9 (Public content) |
| 10 | May students cancel/reschedule mentorship bookings and applicable cutoff? | Default: no student cancellation in v1; Teacher/Admin manage. | Students may be stuck with unwanted bookings. | Phase 7 (Mentorship) |
| 11 | How does a batch transfer affect seat reservation and existing enrollment/payment records? | Release seat from original batch; reserve in requested batch on approval. | Capacity and payment reconciliation issues. | Phase 5 (Payments/Enrollment) |
| 12 | Do pending-payment applications reserve a seat indefinitely or for a defined period? | **Do not invent** an expiry; reserve until decision (reject/cancel releases). | Potential seat hoarding if applications pend indefinitely. | Phase 3 (Capacity) |
| 13 | Can a student have more than one active enrollment in the same batch? | Default: prevent duplicate active enrollment (unique check) — **confirm before enforcing**. | Duplicate enrollments could distort capacity and billing. | Phase 5 (Payments/Enrollment) |
| 14 | Exact policy for Admin-assisted password reset. | Admin-triggered reset token, secure, time-limited, logged in audit. | Security risk if policy is weak. | Phase 2 (Identity) |

---

## 2. Technical Risks

| Risk | Description | Likelihood | Impact | Mitigation |
|------|-------------|------------|--------|------------|
| **Render Free tier limitations** | Render Free PostgreSQL may have expiry policy; local filesystem is ephemeral. | Medium | High | Document free-tier limits; consider external managed PostgreSQL/Redis/object storage; backup/restore guide. |
| **Batch seat overbooking under concurrency** | Two users compete for last seat; only one reservation should succeed. | Medium | High | PostgreSQL transactions + row-level locking (`SELECT ... FOR UPDATE`); capacity calculation service tested with concurrent scenarios. |
| **Object storage provider not finalized** | Permanent uploads cannot rely on Render Free local filesystem. | High | Medium | Storage abstraction interface; local dev filesystem; swap provider later without changing business logic. |
| **Two-Admin approval bypass** | Critical action executes without both distinct Admin approvals. | Low | High | Server-side enforcement in approval service; DB constraint on distinct approvers; no frontend-only bypass. |
| **Phone number non-uniqueness** | Families may share phone numbers; login must not rely on phone alone. | Medium | Medium | Login via Student ID or email + password; phone is not unique; document shared-phone behavior. |
| **Redis unavailability** | Redis is cache-only, not source of truth. | Medium | Low | Core functions degrade gracefully; cache misses hit PostgreSQL; unread counts may be stale. |
| **Student data deletion after expiry** | Accidental deletion of student accounts or learning records. | Low | High | No cascading deletes; soft deletes; history preserved; audit logs. |
| **OpenAPI drift** | API docs become out of sync with implementation. | Medium | Low | FastAPI auto-generates OpenAPI; regenerate on each change; review in CI. |
| **CORS misconfiguration** | Frontend cannot reach backend or origins are too permissive. | Medium | Medium | CORS allowlist restricted to known frontend origins; configure for local + Render. |
| **File upload security** | Malicious files uploaded as resources. | Medium | Medium | Validate file type, size, content; never trust browser MIME/filename; private bucket + signed URLs. |
| **Minor student privacy** | Students may be minors; photos/names/testimonials without consent. | Low | High | Consent controls; placeholders until verified; privacy notices. |

---

## 3. Questions That Block Phase 1 (Foundation)

None — all Phase 1 decisions are settled by AGENTS.md and PRD.

---

## 4. Questions That Block Later Phases (Documented Here)

- **Phase 2:** Questions #2, #3, #14 (email uniqueness, recovery flow, password reset policy).
- **Phase 3:** Question #12 (pending-payment seat reservation period).
- **Phase 4:** Question #8 (intro-call rescheduling/no-show rules).
- **Phase 5:** Questions #11, #13 (batch transfer seat/payment treatment; duplicate active enrollment).
- **Phase 6:** Question #5 (storage provider).
- **Phase 7:** Questions #4, #10 (meeting medium; booking cancellation cutoff).
- **Phase 8:** Question #7 (critical-action list).
- **Phase 9:** Questions #6, #9 (brand hex codes; public teacher profiles).

---

## 5. Safe, Reversible Defaults

Where a decision is unresolved but a phase cannot wait, use the safe default and mark it clearly as configurable:

- Email: unique, normalized (reversible: remove unique constraint later).
- Critical actions: PRD §14 candidate list (reversible: update `application_settings`).
- Pending-payment seat reservation: indefinite until decision (reversible: add expiry later).
- Duplicate active enrollment in same batch: prevented by default (reversible: remove constraint).
- Public teacher profiles: off by default (reversible: enable with consent).
- Student mentorship cancellation: not allowed in v1 (reversible: add later).
- Meeting method: configurable string field (reversible: update value).

---

## 6. How to Resolve

Each open question should be reviewed with the product owner before the dependent phase begins. Record the decision in `application_settings` or this document, and update `docs/IMPLEMENTATION_PLAN.md` to mark the question as resolved.