# 🔐 Authentication & 📊 Monitoring Features

This document describes the new authentication and monitoring features added to Belanjain E-commerce application.

---

## 🔐 JWT Authentication

### Overview

The application now supports JWT-based authentication with the following features:

- User registration and login
- JWT token storage in localStorage
- Protected routes (optional)
- User profile display in header
- Logout functionality

### Backend Implementation

#### 1. User Model

Located at: `backend/models/User.js`

- Bcrypt password hashing
- Email validation
- Role-based access control (user/admin)

#### 2. Auth Endpoints

Base URL: `http://localhost:5001/api/auth`

**POST /register**

- Register a new user
- Request body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "user": {
        "id": "...",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

**POST /login**

- Login existing user
- Request body:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- Response: Same format as register

**GET /me** (Protected)

- Get current user information
- Requires: `Authorization: Bearer <token>` header
- Response:
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "...",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "user"
      }
    }
  }
  ```

**POST /logout** (Protected)

- Logout user (client-side token removal)
- Requires: `Authorization: Bearer <token>` header

#### 3. Middleware

Located at: `backend/middleware/auth.js`

- `protect`: Verify JWT token
- `authorize`: Check user roles

### Frontend Implementation

#### 1. AuthContext

Located at: `src/contexts/AuthContext.tsx`

Provides the following:

- `user`: Current user object
- `token`: JWT token
- `isAuthenticated`: Boolean authentication state
- `isLoading`: Loading state
- `login(email, password)`: Login function
- `register(name, email, password)`: Register function
- `logout()`: Logout function

Usage example:

```tsx
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (isAuthenticated) {
    return <div>Welcome, {user?.name}!</div>;
  }

  return <button onClick={() => login(email, password)}>Login</button>;
}
```

#### 2. Login & Register Pages

- `/login` - Login page
- `/register` - Registration page

Features:

- Modern gradient design
- Form validation
- Loading states
- Error handling
- Toast notifications

#### 3. Header Integration

The header now shows:

- **Not authenticated**: Login button
- **Authenticated**: User dropdown menu with:
  - User name and email
  - My Orders link
  - My Wishlist link
  - Logout button

### Environment Variables

Add to `backend/.env`:

```bash
JWT_SECRET=belanjain-secret-key-change-this-in-production
```

**⚠️ IMPORTANT**: Change the JWT_SECRET in production!

---

## 📊 Google Analytics Monitoring

### Overview

Google Analytics 4 (GA4) is integrated to monitor user activity across the application.

### Features Tracked

#### 1. Page Views

- Automatically tracked on every route change
- Includes page path and title

#### 2. E-commerce Events

- `view_item`: When viewing product details
- `add_to_cart`: When adding items to cart
- `remove_from_cart`: When removing items from cart
- `purchase`: When completing a purchase

#### 3. User Authentication

- `login`: When user logs in
- `sign_up`: When user registers

#### 4. Search

- `search`: When user searches for products

### Setup Instructions

#### 1. Get Google Analytics Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property (if you don't have one)
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)
4. Copy the Measurement ID

#### 2. Update the Application

Open `src/App.tsx` and replace the placeholder:

```typescript
// Replace this line:
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // TODO: Replace with actual measurement ID

// With your actual Measurement ID:
const GA_MEASUREMENT_ID = "G-ABC123DEF4"; // Your real GA Measurement ID
```

#### 3. Verify Installation

1. Start your application
2. Open browser DevTools → Console
3. You should see: `Google Analytics initialized successfully`
4. Visit different pages and perform actions
5. Check Google Analytics dashboard (Real-time reports) to see events

### Analytics Functions

Located at: `src/lib/analytics.ts`

Available functions:

```typescript
// Page tracking
trackPageView(path: string, title?: string)

// E-commerce tracking
trackViewItem(item: { item_id, item_name, price })
trackAddToCart(item: { item_id, item_name, price, quantity })
trackRemoveFromCart(item: { item_id, item_name, price, quantity })
trackPurchase(transactionId: string, value: number, items: any[])

// User actions
trackLogin(method: string)
trackSignUp(method: string)
trackSearch(searchTerm: string)

