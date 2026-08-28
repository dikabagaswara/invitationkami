# PROJECT: INVITATIONKAMI

## ROLE

Kamu bertindak sebagai:

* Principal Software Architect
* Senior Full-Stack Architect
* Database Architect
* Security Architect
* DevOps Architect
* Product Architect

Saya ingin membangun **InvitationKami**, sebuah platform SaaS Wedding Invitation Digital yang akan dijadikan bisnis komersial.

Ini bukan project demo atau portfolio.

---

# PRODUCT

InvitationKami adalah platform Multi-Tenant Wedding Invitation SaaS.

Customer dapat:

* Membuat undangan
* Memilih theme
* Mengisi data mempelai
* Upload foto
* Mengatur acara
* Menambahkan love story
* Menambahkan musik
* Mengatur RSVP
* Mengatur guestbook
* Menambahkan wedding gift
* Mengatur tampilan
* Preview
* Publish
* Mendapatkan link
* Mendapatkan QR Code
* Share melalui WhatsApp

Public URL:

```text
/i/[slug]
```

Contoh:

```text
/i/rama-ayu
```

---

# BUSINESS MODEL

Platform harus mendukung banyak customer dan banyak invitation.

Contoh:

```text
Customer A
├── Invitation Rama & Ayu
└── Invitation Budi & Sinta

Customer B
├── Invitation Andi & Sarah
└── Invitation Dimas & Rani
```

Customer A tidak boleh dapat mengakses data Customer B.

Tenant isolation adalah requirement CRITICAL.

---

# TARGET INFRASTRUCTURE

Target deployment awal:

```text
CPU: 2 Core
RAM: 4 GB
Disk: 30 GB SSD
OS: Linux
```

Architecture harus hemat resource.

Gunakan:

**Modular Monolith**

Jangan menggunakan:

* Microservices
* Kubernetes
* Redis
* Kafka
* Elasticsearch

kecuali benar-benar diperlukan dan dapat dibuktikan alasannya.

---

# TECHNOLOGY

Gunakan:

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* PostgreSQL
* Prisma
* Docker
* Nginx
* Zod

Next.js digunakan sebagai full-stack application.

Tidak perlu backend terpisah.

---

# DATABASE

Minimal entity:

```text
User
Invitation
Event
Gallery
LoveStory
Guest
GuestMessage
WeddingGift
Theme
Music
```

Architecture harus siap dikembangkan menjadi:

```text
Plan
Subscription
Order
Payment
CustomDomain
Analytics
```

Tetapi jangan over-engineer dan jangan implement payment sekarang.

---

# DATA VS DESIGN

Ini adalah requirement CRITICAL.

Wedding data harus benar-benar terpisah dari theme.

Contoh:

```text
Wedding Data
├── Groom
├── Bride
├── Date
├── Venue
├── Gallery
└── Story
```

Theme:

```text
Elegant
Modern
Floral
Luxury
Minimalist
```

Concept:

```text
Wedding Data
+
Theme
=
Rendered Invitation
```

Wedding data yang sama harus dapat digunakan oleh semua theme tanpa input ulang.

Theme baru harus dapat ditambahkan tanpa mengubah business logic.

---

# THEME ENGINE

Minimal:

```text
Elegant
Modern
Floral
Luxury
Minimalist
```

Theme harus benar-benar berbeda secara layout dan visual identity.

Bukan hanya mengganti warna.

Minimal section:

```text
Opening
Hero
Couple
Quote
Countdown
Events
Story
Gallery
RSVP
Guestbook
Gift
Location
Footer
```

Customer dapat mengatur:

* Theme
* Color preset
* Font preset
* Animation intensity
* Music
* Section visibility

Jangan membuat Canva-like editor untuk MVP.

---

# PUBLIC INVITATION

Invitation hanya dapat diakses publik jika:

```text
isPublished = true
```

Opening screen:

```text
THE WEDDING OF

GROOM
&
BRIDE

DATE

[Buka Undangan]
```

Setelah user klik:

