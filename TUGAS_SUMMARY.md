# 📝 Laporan Tugas - Authentication & Monitoring

**Nama Aplikasi:** Belanjain E-Commerce Platform  
**Tugas:** Implementasi Autentikasi JWT dan Monitoring  
**Tanggal:** 26 Januari 2026

---

## 📋 Ringkasan Fitur yang Ditambahkan

Sesuai dengan permintaan soal, telah ditambahkan 2 fitur utama:

### 1. 🔐 Autentikasi JWT (Bobot 35%)

#### Backend Implementation

- ✅ **User Model** (`backend/models/User.js`)
  - Schema dengan bcrypt password hashing
  - Email validation
  - Role-based system (user/admin)
- ✅ **Auth Controller** (`backend/controllers/auth.js`)
  - Register endpoint dengan validasi
  - Login endpoint dengan JWT token generation
  - GetMe endpoint untuk mendapatkan user info
  - Logout endpoint
- ✅ **Auth Middleware** (`backend/middleware/auth.js`)
  - JWT token verification
  - Route protection
  - Role-based authorization
- ✅ **Auth Routes** (`backend/routes/auth.js`)
  - POST `/api/auth/register` - Register user baru
  - POST `/api/auth/login` - Login user
  - GET `/api/auth/me` - Get current user (protected)
  - POST `/api/auth/logout` - Logout user (protected)

#### Frontend Implementation

- ✅ **AuthContext** (`src/contexts/AuthContext.tsx`)
  - Context API untuk state management
  - Login, register, logout functions
  - Token storage di localStorage
  - User state persistence
- ✅ **Login Page** (`src/pages/Login.tsx`)
  - Form dengan validasi
  - Error handling
  - Modern gradient design
  - Loading states
- ✅ **Register Page** (`src/pages/Register.tsx`)
  - Form dengan password confirmation
  - Client-side validation
  - Modern UI/UX
- ✅ **Header Integration** (`src/components/layout/Header.tsx`)
  - Login button untuk guest users
  - User dropdown menu dengan:
    - User name & email display
    - My Orders link
    - My Wishlist link
    - Logout button
- ✅ **JWT Token Management**
  - Token disimpan di localStorage
  - Automatic token check on app load
  - Token included in API requests

#### Tech Stack

- **Backend:** jsonwebtoken, bcryptjs
- **Frontend:** React Context API, localStorage

### 2. 📊 Monitoring dengan Google Analytics (Bobot 35%)

#### Implementation

- ✅ **Analytics Library** (`src/lib/analytics.ts`)
  - Google Analytics 4 (GA4) integration
  - Comprehensive tracking functions:
    - `initGA()` - Initialize Google Analytics
    - `trackPageView()` - Track page views
    - `trackEvent()` - Track custom events
    - `trackLogin()` - Track login events
    - `trackSignUp()` - Track registration
    - `trackAddToCart()` - E-commerce tracking
    - `trackRemoveFromCart()` - Cart removal tracking
    - `trackPurchase()` - Purchase tracking
    - `trackViewItem()` - Product view tracking
    - `trackSearch()` - Search tracking
- ✅ **Page Tracking Hook** (`src/hooks/usePageTracking.ts`)
  - Automatic page view tracking
  - Triggers on route changes
- ✅ **App Integration** (`src/App.tsx`)
  - GA initialization on app mount
  - usePageTracking hook implementation
  - Environment-based configuration
- ✅ **Auth Events Tracking** (`src/contexts/AuthContext.tsx`)
  - Login event tracking
  - Registration event tracking

#### Features

1. **Automatic Page Tracking**
   - Every route change is tracked
   - Page path and title recorded
2. **User Authentication Tracking**
   - Login events dengan method tracking
   - Sign up events
3. **E-commerce Events** (Ready to use)
   - Add to cart
   - Remove from cart
   - View product
   - Purchase completion
4. **Custom Events** (Ready to use)
   - Search tracking
   - Custom event tracking function

#### Tech Stack

- **Library:** react-ga4
- **Service:** Google Analytics 4

---

