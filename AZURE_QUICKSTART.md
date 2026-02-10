# ⚡ Azure Quick Start Guide

Deploy Belanjain E-Commerce to Azure in **15 minutes**!

---

## 🎯 Prerequisites (5 minutes)

1. ✅ Azure account ([Sign up free](https://azure.microsoft.com/free/))
2. ✅ MongoDB Atlas account ([Free tier](https://www.mongodb.com/cloud/atlas))
3. ✅ GitHub repository with your code

---

## 🚀 Deployment Steps

### Step 1: Setup Database (3 minutes)

1. **MongoDB Atlas:**
   - Create cluster → Select **FREE tier**
   - Create user: `belanjain_user` / `[your-password]`
   - Network Access → Allow `0.0.0.0/0`
   - Get connection string → Save it!

---

### Step 2: Deploy Backend (5 minutes)

1. **Azure Portal** → [portal.azure.com](https://portal.azure.com)

2. **Create Web App:**

   - Click "+ Create a resource" → "Web App"
   - Basics:
     ```
     Name: belanjain-backend (must be unique!)
     Runtime: Node 18 LTS
     OS: Linux
     Region: Southeast Asia
     Pricing: F1 (Free)
     ```
   - Click **"Review + create"** → **"Create"**

3. **Configure Environment:**

   - Go to your App → **Configuration** → **Application settings**
   - Add these settings (click "+ New application setting"):
     | Name | Value |
     |------|-------|
     | `MONGODB_URI` | `mongodb+srv://belanjain_user:PASSWORD@...` |
     | `NODE_ENV` | `production` |
     | `JWT_SECRET` | Generate: `openssl rand -hex 32` |
     | `FRONTEND_URL` | `https://your-frontend-url` (update later) |
   - Click **Save**

4. **Set Startup Command:**

   - Configuration → **General settings**
   - Startup Command: `cd backend && npm install && npm start`
   - Click **Save**

5. **Deploy Code:**

   - **Deployment Center** → **GitHub**
   - Authorize → Select your repo → Branch: `main`
   - Click **Save**
   - Azure will auto-deploy! ✅

6. **Test:**
   - Visit: `https://belanjain-backend.azurewebsites.net/api/health`
   - Should see: `{"success": true, "message": "Belanjain API is running! 🚀"}`

---

### Step 3: Deploy Frontend (5 minutes)

1. **Create Static Web App:**

   - Azure Portal → "+ Create a resource" → "Static Web Apps"
   - Basics:
     ```
     Name: belanjain-frontend
     Plan: Free
     Region: East Asia
     Source: GitHub
     ```
   - Authorize GitHub → Select repo

2. **Build Configuration:**

   ```
   App location: /
   Output location: dist
   ```

3. **Add Environment Variable:**

   - Your Static Web App → **Configuration**
   - Add:
     ```
     VITE_API_URL=https://belanjain-backend.azurewebsites.net/api
     ```

4. **Update Backend CORS:**
   - Go back to Backend App Service
   - Configuration → Update `FRONTEND_URL`:
     ```
     FRONTEND_URL=https://belanjain-frontend.azurestaticapps.net
     ```
   - Save & Restart

---

### Step 4: Test Everything (2 minutes)

1. **Visit Frontend URL**
2. **Register** new account
3. **Login**
4. **Browse products**
5. **Add to cart**

**Done! 🎉**

---

## 🔥 Quick Commands

### Generate JWT Secret

```bash
# macOS/Linux
openssl rand -hex 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Test Backend

```bash
# Health check
curl https://YOUR-APP.azurewebsites.net/api/health

# Products
curl https://YOUR-APP.azurewebsites.net/api/products
```

### View Logs

```bash
# Azure CLI
az webapp log tail --name belanjain-backend --resource-group belanjain-rg
```

---

## 📊 Your URLs

After deployment:

- **Backend:** `https://belanjain-backend.azurewebsites.net`
- **Frontend:** `https://belanjain-frontend.azurestaticapps.net`
- **API:** `https://belanjain-backend.azurewebsites.net/api`
- **Health:** `https://belanjain-backend.azurewebsites.net/api/health`

---

## 🆘 Troubleshooting

### Backend not starting?

- Check logs: App Service → **Log stream**
- Verify MongoDB connection string
- Ensure startup command is correct

### CORS errors?

- Update `FRONTEND_URL` in backend settings
- Restart backend app
- Clear browser cache

### Database connection failed?

- Check MongoDB Atlas IP whitelist (0.0.0.0/0)
- Verify connection string is correct
- Test connection locally first

---

## 💰 Cost

**Free Tier:**

- App Service F1: FREE (with limitations)
- Static Web Apps: FREE (100 GB bandwidth/month)
- MongoDB Atlas: FREE (512 MB)

**Total: $0/month** 🎉

---

## 📚 Full Documentation

For detailed instructions, see:

- **[DEPLOYMENT_AZURE.md](DEPLOYMENT_AZURE.md)** - Complete guide
- **[README.md](README.md)** - General documentation

---

**Questions?** Check the [full Azure deployment guide](DEPLOYMENT_AZURE.md)!

---

Last updated: January 26, 2026