// Custom events
trackEvent(category: string, action: string, label?: string, value?: number)
```

### Usage Examples

#### Track Product View

```typescript
import { trackViewItem } from "@/lib/analytics";

// When user views a product
trackViewItem({
  item_id: product.id,
  item_name: product.name,
  price: product.price,
});
```

#### Track Add to Cart

```typescript
import { trackAddToCart } from "@/lib/analytics";

// When user adds item to cart
trackAddToCart({
  item_id: product.id,
  item_name: product.name,
  price: product.price,
  quantity: 1,
});
```

#### Track Custom Event

```typescript
import { trackEvent } from "@/lib/analytics";

// Track any custom event
trackEvent("User", "Click", "Newsletter Subscribe");
```

### Hook: usePageTracking

Located at: `src/hooks/usePageTracking.ts`

This hook is automatically used in `App.tsx` to track all page views. You don't need to manually implement it elsewhere.

---

## 🚀 Testing the Features

### Test Authentication

1. **Start the backend:**

   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend:**

   ```bash
   npm run dev
   ```

3. **Register a new user:**

   - Navigate to `http://localhost:8080/register`
   - Fill in the form and submit
   - You should be automatically logged in

4. **Test login:**

   - Click logout from the user dropdown
   - Navigate to `/login`
   - Login with your credentials

5. **Check localStorage:**
   - Open DevTools → Application → Local Storage
   - You should see `token` and `user` entries

### Test Monitoring

1. **Setup Google Analytics** (follow setup instructions above)

2. **Navigate through the app:**

   - Visit different pages
   - Click on products
   - Add items to cart
   - Login/Register

3. **Check Google Analytics:**
   - Go to GA Dashboard → Reports → Realtime
   - You should see your events appearing live

---

## 🔒 Security Best Practices

1. **Change JWT_SECRET** in production
2. **Use HTTPS** in production
3. **Set appropriate CORS** settings in production
4. **Implement rate limiting** for auth endpoints
5. **Add password strength requirements**
6. **Implement refresh tokens** for better security

---

## 📝 Future Enhancements

### Authentication

- [ ] Email verification
- [ ] Password reset functionality
- [ ] OAuth integration (Google, Facebook)
- [ ] Two-factor authentication
- [ ] Remember me functionality
- [ ] Session management

### Monitoring

- [ ] Custom dashboards
- [ ] Conversion funnel tracking
- [ ] User journey analysis
- [ ] A/B testing integration
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring

---

## 🐛 Troubleshooting

### Authentication Issues

**Token not saving:**

- Check browser console for errors
- Verify localStorage is enabled
- Check API response format

**Authentication fails:**

- Verify backend is running
- Check MongoDB connection
- Verify JWT_SECRET is set

### Analytics Issues

**Events not showing:**

- Verify GA Measurement ID is correct
- Check browser console for GA errors
- Ensure GA initialization is successful
- Check if ad blocker is blocking GA

**Page views not tracked:**

- Verify `usePageTracking` hook is used
- Check browser console for errors
- Test in incognito mode (ad blockers disabled)

---

## 📚 Additional Resources

- [JWT.io](https://jwt.io/) - JWT debugger
- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [React GA4 Documentation](https://github.com/codler/react-ga4)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

## 👨‍💻 Development Team

**Developed by:** Belanjain Team  
**Last Updated:** 2026-01-26  
**Version:** 1.0.0

---

## ✅ Assignment Checklist

### Autentikasi (JWT) - Bobot 35%

- [x] Halaman Login pada frontend
- [x] Halaman Registrasi pada frontend
- [x] Backend untuk verifikasi pengguna
- [x] Simpan token JWT di localStorage
- [x] Integrasi dengan UI (Header dengan user info)

### Monitoring - Bobot 35%

- [x] Integrasi Google Analytics
- [x] Tracking page views otomatis
- [x] Tracking user authentication events
- [x] Tracking e-commerce events (add to cart, purchases, dll)
- [x] Dokumentasi lengkap

---

🎉 **All features successfully implemented!**
