#!/bin/bash
set -euo pipefail

TIMESTAMP=$(date +%Y-%m-%d_%H-%M)
BACKUP_DIR="${BACKUP_DIR:-/backups}"
BACKUP_FILE="${BACKUP_DIR}/invitationkami_${TIMESTAMP}.sql.gz"
CONTAINER="wedding_project-db-1"
RETAIN_DAYS="${RETAIN_DAYS:-7}"

mkdir -p "$BACKUP_DIR"

echo "[$(date)] Starting backup..."

# Dump and compress
docker exec "$CONTAINER" pg_dump \
  -U "${DB_USER}" \
  -d "${DB_NAME}" \
  --no-password \
  | gzip > "$BACKUP_FILE"

echo "[$(date)] Backup saved: $BACKUP_FILE"

# Backup uploads volume
UPLOADS_FILE="${BACKUP_DIR}/uploads_${TIMESTAMP}.tar.gz"
docker run --rm \
  -v wedding_project_uploads:/data:ro \
  -v "${BACKUP_DIR}":/backup \
  alpine tar czf "/backup/uploads_${TIMESTAMP}.tar.gz" /data
echo "[$(date)] Uploads backup saved: $UPLOADS_FILE"

# Rotate old backups
find "$BACKUP_DIR" -name 'invitationkami_*.sql.gz' -mtime +"$RETAIN_DAYS" -delete
find "$BACKUP_DIR" -name 'uploads_*.tar.gz' -mtime +"$RETAIN_DAYS" -delete
echo "[$(date)] Old backups rotated (keep ${RETAIN_DAYS} days)"

echo "[$(date)] Backup complete."
