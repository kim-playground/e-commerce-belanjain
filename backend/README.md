# Belanjain Backend API

Backend REST API untuk aplikasi e-commerce Belanjain, dibangun dengan Node.js, Express, dan MongoDB.

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Middleware:** CORS, Morgan (logging)

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   └── productController.js  # Business logic
├── models/
│   └── Product.js         # MongoDB schema
├── routes/
│   └── products.js        # API routes
├── middleware/            # Custom middleware (future)
├── server.js              # Entry point
├── seed.js                # Database seeder
├── .env                   # Environment variables
└── package.json
```

## 🔧 Setup & Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Edit `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/belanjain
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
```

### 3. Install MongoDB

**Option A: MongoDB Local (Mac)**

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Option B: MongoDB Atlas (Cloud - Recommended)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`

### 4. Seed Database

```bash
npm run seed
```

### 5. Start Server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

Server will run on: **http://localhost:5000**

## 📡 API Endpoints

### Base URL

```
http://localhost:5000/api
```

### Health Check

```http
GET /api/health
```

### Products

#### Get All Products

```http
GET /api/products
```

**Query Parameters:**

- `category` - Filter by category
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `search` - Search in name/description
- `featured` - Filter featured products (true/false)
- `sort` - Sort by: price_asc, price_desc, name

**Example:**

```http
GET /api/products?category=Electronics&sort=price_asc
```

#### Get Single Product

```http
GET /api/products/:id
```

#### Create Product

```http
POST /api/products
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 299000,
  "category": "Electronics",
  "image_url": "https://example.com/image.jpg",
  "stock": 50,
  "rating": 4.5,
  "reviews_count": 100,
  "is_featured": true,
  "tags": ["tag1", "tag2"]
}
```

#### Update Product

```http
PUT /api/products/:id
Content-Type: application/json

{
  "price": 349000,
  "stock": 45
}
```

#### Delete Product

```http
DELETE /api/products/:id
```

#### Get Categories

```http
GET /api/products/categories
```

## 📦 Response Format

### Success Response

```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (development only)"
}
```

## 🧪 Testing API

### Using cURL

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

### Using Postman

1. Import collection (coming soon)
2. Set base URL: `http://localhost:5000/api`
3. Test endpoints

## 🗄️ Database Schema

### Product Model

```javascript
{
  name: String (required, max 200 chars),
  description: String (required, max 2000 chars),
  price: Number (required, min 0),
  category: String (required, enum),
  image_url: String (required),
  stock: Number (required, min 0),
  rating: Number (0-5),
  reviews_count: Number,
  is_featured: Boolean,
  tags: [String],
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Categories

- Electronics
- Clothing
- Home & Garden
- Sports
- Books
- Other

## 🔐 Security Notes

⚠️ **Current Implementation:**

- No authentication (for development)
- All endpoints are public
- CORS enabled for frontend

🔒 **Production Recommendations:**

- Add JWT authentication
- Implement role-based access control (Admin/User)
- Add rate limiting
- Enable HTTPS
- Validate and sanitize inputs
- Add request logging

## 🐛 Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:** Make sure MongoDB is running

```bash
brew services start mongodb-community
```

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:** Change PORT in `.env` or kill process

```bash
lsof -ti:5000 | xargs kill -9
```

## 📝 Scripts

```bash
npm start        # Start server
npm run dev      # Start with nodemon (auto-reload)
npm run seed     # Seed database with sample data
```

## 🚀 Next Steps

- [ ] Add Order API endpoints
- [ ] Implement authentication
- [ ] Add image upload functionality
- [ ] Add pagination
- [ ] Add caching (Redis)
- [ ] Write unit tests
- [ ] Add API documentation (Swagger)

## 📄 License

MIT
