# 🗄️ MongoDB Setup Guide

Ada 2 opsi untuk setup MongoDB:

## ✅ **Opsi 1: MongoDB Atlas (Cloud) - RECOMMENDED**

Lebih mudah, tidak perlu install apapun, gratis!

### Langkah-langkah:

1. **Buat Account MongoDB Atlas**

   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up dengan email atau Google account
   - Pilih "Free Tier" (M0 Sandbox)

2. **Create Cluster**

   - Pilih provider: **AWS**
   - Pilih region terdekat: **Singapore (ap-southeast-1)**
   - Cluster Name: `belanjain-cluster`
   - Click **"Create Cluster"** (tunggu 3-5 menit)

3. **Setup Database Access**

   - Di sidebar, click **"Database Access"**
   - Click **"Add New Database User"**
   - Username: `belanjain_user`
   - Password: Generate atau buat sendiri (SIMPAN password ini!)
   - Database User Privileges: **"Read and write to any database"**
   - Click **"Add User"**

4. **Setup Network Access**

   - Di sidebar, click **"Network Access"**
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"** (untuk development)
   - Click **"Confirm"**

5. **Get Connection String**

   - Di sidebar, click **"Database"**
   - Click **"Connect"** pada cluster Anda
   - Pilih **"Connect your application"**
   - Copy connection string, contoh:
     ```
     mongodb+srv://belanjain_user:<password>@belanjain-cluster.xxxxx.mongodb.net/
     ```
   - **PENTING:** Ganti `<password>` dengan password user Anda!

6. **Update Backend .env**

   ```env
   MONGODB_URI=mongodb+srv://belanjain_user:YOUR_PASSWORD@belanjain-cluster.xxxxx.mongodb.net/belanjain?retryWrites=true&w=majority
   ```

7. **Test Connection**
   ```bash
   cd backend
   npm run seed
   ```

---

## 🖥️ **Opsi 2: MongoDB Local (Install di Mac)**

Jika ingin install MongoDB di komputer lokal:

### Install via Homebrew:

```bash
# 1. Install Homebrew (jika belum ada)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install MongoDB
brew tap mongodb/brew
brew install mongodb-community@7.0

# 3. Start MongoDB service
brew services start mongodb-community@7.0

# 4. Verify MongoDB is running
mongosh --version
```

### Konfigurasi:

Backend `.env` sudah default ke local:

```env
MONGODB_URI=mongodb://localhost:27017/belanjain
```

### Test:

```bash
cd backend
npm run seed
```

---

## 🧪 Verify Setup

Setelah setup MongoDB (Atlas atau Local), test dengan:

```bash
cd backend
npm run seed
```

**Expected output:**

```
✅ Connected to MongoDB
🗑️  Cleared existing products
✅ Inserted 8 products

📦 Sample Products:
   - Wireless Bluetooth Headphones (Electronics) - Rp 299,000
   - Smart Watch Series 7 (Electronics) - Rp 499,000
   - Premium Cotton T-Shirt (Clothing) - Rp 149,000

🎉 Database seeded successfully!
```

---

## ❌ Troubleshooting

### Error: "MongooseServerSelectionError"

**Penyebab:** Tidak bisa connect ke MongoDB

**Solusi:**

- **Atlas:** Check connection string, password, dan network access
- **Local:** Pastikan MongoDB service running: `brew services list`

### Error: "Authentication failed"

**Penyebab:** Username/password salah

**Solusi:**

- Check password di connection string
- Pastikan user sudah dibuat di Atlas Database Access

---

## 📝 Recommendation

Untuk tugas kuliah, saya **SANGAT REKOMENDASIKAN MongoDB Atlas** karena:

✅ Tidak perlu install apapun
✅ Gratis selamanya (512MB storage)
✅ Mudah di-share dengan dosen/teman
✅ Bisa diakses dari mana saja
✅ Automatic backups
✅ Production-ready

---

**Next:** Setelah MongoDB setup, lanjut ke [Backend README](./README.md) untuk start server!
