#!/bin/bash
set -euo pipefail

if [ -z "${1:-}" ]; then
  echo "Usage: $0 <backup-file.sql.gz>"
  exit 1
fi

BACKUP_FILE="$1"
CONTAINER="wedding_project-db-1"

if [ ! -f "$BACKUP_FILE" ]; then
  echo "Error: File not found: $BACKUP_FILE"
  exit 1
fi

echo "[$(date)] Restoring from: $BACKUP_FILE"
echo "WARNING: This will overwrite the database. Press Ctrl+C to cancel..."
sleep 5

# Drop and recreate schema, then restore
gunzip -c "$BACKUP_FILE" | docker exec -i "$CONTAINER" psql \
  -U "${DB_USER}" \
  -d "${DB_NAME}"

echo "[$(date)] Restore complete."

# Verify
docker exec "$CONTAINER" psql \
  -U "${DB_USER}" \
  -d "${DB_NAME}" \
  -c "SELECT tablename FROM pg_tables WHERE schemaname='public';" \
  | head -30

echo "[$(date)] Table verification done."