## 📁 File yang Ditambahkan/Dimodifikasi

### Backend (9 files)

**New Files:**

1. `backend/models/User.js` - User model dengan bcrypt
2. `backend/controllers/auth.js` - Authentication controller
3. `backend/routes/auth.js` - Auth routes
4. `backend/middleware/auth.js` - JWT middleware

**Modified Files:** 5. `backend/server.js` - Added auth routes 6. `backend/.env` - Added JWT_SECRET 7. `backend/package.json` - Added jsonwebtoken & bcryptjs

### Frontend (8 files)

**New Files:**

1. `src/contexts/AuthContext.tsx` - Auth context
2. `src/pages/Login.tsx` - Login page
3. `src/pages/Register.tsx` - Register page
4. `src/lib/analytics.ts` - Google Analytics utilities
5. `src/hooks/usePageTracking.ts` - Page tracking hook

**Modified Files:** 6. `src/App.tsx` - Added AuthProvider & GA initialization 7. `src/components/layout/Header.tsx` - Added auth UI 8. `package.json` - Added react-ga4

### Documentation (3 files)

**New Files:**

1. `AUTHENTICATION_MONITORING.md` - Comprehensive guide

**Modified Files:** 2. `README.md` - Updated with new features 3. `TUGAS_SUMMARY.md` - This file

---

## 🚀 Cara Menjalankan

### 1. Install Dependencies

```bash
# Frontend dependencies
npm install

# Backend dependencies (includes jsonwebtoken & bcryptjs)
cd backend && npm install
```

### 2. Setup Environment Variables

Pastikan `backend/.env` berisi:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/belanjain
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
JWT_SECRET=belanjain-secret-key-change-this-in-production
```

### 3. Setup Google Analytics (Optional)

1. Buat Google Analytics 4 property di https://analytics.google.com/
2. Dapatkan Measurement ID (format: G-XXXXXXXXXX)
3. Buka `src/App.tsx`
4. Ganti `const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"` dengan ID Anda

### 4. Start Servers

```bash
# Dari root directory
npm run dev:all

# Atau jalankan terpisah:
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run dev:backend
```

### 5. Test Aplikasi

1. Buka http://localhost:8080
2. Klik tombol "Login" di header
3. Klik "Sign up" untuk register
4. Isi form registrasi dan submit
5. Setelah berhasil register, Anda akan otomatis login
6. Check localStorage untuk melihat token
7. Check Google Analytics (Real-time) untuk melihat events

---

## 🧪 Testing Authentication

### Test Register

```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Login

```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Protected Route

