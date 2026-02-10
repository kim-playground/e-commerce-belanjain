# 🚀 Deployment Guide - Render

This guide will help you deploy the Belanjain E-Commerce application to Render.

---

## 📋 Prerequisites

1. **GitHub Account** - Your code should be on GitHub
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **MongoDB Atlas** - Free tier database (or use your own MongoDB)

---

## 🗄️ Step 1: Setup MongoDB Atlas (Database)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user:
   - Username: `belanjain_user`
   - Password: (create a strong password)
4. Whitelist all IP addresses:
   - Go to Network Access
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
5. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Example: `mongodb+srv://belanjain_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/belanjain`

---

## 🚀 Step 2: Deploy Backend to Render

### Option A: Using Render Dashboard (Recommended)

1. **Login to Render**

   - Go to [dashboard.render.com](https://dashboard.render.com)

2. **Create New Web Service**

   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure Service**

   ```
   Name: belanjain-backend
   Region: Choose closest to you
   Branch: main (or your deployment branch)
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable"

   ```
   MONGODB_URI=mongodb+srv://belanjain_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/belanjain
   NODE_ENV=production
   JWT_SECRET=your-super-secret-random-string-change-this
   FRONTEND_URL=https://your-frontend-domain.netlify.app
   ```

   **⚠️ IMPORTANT:**

   - Change `JWT_SECRET` to a strong random string
   - Update `FRONTEND_URL` after deploying frontend
   - Don't include `PORT` - Render provides it automatically

5. **Deploy**

   - Click "Create Web Service"
   - Render will automatically deploy your backend
   - Wait for deployment to complete (2-5 minutes)

6. **Save Backend URL**
   - Your backend will be available at: `https://belanjain-backend.onrender.com`
   - Copy this URL for frontend configuration

### Option B: Using render.yaml (Infrastructure as Code)

Create `render.yaml` in your repository root:

```yaml
services:
  - type: web
    name: belanjain-backend
    env: node
    region: singapore
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        sync: false # Add manually in dashboard
      - key: JWT_SECRET
        generateValue: true
      - key: FRONTEND_URL
        sync: false # Add manually in dashboard
```

Then connect your repo and Render will use this configuration.

---

## 🌐 Step 3: Deploy Frontend to Netlify/Vercel

### Update Frontend API URL

Before deploying frontend, update the API URL:

1. Open `src/contexts/AuthContext.tsx`
2. Change this line:

   ```typescript
   const API_URL = "http://localhost:5001/api";
   ```

   To:

   ```typescript
   const API_URL =
     import.meta.env.VITE_API_URL ||
     "https://belanjain-backend.onrender.com/api";
   ```

3. Create `.env.production` in root:
   ```env
   VITE_API_URL=https://belanjain-backend.onrender.com/api
   ```

### Deploy to Netlify

1. **Build Frontend**

   ```bash
   npm run build
   ```

2. **Deploy to Netlify**

   - Go to [netlify.com](https://www.netlify.com)
   - Drag & drop your `dist/` folder
   - Or connect GitHub for automatic deployments

3. **Configure Netlify**

   ```
   Build command: npm run build
   Publish directory: dist
   ```

4. **Add Environment Variables in Netlify**
   - Go to Site settings → Environment variables
   - Add: `VITE_API_URL=https://belanjain-backend.onrender.com/api`

### Deploy to Vercel

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Deploy**

   ```bash
   npm run build
   vercel --prod
   ```

3. **Add Environment Variables**
   ```bash
   vercel env add VITE_API_URL production
   # Enter: https://belanjain-backend.onrender.com/api
   ```

---

## 🔧 Step 4: Update CORS Configuration

After deploying frontend, update your backend CORS:

1. Go to Render Dashboard → Your Service → Environment
2. Update `FRONTEND_URL` to your actual frontend URL:

   ```
   FRONTEND_URL=https://your-app.netlify.app
   ```

3. Backend akan automatically restart

---

## 🗄️ Step 5: Seed Database (Optional)

To populate your production database with sample data:

1. **Option A: Using Local Script**

   ```bash
   # Set production MongoDB URI temporarily
   export MONGODB_URI="mongodb+srv://..."
   cd backend
   node seed.js
   ```

2. **Option B: Using Render Shell**
   - Go to Render Dashboard → Your Service
   - Click "Shell" tab
   - Run: `node seed.js`

---

## ✅ Step 6: Test Your Deployment

1. **Test Backend**

   ```bash
   curl https://belanjain-backend.onrender.com/api/health
   ```

   Expected response:

   ```json
   {
     "success": true,
     "message": "Belanjain API is running! 🚀"
   }
   ```

2. **Test Frontend**

   - Visit your Netlify/Vercel URL
   - Try registering a new user
   - Check if login works
   - Verify products are loading

3. **Test Authentication**
   - Register a new account
   - Check browser localStorage for token
   - Test logout

---

## 🔐 Security Checklist for Production

- [ ] ✅ Changed `JWT_SECRET` to strong random value
- [ ] ✅ Using MongoDB Atlas (not local MongoDB)
- [ ] ✅ CORS set to specific frontend domain
- [ ] ✅ Environment variables properly configured
- [ ] ✅ HTTPS enabled (automatic on Render/Netlify)
- [ ] ⚠️ Consider adding rate limiting
- [ ] ⚠️ Consider adding request logging
- [ ] ⚠️ Monitor error logs regularly

---

## 🐛 Troubleshooting

### Backend Issues

**Problem: Application crashes on Render**

```
Solution: Check Render logs
- Go to Dashboard → Your Service → Logs
- Look for error messages
- Common issues:
  - MongoDB connection failed (check MONGODB_URI)
  - Missing environment variables
  - Port binding issues (should auto-resolve)
```

**Problem: CORS errors**

```
Solution: Update FRONTEND_URL
1. Backend .env should have correct frontend URL
2. Restart backend service
3. Clear browser cache
```

**Problem: Database connection failed**

```
Solution:
1. Check MongoDB Atlas is running
2. Verify connection string is correct
3. Ensure IP whitelist includes 0.0.0.0/0
4. Check database user credentials
```

### Frontend Issues

**Problem: Cannot connect to backend**

```
Solution:
1. Verify VITE_API_URL is correct
2. Check backend is running (visit /api/health endpoint)
3. Rebuild frontend: npm run build
4. Redeploy to Netlify/Vercel
```

**Problem: 401 Unauthorized errors**

```
Solution:
1. Clear browser localStorage
2. Register new account
3. Check JWT_SECRET matches between local and production
```

---

## 📊 Monitoring

### Render Monitoring

- View logs: Dashboard → Service → Logs
- View metrics: Dashboard → Service → Metrics
- Set up alerts: Settings → Notifications

### MongoDB Atlas Monitoring

- Go to Atlas Dashboard
- Check "Metrics" tab
- Monitor connections, operations, memory

---

## 💰 Cost Estimate (Free Tier)

| Service        | Free Tier | Limits                                        |
| -------------- | --------- | --------------------------------------------- |
| Render         | ✅ Free   | 750 hours/month, sleeps after 15 min inactive |
| MongoDB Atlas  | ✅ Free   | 512 MB storage, shared cluster                |
| Netlify/Vercel | ✅ Free   | 100 GB bandwidth/month                        |

**Total: $0/month for small projects**

### ⚠️ Important Notes:

- Render free tier sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- For production apps, consider paid tier ($7/month)

---

## 🔄 Continuous Deployment

### Automatic Deployments

**Render:**

- Automatically deploys on git push to main branch
- Can configure branch in dashboard

**Netlify/Vercel:**

- Automatically builds and deploys on git push
- Preview deployments for pull requests

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Netlify Documentation](https://docs.netlify.com)
- [Vercel Documentation](https://vercel.com/docs)

---

## 🎯 Quick Commands Reference

```bash
# Build frontend
npm run build

# Test production build locally
npm run preview

# Deploy to Vercel
vercel --prod

# View Render logs
render logs -s your-service-name

# Seed production database
node backend/seed.js
```

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] Backend deployed to Render
- [ ] Environment variables configured
- [ ] Backend health check passing
- [ ] Database seeded (optional)
- [ ] Frontend API URL updated
- [ ] Frontend deployed to Netlify/Vercel
- [ ] CORS configuration updated
- [ ] Google Analytics configured (optional)
- [ ] Test registration & login
- [ ] Test all major features

---

**🎉 Congratulations! Your app is now live!**

Share your live URLs:

- Backend API: `https://belanjain-backend.onrender.com`
- Frontend: `https://your-app.netlify.app`

---

**Need Help?** Check the troubleshooting section or review Render/Netlify documentation.
