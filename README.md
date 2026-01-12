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

### Technical Features

- ✅ RESTful API
- ✅ MongoDB database dengan Mongoose ODM
- ✅ TypeScript untuk type safety
- ✅ Modern UI dengan shadcn/ui components
- ✅ Optimized performance dengan React Query caching

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

   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:8080
   ```

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

### Frontend (Vercel/Netlify)

1. Build frontend:

   ```bash
   npm run build
   ```

2. Deploy `dist/` folder

### Backend (Railway/Render/Heroku)

1. Set environment variables
2. Deploy from `backend/` folder
3. Update frontend API URL

### Database (MongoDB Atlas)

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

- [Backend API Documentation](backend/README.md)
- [MongoDB Setup Guide](backend/MONGODB_SETUP.md)
- [Database Setup](DATABASE_SETUP.md)

---

## 🔐 Security Notes

⚠️ **Current Implementation (Development):**

- No authentication
- All API endpoints are public
- CORS enabled for localhost

🔒 **Production Recommendations:**

- Add JWT authentication
- Implement role-based access control
- Add rate limiting
- Enable HTTPS
- Validate and sanitize all inputs
- Add request logging and monitoring

---

## 🎯 Future Enhancements

- [ ] User authentication & authorization
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Product reviews & ratings (user-generated)
- [ ] Admin dashboard analytics
- [ ] Image upload functionality
- [ ] Real-time order tracking
- [ ] Multi-language support
- [ ] Dark mode
- [ ] PWA support

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
