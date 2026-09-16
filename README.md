# SecureStay Real Estates

> **Verified Luxury Residences & Prime Commercial Estates**  
> A production-grade real estate web application built with React, Node.js, Express.js, and MongoDB.

---

## 🏛️ Architecture & Highlights

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Vite
- **Typography**: Google Fonts **Urbanist** (headings) & **Epilogue** (body text)
- **Palette**: Deep Forest Green (`#0A2A1D`), Muted Sage Green (`#4A6B5D` / `#E4ECE7`), Warm Ivory (`#FDFBF7`), Soft Beige (`#F4EFE6`), Charcoal (`#1A1E1C`), Subtle Gold accents (`#C5A880`)
- **Design Philosophy**: Max 8px border radius, high-resolution architectural photography, clean 2D animations, zero 3D overhead
- **Backend**: Node.js, Express.js, MongoDB + Mongoose, JWT Authentication, bcryptjs password hashing, Multer image storage, CORS

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0 or higher
- **npm** or **yarn** / **pnpm**
- **MongoDB**: Local MongoDB community instance running at `mongodb://127.0.0.1:27017` or MongoDB Atlas URI (The backend automatically seeds verified Indian property listings on first boot and includes a graceful in-memory fallback).

---

### 2. Backend Setup (`server/`)

```bash
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

#### Environment Configuration (`server/.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/securestay_db
JWT_SECRET=securestay_jwt_super_secret_production_key_2026
CLIENT_ORIGIN=http://localhost:5173

# Optional Social OAuth credentials
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
```

#### Start Backend Server
```bash
# Start backend API (runs on port 5000)
npm start

# Or in development mode with nodemon
npm run dev
```

---

### 3. Frontend Setup (Root Directory)

```bash
# In the project root directory
npm install

# Start Vite dev server
npm run dev
```

The frontend will start at **`http://localhost:5173`** and immediately connect to the backend REST API at **`http://localhost:5000/api`**.

---

## 🧪 Testing the End-to-End Flows

### Built-in Automated API Test Suite
Run the automated test script to verify all REST endpoints, user registration, JWT authentication, property search, enquiries, and appointment scheduling:

```bash
node scratch/testApi.js
```

### Manual Testing Guide

1. **Homepage Experience**:
   - Verify the 14 sections in order: Hero Search, Trust Statistics, Featured Properties, Explore by Location, Property Collections, Why SecureStay, How It Works, Premium Property Showcase, Recently Added, Market Insights, EMI / Mortgage Calculator, Our Services, Testimonials, Final Enquiry CTA.
2. **Property Search & Filter**:
   - Filter by City (e.g. *Bengaluru*), Type (*Villa*), Price, and Bedrooms.
   - Observe how query parameters synchronize with URL (`/search?city=Bengaluru&intent=buy`).
3. **Authentication & Roles**:
   - Click **Sign In** and use One-Click Demo Access (**Demo Buyer** or **Demo Agent**), or create a new account with email/password.
   - Switch between **Buyer** and **Agent** roles directly in the profile dropdown.
4. **Property Details & Interactive Tools**:
   - Open any property (e.g. *The Grand Oak Sanctuary Villa*).
   - Test the image gallery, interactive floor plans, interactive EMI mortgage calculator, and schedule a private viewing.
5. **Saved Properties**:
   - Click the heart icon on any property card to save/unsave; verify persistence under **Saved Properties**.
6. **Agent Portal**:
   - Switch to Agent mode and visit **Agent Portal** (`/agent-dashboard`) to manage listings, publish new properties, inspect leads, and confirm viewing appointments.

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/health` | Server health check | No |
| `POST` | `/api/auth/register` | Register new account | No |
| `POST` | `/api/auth/login` | Email/password login | No |
| `POST` | `/api/auth/social` | Google / Facebook OAuth login | No |
| `GET` | `/api/auth/me` | Get current authenticated user | Yes |
| `GET` | `/api/properties` | List properties with query filters | No |
| `GET` | `/api/properties/:id` | Get property by ID or slug | No |
| `POST` | `/api/properties` | Publish new property | Yes (Agent) |
| `PUT` | `/api/properties/:id` | Update property listing | Yes (Agent) |
| `DELETE` | `/api/properties/:id`| Remove property listing | Yes (Agent) |
| `POST` | `/api/enquiries` | Submit client property inquiry | No / Optional |
| `GET` | `/api/enquiries` | View inquiries (filtered by role) | Yes |
| `PATCH` | `/api/enquiries/:id/status` | Update inquiry status | Yes (Agent) |
| `POST` | `/api/appointments` | Book private viewing | No / Optional |
| `GET` | `/api/appointments` | View appointments | Yes |
| `PATCH` | `/api/appointments/:id/status` | Update appointment status | Yes (Agent) |
| `GET` | `/api/locations` | Regional property hubs | No |
| `GET` | `/api/saved` | Get user saved collection | Yes |
| `POST` | `/api/saved/:propertyId` | Save property | Yes |
| `DELETE` | `/api/saved/:propertyId` | Remove saved property | Yes |
| `POST` | `/api/upload` | Upload property photos (Multer) | Yes (Agent) |

---

## 📦 Production Build & Deployment

### Production Build
```bash
# Build optimized frontend bundle
npm run build
```

### Deployment Options
- **Frontend**: Deploy `dist/` directory to Vercel, Netlify, Cloudflare Pages, or AWS S3 + CloudFront. Set `VITE_API_URL` to your production backend API domain.
- **Backend**: Deploy `server/` to Render, Railway, AWS ECS/EC2, or DigitalOcean with Node.js runtime and connected MongoDB Atlas cluster.