```bash
curl http://localhost:5001/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

---

## 📊 Monitoring Features in Action

### Events yang Ditrack

1. **Page Views** - Automatic

   - Setiap route change
   - Path dan title tercatat

2. **Authentication Events**

   - Login (method: email)
   - Sign up (method: email)

3. **E-commerce Events** (Ready to implement)

   - add_to_cart
   - remove_from_cart
   - view_item
   - purchase

4. **Custom Events** (Ready to use)
   - search
   - Any custom event via `trackEvent()`

### Cara Melihat di Google Analytics

1. Login ke Google Analytics
2. Pilih property Anda
3. Go to Reports → Realtime
4. Lakukan actions di aplikasi
5. Lihat events muncul real-time

---

## 🔒 Security Features

### Password Security

- ✅ Bcrypt hashing dengan salt rounds 10
- ✅ Password tidak pernah di-return dalam response
- ✅ Minimum 6 characters validation

### JWT Security

- ✅ Token expires dalam 30 hari
- ✅ Secret key dari environment variable
- ✅ Token verification middleware
- ✅ Protected routes support

### Best Practices Implemented

- ✅ Password hashing before storing
- ✅ JWT secret in environment variables
- ✅ CORS configuration
- ✅ Error messages tidak mengexpose sensitive info
- ✅ Email lowercase normalization

---

## 📸 Screenshots

### 1. Login Page

- Modern gradient design
- Email & password fields
- Link to registration
- Loading states

### 2. Register Page

- Name, email, password fields
- Password confirmation
- Validation errors
- Modern UI

### 3. Header (Not Logged In)

- Login button dengan gradient

### 4. Header (Logged In)

- User name button
- Dropdown menu dengan:
  - Email display
  - My Orders link
  - My Wishlist link
  - Logout button

### 5. localStorage

- `token`: JWT token
- `user`: User object (name, email, role, id)

### 6. Google Analytics Dashboard

- Real-time events
- Page views
- User authentication events

---

## ✅ Checklist Tugas

### Autentikasi (JWT) - Bobot 35% ✅

- [x] ✅ Halaman Login pada frontend
- [x] ✅ Halaman Registrasi pada frontend
- [x] ✅ Backend untuk verifikasi pengguna
- [x] ✅ Simpan token JWT di localStorage
- [x] ✅ Integration dengan UI (Header, user profile)
- [x] ✅ Protected routes middleware
- [x] ✅ Password hashing dengan bcrypt
- [x] ✅ JWT token generation & verification

### Monitoring - Bobot 35% ✅

- [x] ✅ Integrasi Google Analytics
- [x] ✅ Tracking page views otomatis
- [x] ✅ Tracking user authentication (login/signup)
- [x] ✅ E-commerce event tracking (ready to use)
- [x] ✅ Custom event tracking
- [x] ✅ Dokumentasi lengkap

---

## 📚 Dokumentasi

Semua fitur terdokumentasi dengan lengkap di:

1. **[AUTHENTICATION_MONITORING.md](AUTHENTICATION_MONITORING.md)**
   - Complete guide untuk authentication
   - Google Analytics setup
   - Usage examples
   - Troubleshooting
2. **[README.md](README.md)**
   - Updated dengan fitur baru
   - API documentation
   - Quick start guide

---

## 🎓 Pembelajaran & Implementasi

### Tech Skills Demonstrated

1. **Backend Development**
   - RESTful API design
   - JWT authentication
   - Password encryption
   - Middleware implementation
   - MongoDB/Mongoose
2. **Frontend Development**
   - React Context API
   - React Hooks
   - Form handling & validation
   - State management
   - localStorage API
3. **Security**
   - Password hashing
   - JWT tokens
   - Protected routes
   - CORS configuration
4. **Monitoring & Analytics**
   - Google Analytics integration
   - Event tracking
   - User behavior analytics

### Best Practices Applied

- ✅ Separation of concerns
- ✅ Environment variables for secrets
- ✅ Error handling
- ✅ Input validation
- ✅ Consistent API response format
- ✅ Modern UI/UX design
- ✅ Code documentation
- ✅ Comprehensive README

---

## 🚀 Production Readiness

### Already Implemented ✅

- JWT authentication
- Password hashing
- Token storage
- CORS configuration
- Error handling
- User activity monitoring

### Recommendations for Production 📝

- [ ] Change JWT_SECRET to strong random value
- [ ] Enable HTTPS only
- [ ] Add rate limiting
- [ ] Implement refresh tokens
- [ ] Add email verification
- [ ] Set up proper CORS for production domain
- [ ] Add more comprehensive error logging
- [ ] Implement password reset functionality

---

## 📞 Support & Documentation

Untuk pertanyaan atau issues:

1. Cek [AUTHENTICATION_MONITORING.md](AUTHENTICATION_MONITORING.md) untuk detailed guide
2. Cek [README.md](README.md) untuk general documentation
3. Cek troubleshooting section di dokumentasi

---

## 🎉 Kesimpulan

Kedua fitur yang diminta telah berhasil diimplementasi dengan baik:

1. **Autentikasi JWT** - Fully functional dengan:

   - Login/Register pages
   - JWT token management
   - Protected routes
   - User UI in header
   - localStorage persistence

2. **Monitoring** - Google Analytics terintegrasi dengan:
   - Automatic page tracking
   - Authentication events tracking
   - E-commerce events ready
   - Comprehensive tracking utilities

Semua fitur sudah ditest dan berfungsi dengan baik. Dokumentasi lengkap tersedia untuk reference.

---