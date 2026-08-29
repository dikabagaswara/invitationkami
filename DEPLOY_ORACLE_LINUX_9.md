# PANDUAN DEPLOY INVITATIONKAMI DI ORACLE LINUX 9 (RHEL / Enterprise Linux)

Panduan khusus dan teruji untuk melakukan deployment **InvitationKami** pada **Oracle Linux 9 (9.x / 9.7)** (cocok untuk Oracle Cloud Infrastructure / OCI Free Tier maupun Dedicated VPS).

---

## ⚠️ PERHATIAN PENTING PADA ORACLE LINUX 9
Oracle Linux 9 memiliki proteksi bawaan:
1. **Firewall (`firewalld`)** aktif secara default (perlu membuka port 80 & 443).
2. **SELinux** aktif secara default (perlu izin akses container).
3. Menggunakan package manager **`dnf`** (bukan `apt`).

---

## 🚀 LANGKAH 1: Persiapan Server & Update Package
Login ke server via SSH:
```bash
ssh opc@IP_SERVER_ANDA
# atau jika menggunakan user root:
ssh root@IP_SERVER_ANDA
```

Update sistem ke versi terbaru:
```bash
sudo dnf update -y
sudo dnf install -y git curl wget tar nano
```

---

## 🐳 LANGKAH 2: Install Docker & Docker Compose di Oracle Linux 9

Jalankan perintah berikut untuk menginstall Docker Engine resmi RHEL/CentOS/Oracle Linux:

```bash
# 1. Hapus podman jika ada (agar tidak bentrok dengan docker)
sudo dnf remove -y podman buildah

# 2. Tambahkan repository resmi Docker
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 3. Install Docker CE, CLI, containerd, dan Docker Compose Plugin
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 4. Aktifkan & jalankan service Docker otomatis saat boot
sudo systemctl enable --now docker

# 5. Berikan izin user ke grup docker (ganti opc jika user Anda berbeda)
sudo usermod -aG docker $USER
```

*Verifikasi instalasi:*
```bash
docker --version
docker compose version
```

---

## 🛡️ LANGKAH 3: Buka Port Firewall (firewalld & iptables)
Oracle Linux 9 memblokir port HTTP (80) & HTTPS (443) secara default. Buka port tersebut:

```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --reload
```

> **CATATAN KHUSUS ORACLE CLOUD (OCI):**
> Jika Anda menggunakan **Oracle Cloud Infrastructure (OCI)**, pastikan juga membuka **Ingress Rules** di dashboard web OCI:
> * Pergi ke **Networking** ➔ **Virtual Cloud Networks (VCN)** ➔ **Security Lists** ➔ **Default Security List**.
> * Tambahkan **Ingress Rules**:
>   * *Source CIDR*: `0.0.0.0/0`
>   * *IP Protocol*: `TCP`
>   * *Destination Port Range*: `80, 443`

---

## 📥 LANGKAH 4: Clone Project dari GitHub
```bash
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www
cd /var/www

git clone https://github.com/dikabagaswara/invitationkami.git
cd invitationkami
```

---

## ⚙️ LANGKAH 5: Konfigurasi Environment (`.env`)
Salin file template:
```bash
cp .env.example .env
nano .env
```

Sesuaikan isi file `.env`:
```env
# URL Domain Website Anda (Ganti dengan domain / IP publik Anda)
APP_NAME=InvitationKami
APP_TAGLINE="Undangan Digital Modern"
APP_URL=https://domainanda.com
APP_LOGO=/images/logo.png
APP_FAVICON=/favicon.ico

# Database PostgreSQL Internal Docker
DB_USER=invitationkami_user
DB_PASSWORD=PasswordDatabaseSuperKuat_2026!
DB_NAME=invitationkami_db
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@db:5432/${DB_NAME}

# NextAuth Secret (Generate kode unik: openssl rand -base64 32)
AUTH_SECRET=buat_kode_acak_panjang_minimal_32_karakter_bebas
AUTH_URL=https://domainanda.com

# Storage Uploads
STORAGE_ADAPTER=local
UPLOAD_DIR=./public/uploads
UPLOAD_MAX_SIZE_BYTES=5242880
```
*(Tekan `CTRL + O` lalu `Enter` untuk menyimpan, lalu `CTRL + X` untuk keluar)*.

---

## 🚢 LANGKAH 6: Build & Jalankan Aplikasi (Docker Compose)
Jalankan container di background:
```bash
docker compose up -d --build
```
*(Proses build pertama membutuhkan waktu sekitar 2-3 menit).*

---

## 🗄️ LANGKAH 7: Inisialisasi Database & Seeding
Jalankan migrasi tabel database dan masukkan tema/musik default:
```bash
# 1. Push schema database
docker compose exec app npx prisma db push

# 2. Seed master data (11 Tema, Musik, User)
docker compose exec app npx prisma db seed

# 3. Buat contoh undangan luxury Dika & Nurdi (customer@gmail.com)
docker compose exec app npx tsx scripts/create-luxury-invitation.ts
```

---

## 🔒 LANGKAH 8: Pasang SSL HTTPS (Let's Encrypt Certbot) di Oracle Linux 9
Install EPEL repository & Certbot:
```bash
sudo dnf install -y epel-release
sudo dnf install -y certbot python3-certbot-nginx

# Request sertifikat SSL otomatis untuk domain Anda
sudo certbot --nginx -d domainanda.com -d www.domainanda.com
```

---

## 🔄 CARA UPDATE DI MASA DEPAN (SEKALI PERINTAH)
Jika Anda push perubahan baru dari komputer lokal ke GitHub, cukup jalankan ini di server:
```bash
cd /var/www/invitationkami
git pull origin main
docker compose up -d --build
```
Aplikasi akan langsung diperbarui tanpa menghapus data database! 🎉
