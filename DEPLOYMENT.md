# Mentora Deployment Guide

**Phase 10: Hardening and deployment**

This document describes deployment options for Mentora.

---

## 1. Initial Hosting Target: Render

Mentora is designed to deploy on Render with separate frontend and backend
services, plus external managed PostgreSQL/Redis/object storage.

### Render Free Tier Limitations

| Service | Free Tier Limit | Production Recommendation |
|---------|----------------|---------------------------|
| PostgreSQL | 90-day expiry, limited connections | External managed PostgreSQL |
| Redis | 30-day expiry, limited memory | External managed Redis |
| Web services | 512 MB RAM, spins down after inactivity | Paid plan for production |

**Important**: Render Free local filesystems are ephemeral. Never use them for
permanent uploads. Use the storage abstraction (`app/core/storage.py`) with a
cloud provider.

---

## 2. Environment Variables

Create a `.env` file (never commit secrets):

```bash
ENVIRONMENT=production
DEBUG=false

DATABASE_URL=postgresql+asyncpg://user:password@host:5432/mentora
REDIS_URL=redis://host:6379/0
REDIS_ENABLED=true

SECRET_KEY=<generate-secure-random-key>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

CORS_ORIGINS=https://mentora.example.com,https://www.mentora.example.com
```

Generate a secure secret key:

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

---

## 3. Deployment Steps

### Option A: Docker Compose (Single Server)

```bash
# 1. Clone the repository
git clone <repo-url>
cd mentora

# 2. Configure environment
cp backend/.env.example backend/.env
# Edit backend/.env with production values

# 3. Start services
docker compose -f docker-compose.prod.yml up -d

# 4. Run database migrations
docker compose exec backend alembic upgrade head

# 5. Bootstrap Admin accounts
docker compose exec backend python -m app.bootstrap
```

### Option B: Render (Frontend + Backend Separately)

1. **Backend service**:
   - Connect GitHub repo
   - Runtime: Python 3.12
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Add environment variables from `.env`

2. **Frontend service**:
   - Connect GitHub repo
   - Runtime: Node.js 26
   - Build command: `npm install && npm run build`
   - Start command: `npm run start`
   - Set `NEXT_PUBLIC_API_URL` to the backend origin, or to its `/api/v1` base URL.

3. **External PostgreSQL**: Use Render Managed PostgreSQL or external provider.

4. **External Redis**: Use Render Managed Redis or external provider.

5. **Object Storage**: Configure storage provider in `app/core/storage.py`.

### Option C: Vercel (Frontend)

- Set the project root directory to `frontend`.
- Use the Next.js framework preset and Node.js 26.x.
- Leave the Output Directory override disabled; Vercel manages Next.js output.
- Set `NEXT_PUBLIC_API_URL` to the backend origin or its `/api/v1` base URL. The frontend adds `/api/v1` only when it is not already present.

---

## 4. Database Migrations

```bash
# Generate a new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback one migration
alembic downgrade -1
```

---

## 5. Health Checks

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Liveness probe |
| `/health/ready` | GET | Readiness probe (checks database) |
| `/api/v1/docs` | GET | OpenAPI documentation |

Configure your load balancer or platform health checks to hit `/health/ready`.

---

## 6. Security Checklist

- [ ] No secrets committed to git
- [ ] `SECRET_KEY` is random and unique
- [ ] `DEBUG=false` in production
- [ ] CORS origins restricted to known frontend domains
- [ ] HTTPS enabled (Render handles this automatically)
- [ ] Rate limiting enabled on login endpoints
- [ ] File upload validation active
- [ ] Admin accounts bootstrapped via secure command
- [ ] Object storage bucket is private
- [ ] Database backups scheduled

---

## 7. Rollback Procedure

```bash
# 1. Stop the backend
docker compose stop backend

# 2. Rollback the database migration
docker compose exec backend alembic downgrade -1

# 3. Deploy the previous image version
docker compose pull backend
docker compose up -d backend

# 4. Verify health
curl https://api.mentora.example.com/health
```

---

## 8. Degradation Behavior

| Failure | Behavior |
|---------|----------|
| Redis unavailable | Core functions continue; cache misses hit PostgreSQL |
| Object storage unavailable | Uploads rejected, existing downloads fail, metadata preserved |
| PostgreSQL unavailable | Application unavailable; clear error shown |
