# 🛍️ Belanjain - E-Commerce Platform

Platform e-commerce modern yang dibangun dengan **React** (frontend) dan **Node.js + Express + MongoDB** (backend).

![Belanjain Logo](public/favicon.png)

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Development](#-development)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)

---

## 🚀 Tech Stack

### Frontend

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** React Query (TanStack Query)
- **Routing:** React Router v6
- **Form Handling:** React Hook Form + Zod

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Middleware:** CORS, Morgan

---

## ✨ Features

### User Features

- ✅ **Authentication & Authorization (JWT)**
  - User registration with email validation
  - Secure login with password encryption (bcrypt)
  - JWT token storage in localStorage
  - User profile in header
  - Protected routes support
- ✅ Browse products dengan filtering & sorting
- ✅ Product detail dengan reviews & ratings
- ✅ Shopping cart dengan localStorage persistence
- ✅ Wishlist functionality
- ✅ Product comparison
- ✅ Checkout process
- ✅ Order tracking
- ✅ Responsive design (mobile-friendly)

### Admin Features

- ✅ Product management (CRUD)
- ✅ Order management
- ✅ Dashboard analytics

### Monitoring & Analytics

- ✅ **Google Analytics 4 Integration**
  - Automatic page view tracking
  - E-commerce event tracking (add to cart, purchases)
  - User authentication tracking (login, sign up)
  - Custom event tracking
  - Search tracking

### Technical Features

- ✅ RESTful API
- ✅ **JWT Authentication** dengan bcrypt password hashing
- ✅ MongoDB database dengan Mongoose ODM
- ✅ TypeScript untuk type safety
- ✅ Modern UI dengan shadcn/ui components
- ✅ Optimized performance dengan React Query caching
- ✅ **Google Analytics monitoring** untuk user activity

---

## 📁 Project Structure

```
e-commerce-blueprint/
├── backend/                 # Node.js + Express API
│   ├── config/             # Database configuration
│   ├── controllers/        # Business logic
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── server.js           # Entry point
│   ├── seed.js             # Database seeder
│   └── README.md           # Backend documentation
│
├── src/                    # React frontend
│   ├── components/         # Reusable components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities
│   └── integrations/       # API integrations
│
├── public/                 # Static assets
├── package.json            # Root package.json
└── README.md              # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ dan npm
- MongoDB (local atau MongoDB Atlas account)
- Git

### Installation

1. **Clone Repository**

   ```bash
   git clone <repository-url>
   cd e-commerce-belanjain
   ```

2. **Install Frontend Dependencies**

   ```bash
   npm install
   ```

3. **Install Backend Dependencies**

   ```bash
   npm run backend:install
   # atau
   cd backend && npm install
   ```

4. **Setup MongoDB**

   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community
   ```

5. **Configure Environment Variables**

   **Backend** (`backend/.env`):

   ```env
   MONGODB_URI=mongodb://localhost:27017/belanjain
   # atau MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/belanjain

   PORT=5001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:8080
   JWT_SECRET=belanjain-secret-key-change-this-in-production
   ```

   ⚠️ **IMPORTANT**: Change `JWT_SECRET` in production!

6. **Seed Database**

   ```bash
   npm run backend:seed
   ```

   Expected output:

   ```
   ✅ Connected to MongoDB
   ✅ Inserted 8 products
   🎉 Database seeded successfully!
   ```

7. **Start Development Servers**

   **Option A: Run Both (Frontend + Backend)**

   ```bash
   npm run dev:all
   ```

   **Option B: Run Separately**

   ```bash
   # Terminal 1 - Frontend
   npm run dev

   # Terminal 2 - Backend
   npm run dev:backend
   ```

8. **Open Application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:5000/api

---

## 💻 Development

### Available Scripts

#### Root Scripts

```bash
npm run dev              # Start frontend only
npm run dev:backend      # Start backend only
npm run dev:all          # Start both frontend & backend
npm run build            # Build frontend for production
npm run backend:seed     # Seed database
npm run backend:install  # Install backend dependencies
```

#### Backend Scripts (from backend/)

```bash
npm start               # Start backend (production)
npm run dev             # Start backend with nodemon
npm run seed            # Seed database
```

### Project URLs

| Service      | URL                              | Description       |
| ------------ | -------------------------------- | ----------------- |
| Frontend     | http://localhost:8080            | React application |
| Backend API  | http://localhost:5000/api        | REST API          |
| Health Check | http://localhost:5000/api/health | API status        |

---

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### Authentication (NEW 🔐)

| Method | Endpoint         | Description           | Auth Required |
| ------ | ---------------- | --------------------- | ------------- |
| POST   | `/auth/register` | Register new user     | No            |
| POST   | `/auth/login`    | Login user            | No            |
| GET    | `/auth/me`       | Get current user info | Yes           |
| POST   | `/auth/logout`   | Logout user           | Yes           |

**Example Register:**

```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Example Login:**

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Protected Routes:**
Include JWT token in Authorization header:

```bash
GET /api/auth/me
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

#### Products

| Method | Endpoint               | Description        |
| ------ | ---------------------- | ------------------ |
| GET    | `/products`            | Get all products   |
| GET    | `/products/:id`        | Get single product |
| POST   | `/products`            | Create product     |
| PUT    | `/products/:id`        | Update product     |
| DELETE | `/products/:id`        | Delete product     |
| GET    | `/products/categories` | Get categories     |

#### Query Parameters (GET /products)

- `category` - Filter by category
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `search` - Search query
- `featured` - Filter featured (true/false)
- `sort` - Sort by (price_asc, price_desc, name)

**Example:**

```bash
GET /api/products?category=Electronics&sort=price_asc
```

### Response Format

**Success:**

```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

**Error:**

```json
{
  "success": false,
  "message": "Error message"
}
```

### Google Analytics Setup 📊

1. Get your Google Analytics 4 Measurement ID from [Google Analytics](https://analytics.google.com/)
2. Open `src/App.tsx`
3. Replace `G-XXXXXXXXXX` with your actual Measurement ID

For detailed instructions, see [AUTHENTICATION_MONITORING.md](AUTHENTICATION_MONITORING.md)

For detailed API documentation, see [backend/README.md](backend/README.md)

---

## 🧪 Testing

### Test API with cURL

```bash
# Get all products
curl http://localhost:5000/api/products

# Get single product
curl http://localhost:5000/api/products/[PRODUCT_ID]

# Create product
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "Test description",
    "price": 100000,
    "category": "Electronics",
    "image_url": "https://example.com/image.jpg",
    "stock": 10
  }'
