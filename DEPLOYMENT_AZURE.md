# 🚀 Deployment Guide - Microsoft Azure

This guide will help you deploy the Belanjain E-Commerce application to **Microsoft Azure**.

---

## 📋 Prerequisites

1. **Azure Account** - Sign up at [azure.microsoft.com](https://azure.microsoft.com) (Free tier available)
2. **GitHub Account** - Your code should be on GitHub
3. **MongoDB Atlas** - Free tier database (or Azure Cosmos DB)
4. **Azure CLI** (Optional) - For command-line deployment

---

## 🌟 Why Azure?

- ✅ **Free Tier:** $200 credit for 30 days + 12 months free services
- ✅ **Performance:** Global data centers, low latency
- ✅ **Integration:** Seamless integration with Microsoft services
- ✅ **Scaling:** Easy to scale up/down
- ✅ **Monitoring:** Built-in Application Insights
- ✅ **CI/CD:** GitHub Actions integration

---

## 🗄️ Step 1: Setup MongoDB (Database)

### Option A: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user:
   - Username: `belanjain_user`
   - Password: (create strong password)
4. Whitelist all IP addresses:
   - Network Access → Add IP Address
   - Allow Access from Anywhere (0.0.0.0/0)
5. Get connection string:
   - Connect → Connect your application
   - Copy connection string
   - Example: `mongodb+srv://belanjain_user:PASSWORD@cluster0.xxxxx.mongodb.net/belanjain`

### Option B: Azure Cosmos DB (Alternative)

1. Go to Azure Portal
2. Create Cosmos DB account with MongoDB API
3. Get connection string from Keys section
4. More expensive than MongoDB Atlas free tier

**Recommendation:** Use MongoDB Atlas for cost savings.

---

## 🚀 Step 2: Deploy Backend to Azure App Service

### Method 1: Using Azure Portal (Recommended for Beginners)

#### 2.1 Create App Service

1. **Login to Azure Portal**

   - Go to [portal.azure.com](https://portal.azure.com)

2. **Create Resource**

   - Click "+ Create a resource"
   - Search for "Web App"
   - Click "Create"

3. **Configure Basic Settings**

   ```
   Subscription: Your subscription
   Resource Group: Create new → "belanjain-rg"
   Name: belanjain-backend (must be globally unique)
   Publish: Code
   Runtime stack: Node 18 LTS (or latest)
   Operating System: Linux
   Region: Southeast Asia (or closest to you)
   ```

4. **Configure Pricing Tier**

   - App Service Plan: Create new → "belanjain-plan"
   - Pricing tier: **F1 (Free)** for testing
     - 1 GB RAM, 1 GB storage
     - For production: B1 or higher recommended

5. **Review + Create**
   - Click "Review + create"
   - Click "Create"
   - Wait for deployment (2-3 minutes)

#### 2.2 Configure Deployment

1. **Go to Your App Service**

   - Navigate to your newly created app service

2. **Setup Deployment Center**

   - In left menu: Deployment → Deployment Center
   - Source: GitHub
   - Authorize GitHub
   - Select:
     - Organization: Your GitHub username
     - Repository: e-commerce-belanjain
     - Branch: main

3. **Configure Build**

   - Build Provider: GitHub Actions
   - Runtime: Node
   - Version: 18
   - Click "Save"

4. **Azure Creates GitHub Actions Workflow**
   - Azure automatically creates `.github/workflows/azure-webapps-node.yml`
   - This enables automatic deployment on git push

#### 2.3 Configure Application Settings (Environment Variables)

1. **Go to Configuration**

   - In left menu: Settings → Configuration
   - Click "Application settings" tab

2. **Add Required Settings**

   Click "+ New application setting" for each:

   | Name                             | Value                                                   | Notes                             |
   | -------------------------------- | ------------------------------------------------------- | --------------------------------- |
   | `MONGODB_URI`                    | `mongodb+srv://user:pass@cluster.mongodb.net/belanjain` | Your MongoDB connection string    |
   | `NODE_ENV`                       | `production`                                            | Sets production mode              |
   | `JWT_SECRET`                     | `[generate-strong-random-string]`                       | Min 32 characters                 |
   | `FRONTEND_URL`                   | `https://your-frontend.azurestaticapps.net`             | Update after frontend deployment  |
   | `WEBSITES_PORT`                  | `8080`                                                  | Azure's preferred port (optional) |
   | `SCM_DO_BUILD_DURING_DEPLOYMENT` | `true`                                                  | Enable build during deployment    |

3. **Click "Save"** at the top
4. **Click "Continue"** to confirm restart

**⚠️ IMPORTANT:** Generate a strong random JWT_SECRET:

```bash
# Use this command to generate a secure secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 2.4 Configure Startup Command (Important!)

1. **In Configuration page**

   - Click "General settings" tab

2. **Set Startup Command**

   ```bash
   cd backend && npm install && npm start
   ```

3. **Click "Save"**

#### 2.5 Test Backend Deployment

1. **Get Your URL**

   - Overview → URL (e.g., `https://belanjain-backend.azurewebsites.net`)

2. **Test Health Endpoint**

   - Visit: `https://belanjain-backend.azurewebsites.net/api/health`
   - Should return:
     ```json
     {
       "success": true,
       "message": "Belanjain API is running! 🚀"
     }
     ```

3. **Check Logs** (if issues)
   - Monitoring → Log stream
   - Or: Diagnose and solve problems → Application logs

---

### Method 2: Using Azure CLI (Advanced)

```bash
# Login to Azure
az login

# Create resource group
az group create --name belanjain-rg --location southeastasia

# Create App Service plan (Free tier)
az appservice plan create \
  --name belanjain-plan \
  --resource-group belanjain-rg \
  --sku F1 \
  --is-linux

# Create web app
az webapp create \
  --name belanjain-backend \
  --resource-group belanjain-rg \
  --plan belanjain-plan \
  --runtime "NODE:18-lts"

# Configure app settings
az webapp config appsettings set \
  --name belanjain-backend \
  --resource-group belanjain-rg \
  --settings \
    MONGODB_URI="mongodb+srv://..." \
    NODE_ENV="production" \
    JWT_SECRET="your-secret-key"

# Configure deployment from GitHub
az webapp deployment source config \
  --name belanjain-backend \
  --resource-group belanjain-rg \
  --repo-url https://github.com/YOUR_USERNAME/e-commerce-belanjain \
  --branch main \
  --manual-integration

# Set startup command
az webapp config set \
  --name belanjain-backend \
  --resource-group belanjain-rg \
  --startup-file "cd backend && npm install && npm start"
```

---

## 🌐 Step 3: Deploy Frontend to Azure Static Web Apps

### 3.1 Create Static Web App

1. **In Azure Portal**

   - Create resource → Search "Static Web Apps"
   - Click "Create"

2. **Configure**

   ```
   Subscription: Your subscription
   Resource Group: belanjain-rg
   Name: belanjain-frontend
   Plan type: Free (for testing)
   Region: East Asia (or closest)
   Source: GitHub
   ```

3. **GitHub Integration**

   - Authorize GitHub
   - Organization: Your username
   - Repository: e-commerce-belanjain
   - Branch: main

4. **Build Details**

   ```
   Build Presets: Custom
   App location: /
   Api location: (leave empty)
   Output location: dist
   ```

5. **Review + Create**

### 3.2 Configure Environment Variables

1. **Go to Your Static Web App**
2. **Configuration → Environment variables**
3. **Add Application settings:**
   ```
   VITE_API_URL=https://belanjain-backend.azurewebsites.net/api
   ```

### 3.3 Update Build Configuration

Azure creates `.github/workflows/azure-static-web-apps-xxx.yml`

Ensure it has:

```yaml
app_build_command: "npm run build"
```

---

## 🔧 Step 4: Update CORS Configuration

After deploying frontend, update backend CORS:

1. **Go to Backend App Service**
2. **Configuration → Application settings**
3. **Update `FRONTEND_URL`:**
   ```
   FRONTEND_URL=https://belanjain-frontend.azurestaticapps.net
   ```
4. **Save** and restart

---

## 🗄️ Step 5: Seed Database (Optional)

### Via Local Connection

```bash
# Set MongoDB URI temporarily
export MONGODB_URI="mongodb+srv://..."

# Run seed script
cd backend
node seed.js
```

### Via Azure SSH Console

1. **Go to App Service**
2. **Development Tools → SSH → Go**
3. **Run:**
   ```bash
   cd /home/site/wwwroot/backend
   node seed.js
   ```

---

## ✅ Step 6: Verify Deployment

### Backend Tests

```bash
# Health check
curl https://belanjain-backend.azurewebsites.net/api/health

# Test products API
curl https://belanjain-backend.azurewebsites.net/api/products

# Test auth endpoint
curl -X POST https://belanjain-backend.azurewebsites.net/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'
```

### Frontend Tests

1. Visit your Static Web App URL
2. Test registration
3. Test login
4. Check browser console for errors
5. Verify API calls work

---

## 📊 Azure Services Used

| Service              | Purpose     | Free Tier               | Cost (Paid)         |
| -------------------- | ----------- | ----------------------- | ------------------- |
| App Service (Linux)  | Backend API | F1: 1GB RAM, 60 min/day | $13/month (B1)      |
| Static Web Apps      | Frontend    | 100GB bandwidth         | $9/month (Standard) |
| MongoDB Atlas        | Database    | 512MB storage           | External service    |
| Application Insights | Monitoring  | 5GB/month               | $2.30/GB            |

**Monthly Cost (Free Tier):** $0 with limitations  
**Monthly Cost (Production):** ~$22/month

---

## 🔒 Security Configuration

### 1. Enable HTTPS Only

```bash
az webapp update \
  --name belanjain-backend \
  --resource-group belanjain-rg \
  --https-only true
```

Or in Portal: Configuration → General settings → HTTPS Only: On

### 2. Configure Managed Identity (Advanced)

For secure access to Azure services without storing credentials.

### 3. Enable Application Insights

1. Create Application Insights resource
2. Get Instrumentation Key
3. Add to app settings:
   ```
   APPLICATIONINSIGHTS_CONNECTION_STRING=InstrumentationKey=...
   ```

---

## 📊 Monitoring & Logs

### View Application Logs

1. **Real-time Logs**

   - App Service → Monitoring → Log stream

2. **Application Insights**

   - App Service → Monitoring → Application Insights
   - View: Requests, Failures, Performance

3. **Download Logs**
   ```bash
   az webapp log download \
     --name belanjain-backend \
     --resource-group belanjain-rg
   ```

### Enable Detailed Logging

```bash
az webapp log config \
  --name belanjain-backend \
  --resource-group belanjain-rg \
  --application-logging filesystem \
  --level verbose
```

---

## 🔄 CI/CD with GitHub Actions

Azure automatically creates GitHub Actions workflow:

**`.github/workflows/azure-webapps-node.yml`**

```yaml
name: Deploy Node.js to Azure Web App

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: npm install and build
        run: |
          cd backend
          npm install

      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v2
        with:
          app-name: "belanjain-backend"
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: ./backend
```

**Automatic deployment** triggers on every push to main branch! ✅

---

## 🐛 Troubleshooting

### Issue: Application Error

**Check logs:**

```bash
az webapp log tail \
  --name belanjain-backend \
  --resource-group belanjain-rg
```

**Common causes:**

- MongoDB connection failed → Check MONGODB_URI
- Missing environment variables
- Startup command incorrect

### Issue: 502 Bad Gateway

**Solution:**

1. Check startup command is correct
2. Verify app listens on PORT from environment
3. Check Application Insights for errors

### Issue: Database Connection Timeout

**Solution:**

1. Verify MongoDB Atlas connection string
2. Check IP whitelist (should include 0.0.0.0/0)
3. Test connection locally first

### Issue: CORS Errors

**Solution:**

1. Update FRONTEND_URL in app settings
2. Restart app service
3. Clear browser cache

---

## 💰 Cost Optimization

### Free Tier Limitations

**App Service F1:**

- 60 CPU minutes/day
- 1 GB RAM
- 1 GB storage
- Shared compute
- No custom domain SSL

**When to upgrade to B1 ($13/month):**

- Need 24/7 uptime
- Higher traffic
- Custom domain with SSL
- Better performance

### Cost-Saving Tips

1. **Use Free Tier** for development
2. **Scale down** during low-traffic hours
3. **Use MongoDB Atlas Free Tier** instead of Cosmos DB
4. **Enable auto-shutdown** for dev environments

---

## 🚀 Scaling Your Application

### Vertical Scaling (More Resources)

```bash
# Upgrade to B1 tier
az appservice plan update \
  --name belanjain-plan \
  --resource-group belanjain-rg \
  --sku B1
```

### Horizontal Scaling (More Instances)

```bash
# Scale out to 2 instances
az appservice plan update \
  --name belanjain-plan \
  --resource-group belanjain-rg \
  --number-of-workers 2
```

### Auto-scaling (Premium tier)

Configure auto-scale rules based on:

- CPU percentage
- Memory percentage
- HTTP queue length
- Custom metrics

---

## 🔐 Environment Variables Reference

| Variable        | Development    | Production   | Required  |
| --------------- | -------------- | ------------ | --------- |
| `PORT`          | 5001           | Set by Azure | No (auto) |
| `MONGODB_URI`   | localhost      | Atlas URI    | Yes       |
| `NODE_ENV`      | development    | production   | Yes       |
| `JWT_SECRET`    | dev-key        | Strong key   | Yes       |
| `FRONTEND_URL`  | localhost:8080 | Azure URL    | Yes       |
| `WEBSITES_PORT` | -              | 8080         | Optional  |

---

## 📱 Custom Domain (Optional)

### Add Custom Domain

1. **Purchase domain** (GoDaddy, Namecheap, etc.)

2. **Add to Azure:**

   - App Service → Custom domains
   - Add custom domain
   - Follow validation steps

3. **Enable SSL:**
   - Automatic with managed certificate (free!)
   - Or upload your own certificate

```bash
# Add custom domain via CLI
az webapp config hostname add \
  --webapp-name belanjain-backend \
  --resource-group belanjain-rg \
  --hostname www.yourdomain.com
```

---

## ✅ Deployment Checklist

### Pre-deployment

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelist configured (0.0.0.0/0)
- [ ] Strong JWT_SECRET generated

### Backend Deployment

- [ ] App Service created
- [ ] GitHub connected
- [ ] Environment variables configured
- [ ] Startup command set
- [ ] Health check passing
- [ ] Logs verified

### Frontend Deployment

- [ ] Static Web App created
- [ ] VITE_API_URL configured
- [ ] Build completing successfully
- [ ] Can access frontend URL

### Post-deployment

- [ ] CORS configured with frontend URL
- [ ] Database seeded (optional)
- [ ] Test registration & login
- [ ] Test all major features
- [ ] Monitor logs for errors

---

## 🎯 Next Steps After Deployment

1. **Setup Monitoring**

   - Enable Application Insights
   - Configure alerts

2. **Performance Optimization**

   - Enable caching
   - Optimize database queries
   - Consider CDN for static assets

3. **Security Hardening**

   - Regular security updates
   - Implement rate limiting
   - Review access controls

4. **Backup Strategy**
   - MongoDB Atlas automatic backups
   - Export configuration periodically

---

## 📚 Additional Resources

- [Azure App Service Docs](https://docs.microsoft.com/azure/app-service/)
- [Azure Static Web Apps Docs](https://docs.microsoft.com/azure/static-web-apps/)
- [Node.js on Azure](https://docs.microsoft.com/azure/developer/javascript/)
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/)

---

## 🆘 Support

**Azure Support:**

- Free tier: Community support
- Paid plans: 24/7 technical support

**Documentation Issues:**
Check [backend/README.md](../backend/README.md) for API documentation

---

## 🎉 Congratulations!

Your Belanjain E-Commerce application is now deployed on **Microsoft Azure**!

**Your URLs:**

- Backend: `https://belanjain-backend.azurewebsites.net`
- Frontend: `https://belanjain-frontend.azurestaticapps.net`
- API: `https://belanjain-backend.azurewebsites.net/api`

---

**Last Updated:** January 26, 2026  
**Version:** 1.0.0  
**Status:** ✅ PRODUCTION READY