* Opening hilang
* Invitation tampil
* Scroll aktif
* Music dapat dimulai

Autoplay harus mengikuti browser policy.

---

# CUSTOMER DASHBOARD

Dashboard minimal:

```text
Dashboard
Undangan Saya
Editor
├── Mempelai
├── Acara
├── Story
├── Gallery
├── RSVP
├── Guestbook
├── Wedding Gift
├── Music
└── Settings
Tema
Tamu
Analytics
Settings
```

UI harus mudah digunakan oleh user non-teknis.

---

# STORAGE

Gunakan abstraction:

```text
StorageService
├── LocalStorage
└── S3Storage (future)
```

MVP menggunakan local storage.

Harus mudah dipindahkan ke:

* Cloudflare R2
* S3
* MinIO
* Object Storage

Tanpa mengubah business logic.

Image:

* maksimum 5 MB
* validasi MIME
* resize
* compression
* WebP/modern format jika sesuai
* jangan menyimpan original jika tidak diperlukan

Jangan mengizinkan:

```text
exe
php
js
unsafe svg
executable files
```

---

# SECURITY

Wajib:

* Authentication
* Authorization
* Tenant isolation
* Zod validation
* Secure password hashing
* Rate limiting
* Upload validation
* MIME validation
* File size limit
* Secure headers
* XSS protection
* CSRF protection jika relevan

Semua mutation harus mengikuti:

```text
Request
 ↓
Authenticated User
 ↓
Ownership Check
 ↓
Validation
 ↓
Database Operation
```

Jangan pernah hanya mempercayai ID dari URL/client.

---

# DOCKER

Architecture:

```text
Internet
   ↓
Nginx
   ↓
Next.js
   ↓
PostgreSQL
```

PostgreSQL harus berada di internal Docker network.

Jangan expose:

```text
5432
```

ke internet.

PostgreSQL harus menggunakan persistent Docker volume.

---

# BACKUP

Wajib memiliki:

```text
scripts/
├── backup.sh
└── restore.sh
```

Gunakan pg_dump.

Backup harus dapat dipindahkan ke external storage.

Jangan mengandalkan backup yang hanya tersimpan di VPS.

---

# PERFORMANCE

Public invitation harus mobile-first.

Target:

```text
375px
390px
412px
768px
1280px+
```

Optimalkan:

* Image
* Lazy loading
* Server rendering
* Caching
* Database queries
* JavaScript bundle

Jangan melakukan satu database query untuk setiap section.

---

# BRANDING

Jangan hardcode "InvitationKami" di seluruh source code.

Gunakan configuration:

```text
APP_NAME
APP_TAGLINE
APP_LOGO
APP_FAVICON
APP_URL
```

Brand harus mudah diganti.

---

# YOUR TASK

Jangan langsung membuat seluruh project.

Saya ingin kamu terlebih dahulu menghasilkan **technical blueprint yang akan digunakan sebagai sumber kebenaran oleh model coding lainnya**.

Analisis dan tentukan:

1. Architecture
2. Project structure
3. Database architecture
4. Prisma schema design
5. Entity relationships
6. Tenant isolation
7. Authentication
8. Authorization
9. Theme Engine
10. Storage abstraction
11. Media processing
12. Public invitation rendering
13. Caching
14. Analytics
15. Rate limiting
16. Security
17. Docker architecture
18. Backup/restore
19. Environment variables
20. Deployment architecture
21. Implementation phases
22. Testing strategy

Pertimbangkan selalu:

```text
2 Core
4 GB RAM
30 GB SSD
```

Pilih solusi:

1. Simple
2. Stable
3. Secure
4. Resource efficient
5. Maintainable
6. Easy to deploy
7. Easy to scale

Jangan menambahkan teknologi hanya agar terlihat canggih.

## IMPORTANT

Jangan langsung implementasikan seluruh source code.

Buat blueprint yang sangat jelas dan actionable untuk developer berikutnya.

Setelah blueprint selesai, berhenti dan tunggu instruksi berikutnya.

#SONET#