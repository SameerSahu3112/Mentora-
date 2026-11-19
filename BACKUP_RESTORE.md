# Mentora Database Backup and Restore Guide

**Phase 10: Hardening and deployment**

This document describes the backup and restore procedures for the Mentora
PostgreSQL database. PostgreSQL is the permanent source of truth for all
records — Redis is cache-only and object storage holds replaceable files.

---

## 1. Backup Strategy

### Full Database Backup

```bash
# Using docker-compose
docker compose exec db pg_dump -U mentora -d mentora > backup_$(date +%F).sql

# Using pg_dump directly (external managed PostgreSQL)
pg_dump -h <host> -U mentora -d mentora > backup_$(date +%F).sql
```

### Schema-Only Backup

```bash
docker compose exec db pg_dump -U mentora -d mentora --schema-only > schema_backup_$(date +%F).sql
```

### Automated Backups

Set up a cron job or use your cloud provider's automated backup feature:

```bash
# Example cron entry (daily at 2 AM UTC)
0 2 * * * /usr/bin/docker compose -f /path/to/docker-compose.yml exec -T db pg_dump -U mentora -d mentora | gzip > /backups/mentora_$(date +\%F).sql.gz
```

---

## 2. Restore Procedure

### From a Full Backup

```bash
# 1. Stop the backend to prevent writes during restore
docker compose stop backend

# 2. Restore the database
cat backup_2026-11-20.sql | docker compose exec -T db psql -U mentora -d mentora

# 3. Restart the backend
docker compose start backend
```

### From Schema-Only Backup

```bash
docker compose exec -T db psql -U mentora -d mentora -f schema_backup_2026-11-20.sql
```

---

## 3. Point-in-Time Recovery (Production)

For production deployments on managed PostgreSQL (e.g., Render, AWS RDS):

1. Enable continuous archiving / point-in-time recovery in your provider console.
2. Take regular base backups (daily).
3. Retain WAL archives for at least 7 days.
4. To restore to a specific point in time, use your provider's restore UI or CLI.

---

## 4. Redis Backup

Redis is cache-only — not the source of truth. Data loss is acceptable.

If you want to persist Redis cache:

```bash
docker compose exec db redis-cli BGSAVE
docker compose cp db:/data/dump.rdb ./redis_backup.rdb
```

---

## 5. Object Storage Backup

Resource files are stored in private object storage (see `app/core/storage.py`).

- **Development**: Local filesystem under `./storage/`
- **Production**: Cloud provider bucket (configured via storage abstraction)

Back up object storage using your cloud provider's backup/versioning feature.
Files can be re-uploaded if lost, but metadata is in PostgreSQL.

---

## 6. What to Back Up (Priority Order)

| Priority | Item | Method | Frequency |
|----------|------|--------|-----------|
| 1 | PostgreSQL database | `pg_dump` | Daily |
| 2 | Object storage bucket | Cloud backup | Daily |
| 3 | Redis cache | RDB snapshot | Weekly (optional) |
| 4 | Application code | Git repository | Every commit |
| 5 | Environment variables | Secure secret store | On change |

---

## 7. What NOT to Back Up

- Secrets / `.env` files (use a secret manager)
- Build artifacts (`node_modules`, `__pycache__`)
- Temporary files

---

## 8. Testing the Restore

Test restores quarterly:

1. Restore backup to a staging database.
2. Run `alembic upgrade head` to verify migrations.
3. Run the backend test suite (`pytest`).
4. Verify a sample of student records, enrollments, and payments.
5. Document any issues and update this guide.

---

## 9. Retention Policy

- Daily backups: 30 days
- Weekly backups: 8 weeks
- Monthly backups: 12 months
- Test restore verification: Quarterly
