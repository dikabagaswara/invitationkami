# PANDUAN LENGKAP DEPLOY INVITATIONKAMI KE SERVER (VPS / CLOUD)

Dokumen ini berisi panduan *step-by-step* untuk mengunggah dan menjalankan aplikasi **InvitationKami** di server (Ubuntu / Debian VPS seperti DigitalOcean, Linode, AWS EC2, Contabo, Biznet, DomaiNesia, dll).

---

## 🛠️ PILIHAN METODE DEPLOY

Tersedia 2 metode deploy yang bisa Anda pilih:
1. **Metode A (Rekomendasi - Docker & Docker Compose)**: Paling mudah, terisolasi, otomatis mengurus database PostgreSQL, Nginx reverse proxy, dan Next.js.
2. **Metode B (Node.js + PM2 + Nginx System)**: Deploy langsung di OS server tanpa Docker.

---

# 🚀 METODE A: DEPLOY DENGAN DOCKER (SANGAT DIREKOMENDASIKAN)

### Langkah 1: Persiapan Server VPS
Login ke server VPS via SSH melalui terminal atau PuTTY:
```bash
ssh root@IP_SERVER_ANDA
```

Update package dan install Docker serta Git:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl ufw

# Install Docker & Docker Compose Plugin
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

---

### Langkah 2: Clone Repository dari GitHub
```bash
cd /var/www
git clone https://github.com/dikabagaswara/invitationkami.git
cd invitationkami
```

---

### Langkah 3: Konfigurasi File Environment (`.env`)
Salin template env dan sesuaikan:
```bash
cp .env.example .env
nano .env
```

Isi konfigurasi `.env` untuk production:
```env
# URL Domain Website Anda
APP_NAME=InvitationKami
APP_TAGLINE="Undangan Digital Modern"
APP_URL=https://domainanda.com
APP_LOGO=/images/logo.png
APP_FAVICON=/favicon.ico

# Database PostgreSQL Internal Docker
DB_USER=invitationkami_user
DB_PASSWORD=GantiDenganPasswordDatabaseYangSangatKuat123!
DB_NAME=invitationkami_db
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@db:5432/${DB_NAME}

# NextAuth Secret (Generate kode unik acak: openssl rand -base64 32)
AUTH_SECRET=ganti_dengan_kode_acak_panjang_minimal_32_karakter
AUTH_URL=https://domainanda.com

# Storage Uploads
STORAGE_ADAPTER=local
UPLOAD_DIR=./public/uploads
UPLOAD_MAX_SIZE_BYTES=5242880
```
*Simpan file dengan menekan `CTRL + O`, `Enter`, lalu keluar dengan `CTRL + X`.*

---

### Langkah 4: Build & Jalankan Container
Jalankan Docker Compose:
```bash
docker compose up -d --build
```

---

### Langkah 5: Migrasi Database & Seeding Data Awal
Setelah container running, jalankan migrasi Prisma dan seed tema/musik:
```bash
# Jalankan migrasi schema database
docker compose exec app npx prisma db push

# Jalankan seeding tema, musik, dan akun demo
docker compose exec app npx prisma db seed

# Buat contoh undangan luxury Dika & Nurdi (customer@gmail.com)
docker compose exec app npx tsx scripts/create-luxury-invitation.ts
```

---

### Langkah 6: Pasang SSL / HTTPS Gratis (Certbot Let's Encrypt)
Arahkan domain DNS (A Record) ke IP Server Anda, lalu install SSL:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d domainanda.com -d www.domainanda.com
```

Website Anda kini sudah aktif dan berjalan secara live di `https://domainanda.com`! 🎉

---

# 📦 CARA UPDATE JIKA ADA PERUBAHAN BARU DI GITHUB

Setiap kali Anda selesai push update di komputer lokal dan ingin mengupdate server:

```bash
cd /var/www/invitationkami
git pull origin main
docker compose up -d --build
```
*Aplikasi akan otomatis ter-update tanpa downtime.*

---

# 💾 CARA BACKUP DATABASE SERVER

1. **Backup Database:**
   ```bash
   docker compose exec db pg_dump -U invitationkami_user invitationkami_db | gzip > backup_$(date +%Y%m%d_%H%M).sql.gz
   ```
2. **Restore Database:**
   ```bash
   gunzip < backup_file.sql.gz | docker compose exec -T db psql -U invitationkami_user -d invitationkami_db
   ```