```

### Test Frontend

1. Open http://localhost:8080
2. Browse products
3. Add to cart
4. Checkout
5. Track order

---

## 📦 Database Schema

### Product Model

```javascript
{
  name: String,           // required
  description: String,    // required
  price: Number,          // required, min: 0
  category: String,       // required, enum
  image_url: String,      // required
  stock: Number,          // required, min: 0
  rating: Number,         // 0-5
  reviews_count: Number,
  is_featured: Boolean,
  tags: [String],
  createdAt: Date,        // auto
  updatedAt: Date         // auto
}
```

### Categories

- Electronics
- Clothing
- Home & Garden
- Sports
- Books
- Other

---

## 🚀 Deployment

**📖 Complete Deployment Guide Available!**

See **[DEPLOYMENT_RENDER.md](DEPLOYMENT_RENDER.md)** for comprehensive step-by-step deployment instructions including:

- MongoDB Atlas setup
- Render backend deployment
- Netlify/Vercel frontend deployment
- Environment variable configuration
- CORS setup
- Troubleshooting guide

### Quick Deployment Summary

#### Backend (Render) - **Optimized for Dynamic Ports** ✅

1. **Configure Environment Variables in Render:**

   ```
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/belanjain
   NODE_ENV=production
   JWT_SECRET=your-super-secret-random-string
   FRONTEND_URL=https://your-frontend.netlify.app
   ```

   Note: `PORT` is automatically provided by Render - don't set it manually!

2. **Build & Start Commands:**

   ```
   Build: cd backend && npm install
   Start: cd backend && npm start
   ```

3. **Server Configuration:**
   - ✅ Automatically binds to `0.0.0.0` for cloud deployment
   - ✅ Uses `process.env.PORT` for dynamic port assignment
   - ✅ Fallback to port 5001 for local development

#### Frontend (Netlify/Vercel)

1. **Add Environment Variable:**

   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```

2. **Build Command:**

   ```bash
   npm run build
   ```

3. **Publish Directory:** `dist/`

#### Database (MongoDB Atlas)

Already cloud-hosted if using Atlas!

---

## 🐛 Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED
```

**Solution:**

- Check if MongoDB is running: `brew services list`
- Or check MongoDB Atlas connection string

### Port Already in Use

```
Error: EADDRINUSE :::5000
```

**Solution:**

```bash
lsof -ti:5000 | xargs kill -9
```

### Frontend Can't Connect to Backend

**Solution:**

- Make sure backend is running on port 5000
- Check CORS configuration in `backend/server.js`

---

## 📚 Documentation

- **[Authentication & Monitoring Guide](AUTHENTICATION_MONITORING.md)** ⭐ NEW
- **[Render Deployment Guide](DEPLOYMENT_RENDER.md)** 🚀 NEW
- **[Deployment Ready Status](RENDER_READY.md)** ✅ NEW
- [Backend API Documentation](backend/README.md)
- [MongoDB Setup Guide](backend/MONGODB_SETUP.md)
- [Database Setup](DATABASE_SETUP.md)

---

## 🔐 Security Notes

✅ **Current Implementation:**

- ✅ JWT authentication with bcrypt password hashing
- ✅ Protected routes with middleware
- ✅ Token-based authorization
- ✅ CORS enabled for localhost
- ✅ User activity monitoring with Google Analytics

⚠️ **Development Mode:**

- Some API endpoints are still public
- JWT_SECRET uses development value

🔒 **Production Recommendations:**

- ✅ Change JWT_SECRET to a strong, random value
- [ ] Implement role-based access control for all admin endpoints
- [ ] Add rate limiting for authentication endpoints
- [ ] Enable HTTPS only
- [ ] Validate and sanitize all inputs
- [ ] Add request logging and monitoring
- [ ] Implement refresh tokens
- [ ] Add email verification for registration
- [ ] Set up proper CORS for production domain

See [AUTHENTICATION_MONITORING.md](AUTHENTICATION_MONITORING.md) for detailed security best practices.

---

## 🎯 Future Enhancements

- [x] User authentication & authorization (JWT) ✅
- [x] User activity monitoring (Google Analytics) ✅
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Product reviews & ratings (user-generated)
- [ ] Admin dashboard analytics
- [ ] Image upload functionality
- [ ] Real-time order tracking
- [ ] Multi-language support
- [ ] Dark mode
- [ ] PWA support
- [ ] Password reset functionality
- [ ] Email verification
- [ ] OAuth integration (Google, Facebook)
- [ ] Two-factor authentication

---

## 👥 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

---

## 🙏 Acknowledgments

- UI Components: [shadcn/ui](https://ui.shadcn.com/)
- Icons: [Lucide Icons](https://lucide.dev/)
- Images: [Unsplash](https://unsplash.com/)

---

**Made with ❤️ for learning purposes**

For questions or issues, please open an issue on GitHub.
