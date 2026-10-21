# E-Commerce — Deployment Guide

متجر إلكتروني: **Next.js 16 + Clerk** (فرونت) و **Strapi 5** (باك إند).

---

## 🔗 الروابط

| الخدمة | الرابط |
|---|---|
| GitHub | https://github.com/Momenmohamed1/ecomerce |
| Frontend (Vercel) | https://ecomerce-blush-eight.vercel.app |
| Strapi API | ⏳ لسه (Railway متوقفة وقت الرفع) |

---

## 🏗️ المعمارية

```
المتصفح
   │
   ├──► Vercel  ── Next.js 16 (app/) + Clerk Auth
   │                  │
   │                  └── axiosClient ──► Strapi API
   │                                          │
   └──► Clerk (SaaS)                          ├── Postgres (Railway)
                                              └── Cloudinary (الصور)
```

**مهم:** Strapi **مش** بيرفع على Vercel — محتاج سيرفر دائم + Postgres.

---

## 🚀 النشر التلقائي

كل `git push` على فرع `main` بينشر تلقائيًا على Vercel (Git Integration مربوط).

```bash
git add .
git commit -m "وصف التعديل"
git push
```

Vercel هتبني وتنشر في 1-3 دقايق. تقدر تتابع من:
https://vercel.com/momen-6923/ecomerce

### تشغيل محلي

```bash
npm install
npm run dev          # الفرونت على http://localhost:3000

cd my-strapi-project
npm install
npm run develop      # Strapi على http://localhost:1337/admin
```

---

## 🔐 متغيرات البيئة

### على Vercel (Production + Preview + Development)

| المتغير | القيمة |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_...` من Clerk Dashboard |
| `CLERK_SECRET_KEY` | `sk_test_...` (سرّي — server only) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_REST_API_KEY` | API Token من Strapi (Settings → API Tokens) |
| `NEXT_PUBLIC_API_URL` | `https://<strapi-domain>/api` |

للتعديل: https://vercel.com/momen-6923/ecomerce/settings/environment-variables

> ⚠️ بعد تغيير أي متغير يبدأ بـ `NEXT_PUBLIC_` لازم **Redeploy** (لأنه بيتحول لقيمة ثابتة وقت الـ build).

### محليًا

انسخ `.env.example` إلى `.env.local` واملأ القيم.

---

## 🗄️ Strapi على Railway (الخطوة المتبقية)

الملفات جاهزة في `my-strapi-project/`:
- `Dockerfile` — صورة إنتاج جاهزة
- `railway.json` — إعدادات Railway
- `.env.production.example` — كل المتغيرات المطلوبة
- `config/middlewares.js` — CORS بيتقرأ من `CORS_ORIGINS`

### الخطوات

1. **Railway** → New Project → Deploy from GitHub repo → `Momenmohamed1/ecomerce`
2. **Root Directory** = `my-strapi-project`
3. أضف **PostgreSQL** من نفس المشروع
4. انسخ `.env.production.example` واملأ القيم في Railway → Variables:
   - `DATABASE_URL` = `${{Postgres.DATABASE_URL}}`
   - `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`
     (توليد: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`)
   - `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET`
   - `CORS_ORIGINS=https://ecomerce-blush-eight.vercel.app`
5. Generate Domain → انسخ الرابط
6. حدّث `NEXT_PUBLIC_API_URL` على Vercel لـ `https://<domain>/api` وأعد النشر
7. افتح `/admin` واعمل أول حساب

### ترحيل البيانات

```bash
# تصدير (من الجهاز)
cd my-strapi-project
npm run strapi -- export -f strapi-data --no-encrypt

# استيراد (على السيرفر بعد أول تشغيل)
npm run strapi -- import -f strapi-data.tar.gz
```

---

## 🔒 ملاحظات أمان

1. **`NEXT_PUBLIC_REST_API_KEY` مكشوف في المتصفح** — أي حد يفتح DevTools يقدر ياخده. الحل الصحيح: نقل استدعاءات Strapi لـ Route Handler على السيرفر (مثال: `app/api/[...path]/route.js`) وعدم استخدام `NEXT_PUBLIC_`.
2. مفاتيح Clerk الحالية `pk_test` / `sk_test` = بيئة تطوير. للإنتاج: Instance جديد + دومين.
3. `.env.local` و `.env` مستثنيان من Git — متشيلهمش من `.gitignore` أبدًا.
4. أضف دومين Vercel في Clerk → **Allowed Origins**.

---

## 📁 هيكل المشروع

```
ecomerce/
├── app/                      # Next.js App Router
│   ├── _components/          # Header, Footer, Hero, Clerk...
│   ├── _utils/               # axiosClient, ProductAPIs, CartApis
│   ├── cart/  product-details/  sign-in/  user-profile/
│   └── layout.js
├── public/
├── my-strapi-project/        # Strapi 5 (يُرفع منفصلًا)
│   ├── config/               # database, middlewares, plugins, server
│   ├── src/api/              # project + cart content-types
│   ├── Dockerfile
│   └── railway.json
└── .env.example
```
