# UET Rides Project — Complete Architecture Map

**Last Updated**: May 24, 2026  
**Project Type**: Full-Stack React + Node.js Campus Ride-Sharing Application  
**Status**: Active Development

---

## 📋 Quick Navigation

- [Project Overview](#project-overview)
- [Folder Structure](#folder-structure)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Data Flow](#data-flow)
- [Key Files Reference](#key-files-reference)
- [Component Dependency Graph](#component-dependency-graph)
- [Database Models](#database-models)
- [API Endpoints](#api-endpoints)
- [Development Workflow](#development-workflow)

---

## 🎯 Project Overview

**UET Rides** is a campus ride-sharing platform exclusively for the University of Engineering & Technology (UET), Lahore. It connects students and faculty who need rides with verified student drivers.

### Key Features
- **Campus-Only Safety**: Rides restricted to UET Lahore boundaries
- **Student-Verified Drivers**: All drivers are verified UET members
- **Affordable Fares**: Peer-to-peer pricing model
- **Real-Time Tracking**: Live GPS tracking (coming soon)
- **24/7 Availability**: Always operational
- **Eco-Friendly**: Carpooling to reduce emissions

### Tech Stack
- **Frontend**: React 18.3.1 + React Router 6.26.2 + Tailwind CSS 3.4.11 + Vite 5.4.2
- **Backend**: Node.js + Express 4.19.2 + MongoDB (Mongoose 8.5.1)
- **Real-Time**: Socket.io 4.7.5
- **Maps**: Leaflet 1.9.4 + React-Leaflet 4.2.1
- **Authentication**: JWT (jsonwebtoken 9.0.2) + bcryptjs 2.4.3
- **Email**: Nodemailer 6.9.14

---

## 📁 Folder Structure

```
uet-rides-homepage/
├── .kiro/                          # Kiro spec & configuration
│   └── specs/
│       └── uet-rides-homepage/     # Feature spec files
│           ├── requirements.md     # User stories & acceptance criteria
│           ├── design.md           # Technical architecture & design
│           └── tasks.md            # Implementation task list
│
├── backend/                        # Node.js Express API server
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication middleware
│   ├── models/                     # MongoDB Mongoose schemas
│   │   ├── User.js                 # User profile model
│   │   ├── Ride.js                 # Ride request model
│   │   ├── Review.js               # Review/rating model
│   │   └── Ticket.js               # Support ticket model
│   ├── routes/                     # API route handlers (closed folder)
│   ├── utils/
│   │   └── email.js                # Email sending utility (Nodemailer)
│   ├── server.js                   # Express app entry point
│   ├── package.json                # Backend dependencies
│   ├── .env                        # Environment variables (local)
│   ├── .env.example                # Environment template
│   └── README.md                   # Backend documentation
│
├── src/                            # React frontend source
│   ├── components/                 # Reusable React components
│   │   ├── Navbar.jsx              # Top navigation bar with auth
│   │   ├── Hero.jsx                # Hero section with weather & CTAs
│   │   ├── HowItWorks.jsx           # 3-step process section
│   │   ├── Features.jsx             # 6 feature cards grid
│   │   ├── Stats.jsx                # Social proof stats bar
│   │   ├── Testimonials.jsx         # Student testimonials carousel
│   │   ├── Footer.jsx               # Site footer with links
│   │   ├── AnnouncementBar.jsx      # Top announcement banner
│   │   └── CampusMap.jsx            # Leaflet map component
│   │
│   ├── pages/                      # Full-page components (routes)
│   │   ├── LoginPage.jsx            # User login form
│   │   ├── SignupPage.jsx           # User registration form
│   │   ├── ForgotPasswordPage.jsx   # Password reset flow
│   │   ├── AccountPage.jsx          # User profile & settings
│   │   ├── BookRidePage.jsx         # Ride booking interface
│   │   ├── OfferRidePage.jsx        # Offer a ride form
│   │   ├── RideTrackingPage.jsx     # Live ride tracking
│   │   ├── HelpPage.jsx             # Help & support center
│   │   ├── FaqPage.jsx              # FAQ section
│   │   ├── SafetyPage.jsx           # Safety guidelines
│   │   ├── HowItWorksPage.jsx       # Detailed how-it-works
│   │   ├── WhyChooseUs.jsx          # Why UET Rides page
│   │   ├── OfferingsPage.jsx        # Services overview
│   │   ├── SwitchToDriverPage.jsx   # Become a driver flow
│   │   ├── AdminLogin.jsx           # Admin authentication
│   │   └── AdminDashboard.jsx       # Admin control panel
│   │
│   ├── context/
│   │   └── AuthContext.jsx          # Global auth state (user, login, logout)
│   │
│   ├── constants/
│   │   └── data.js                  # Hardcoded content (nav, features, testimonials)
│   │
│   ├── App.jsx                      # Root app component with routing
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Global styles & CSS variables
│
├── public/
│   └── logo.png                    # UET Rides logo
│
├── db.json                         # JSON Server mock database (dev)
├── index.html                      # HTML entry point
├── package.json                    # Frontend dependencies
├── package-lock.json               # Dependency lock file
├── vite.config.js                  # Vite build configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── .gitignore                      # Git ignore rules
└── README.md                       # Project documentation
```

---

## 🎨 Frontend Architecture

### Entry Point Flow

```
index.html
    ↓
main.jsx (React root)
    ↓
App.jsx (Router setup + AuthProvider)
    ↓
BrowserRouter (React Router v6)
    ├── Routes (page components)
    └── AuthProvider (global auth context)
```

### Component Hierarchy

```
App.jsx
├── ScrollToTop (utility)
├── Navbar.jsx
│   ├── Logo + Brand
│   ├── Desktop Nav Links (from data.js)
│   ├── About Us Dropdown
│   ├── Auth Buttons (Login/Signup or Logout)
│   └── Mobile Hamburger Menu
│
├── AnnouncementBar.jsx
│
├── Routes (Page Components)
│   ├── HomePage (/)
│   │   ├── Hero.jsx
│   │   │   ├── Weather Badge (live API)
│   │   │   ├── Headline + Subtext
│   │   │   ├── CTA Buttons (Book/Offer)
│   │   │   ├── CampusMap.jsx (Leaflet)
│   │   │   └── Trust Indicators
│   │   ├── Stats.jsx
│   │   └── Testimonials.jsx
│   │
│   ├── LoginPage (/login)
│   ├── SignupPage (/signup)
│   ├── ForgotPasswordPage (/forgot-password)
│   ├── AccountPage (/account)
│   ├── BookRidePage (/book-ride)
│   ├── OfferRidePage (/offer-ride)
│   ├── RideTrackingPage (/ride-tracking/:rideId)
│   ├── HelpPage (/help)
│   ├── FaqPage (/faqs)
│   ├── SafetyPage (/safety)
│   ├── HowItWorksPage (/how-it-works)
│   ├── WhyChooseUs (/why-choose-us)
│   ├── OfferingsPage (/our-offerings)
│   ├── SwitchToDriverPage (/become-driver)
│   ├── AdminLogin (/admin-login)
│   └── AdminDashboard (/admin)
│
└── Footer.jsx
    ├── Brand Column
    ├── Navigation Links
    ├── Contact Info
    └── Social Media Icons
```

### Key Frontend Files

| File | Purpose | Dependencies |
|------|---------|--------------|
| `src/App.jsx` | Root component, routing setup | React Router, AuthContext |
| `src/main.jsx` | React entry point | React, ReactDOM |
| `src/index.css` | Global styles, CSS variables | Tailwind CSS |
| `src/constants/data.js` | Hardcoded content (nav, features, testimonials, stats) | None |
| `src/context/AuthContext.jsx` | Global auth state management | React Context API |
| `src/components/Navbar.jsx` | Navigation bar with mobile menu | React Router, AuthContext |
| `src/components/Hero.jsx` | Hero section with weather API | Leaflet, Open-Meteo API |
| `src/components/Features.jsx` | Feature cards grid | data.js |
| `src/components/Stats.jsx` | Social proof stats | data.js |
| `src/components/Testimonials.jsx` | Student testimonials | data.js |
| `src/components/Footer.jsx` | Site footer | React Router, data.js |
| `src/components/CampusMap.jsx` | Interactive campus map | Leaflet, React-Leaflet |

---

## 🔧 Backend Architecture

### Server Entry Point

```
backend/server.js
    ↓
Express App Setup
    ├── Middleware (CORS, JSON parsing, auth)
    ├── Routes (API endpoints)
    ├── MongoDB Connection (Mongoose)
    └── Socket.io Setup (real-time)
```

### Database Models

```
MongoDB Collections:
├── users
│   ├── _id (ObjectId)
│   ├── name (String)
│   ├── email (String, unique)
│   ├── password (String, hashed)
│   ├── studentId (String, unique)
│   ├── phone (String)
│   ├── role (String: "rider" | "driver" | "admin")
│   ├── profilePicture (String, URL)
│   ├── rating (Number, 1-5)
│   ├── reviewCount (Number)
│   ├── isVerified (Boolean)
│   ├── createdAt (Date)
│   └── updatedAt (Date)
│
├── rides
│   ├── _id (ObjectId)
│   ├── riderId (ObjectId, ref: User)
│   ├── driverId (ObjectId, ref: User)
│   ├── pickupLocation (Object: {lat, lng, address})
│   ├── dropoffLocation (Object: {lat, lng, address})
│   ├── status (String: "requested" | "accepted" | "in_progress" | "completed" | "cancelled")
│   ├── fare (Number)
│   ├── distance (Number, km)
│   ├── duration (Number, minutes)
│   ├── scheduledTime (Date)
│   ├── startTime (Date)
│   ├── endTime (Date)
│   ├── passengers (Number)
│   ├── notes (String)
│   ├── createdAt (Date)
│   └── updatedAt (Date)
│
├── reviews
│   ├── _id (ObjectId)
│   ├── rideId (ObjectId, ref: Ride)
│   ├── reviewerId (ObjectId, ref: User)
│   ├── revieweeId (ObjectId, ref: User)
│   ├── rating (Number, 1-5)
│   ├── comment (String)
│   ├── createdAt (Date)
│   └── updatedAt (Date)
│
└── tickets
    ├── _id (ObjectId)
    ├── userId (ObjectId, ref: User)
    ├── subject (String)
    ├── description (String)
    ├── status (String: "open" | "in_progress" | "resolved" | "closed")
    ├── priority (String: "low" | "medium" | "high")
    ├── attachments (Array of URLs)
    ├── createdAt (Date)
    └── updatedAt (Date)
```

### Backend Files

| File | Purpose |
|------|---------|
| `backend/server.js` | Express app setup, routes, middleware |
| `backend/middleware/auth.js` | JWT verification middleware |
| `backend/models/User.js` | User schema (riders, drivers, admins) |
| `backend/models/Ride.js` | Ride request schema |
| `backend/models/Review.js` | Review/rating schema |
| `backend/models/Ticket.js` | Support ticket schema |
| `backend/utils/email.js` | Email sending (Nodemailer) |
| `backend/.env` | Environment variables (local) |
| `backend/.env.example` | Environment template |
| `backend/package.json` | Backend dependencies |

---

## 🔄 Data Flow

### Authentication Flow

```
User Input (Login/Signup)
    ↓
LoginPage.jsx / SignupPage.jsx
    ↓
POST /auth/login or /auth/signup
    ↓
backend/server.js (route handler)
    ↓
User.js (Mongoose model)
    ↓
MongoDB (users collection)
    ↓
JWT Token Generated
    ↓
localStorage.setItem('uet_token', token)
localStorage.setItem('uet_session', user)
    ↓
AuthContext.setUser(user)
    ↓
Navbar.jsx (displays user info)
```

### Ride Booking Flow

```
BookRidePage.jsx
    ↓
User selects pickup/dropoff
    ↓
POST /rides/request
    ↓
backend/server.js
    ↓
Ride.js (create new ride)
    ↓
MongoDB (rides collection)
    ↓
Socket.io broadcast to available drivers
    ↓
OfferRidePage.jsx (driver sees request)
    ↓
Driver accepts ride
    ↓
PUT /rides/:id/accept
    ↓
RideTrackingPage.jsx (real-time tracking)
    ↓
Socket.io updates location
    ↓
Ride completed
    ↓
Review page
```

### Real-Time Updates (Socket.io)

```
Events:
├── ride:requested (new ride posted)
├── ride:accepted (driver accepted)
├── ride:started (ride in progress)
├── ride:location_update (GPS update)
├── ride:completed (ride finished)
├── ride:cancelled (ride cancelled)
├── driver:online (driver status)
└── notification:new (general notifications)
```

---

## 📚 Key Files Reference

### Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.js` | Vite build tool configuration |
| `tailwind.config.js` | Tailwind CSS theme & breakpoints |
| `postcss.config.js` | PostCSS plugins (Tailwind) |
| `package.json` | Frontend dependencies & scripts |
| `backend/package.json` | Backend dependencies & scripts |
| `.gitignore` | Git ignore rules |

### Environment Variables

**Frontend** (`.env` in root):
```
VITE_API_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001
```

**Backend** (`backend/.env`):
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/uet-rides
JWT_SECRET=your_secret_key
NODEMAILER_EMAIL=your_email@gmail.com
NODEMAILER_PASSWORD=your_app_password
OPEN_METEO_API=https://api.open-meteo.com/v1/forecast
```

### CSS Variables (src/index.css)

```css
:root {
  --color-navy: #0A1628;           /* Primary dark color */
  --color-green: #16A34A;          /* UET green accent */
  --color-green-light: #22C55E;    /* Lighter green */
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

---

## 🔗 Component Dependency Graph

### Navbar Dependencies
```
Navbar.jsx
├── useNavigate (React Router)
├── useAuth (AuthContext)
├── NAV_LINKS (data.js)
├── ABOUT_DROPDOWN (hardcoded)
└── smoothScrollTo (utility function)
```

### Hero Dependencies
```
Hero.jsx
├── useNavigate (React Router)
├── CampusMap.jsx
├── Open-Meteo Weather API
└── smoothScrollTo (utility function)
```

### Features Dependencies
```
Features.jsx
├── FEATURES (data.js)
├── FEATURE_ICONS (hardcoded SVGs)
└── FeatureCard (sub-component)
```

### Stats Dependencies
```
Stats.jsx
└── STATS (data.js)
```

### Testimonials Dependencies
```
Testimonials.jsx
├── TESTIMONIALS (data.js)
└── renderStars (utility function)
```

### Footer Dependencies
```
Footer.jsx
├── useNavigate (React Router)
├── FOOTER_LINKS (data.js)
├── SOCIAL_LINKS (data.js)
├── SOCIAL_ICONS (hardcoded SVGs)
└── handleFooterLink (utility function)
```

---

## 🗄️ Database Models

### User Model (backend/models/User.js)

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed with bcryptjs),
  studentId: String (required, unique),
  phone: String,
  role: String (enum: ["rider", "driver", "admin"]),
  profilePicture: String (URL),
  rating: Number (1-5, default: 5),
  reviewCount: Number (default: 0),
  isVerified: Boolean (default: false),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Ride Model (backend/models/Ride.js)

```javascript
{
  _id: ObjectId,
  riderId: ObjectId (ref: User),
  driverId: ObjectId (ref: User, nullable),
  pickupLocation: {
    lat: Number,
    lng: Number,
    address: String
  },
  dropoffLocation: {
    lat: Number,
    lng: Number,
    address: String
  },
  status: String (enum: ["requested", "accepted", "in_progress", "completed", "cancelled"]),
  fare: Number,
  distance: Number (km),
  duration: Number (minutes),
  scheduledTime: Date,
  startTime: Date,
  endTime: Date,
  passengers: Number (default: 1),
  notes: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Review Model (backend/models/Review.js)

```javascript
{
  _id: ObjectId,
  rideId: ObjectId (ref: Ride),
  reviewerId: ObjectId (ref: User),
  revieweeId: ObjectId (ref: User),
  rating: Number (1-5),
  comment: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Ticket Model (backend/models/Ticket.js)

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  subject: String (required),
  description: String (required),
  status: String (enum: ["open", "in_progress", "resolved", "closed"]),
  priority: String (enum: ["low", "medium", "high"]),
  attachments: [String] (URLs),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

---

## 🔌 API Endpoints

### Authentication Routes

```
POST   /auth/signup              # Register new user
POST   /auth/login               # User login
POST   /auth/logout              # User logout
GET    /auth/profile             # Get current user profile
PUT    /auth/profile             # Update user profile
POST   /auth/forgot-password     # Request password reset
POST   /auth/reset-password      # Reset password with token
```

### Ride Routes

```
POST   /rides/request            # Create new ride request
GET    /rides                    # Get user's rides
GET    /rides/:id                # Get ride details
PUT    /rides/:id/accept         # Driver accepts ride
PUT    /rides/:id/start          # Start ride
PUT    /rides/:id/complete       # Complete ride
PUT    /rides/:id/cancel         # Cancel ride
GET    /rides/available          # Get available rides (for drivers)
```

### Review Routes

```
POST   /reviews                  # Create review
GET    /reviews/:userId          # Get user reviews
GET    /reviews/ride/:rideId     # Get reviews for a ride
```

### Ticket Routes

```
POST   /tickets                  # Create support ticket
GET    /tickets                  # Get user's tickets
GET    /tickets/:id              # Get ticket details
PUT    /tickets/:id              # Update ticket
```

### Admin Routes

```
GET    /admin/users              # List all users
GET    /admin/rides              # List all rides
GET    /admin/stats              # Get platform statistics
PUT    /admin/users/:id/verify   # Verify user
DELETE /admin/users/:id          # Delete user
```

---

## 🚀 Development Workflow

### Frontend Development

```bash
# Install dependencies
npm install

# Start dev server (Vite)
npm run dev
# Runs on http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Backend Development

```bash
# Install dependencies
cd backend
npm install

# Start dev server (with nodemon)
npm run dev
# Runs on http://localhost:3001

# Start production server
npm run start
```

### Environment Setup

1. **Frontend**: Create `.env` in root
2. **Backend**: Create `backend/.env` from `backend/.env.example`
3. **MongoDB**: Ensure MongoDB is running locally or use MongoDB Atlas
4. **API**: Backend must be running before frontend can make requests

### Key npm Scripts

**Frontend**:
- `npm run dev` — Start Vite dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

**Backend**:
- `npm run dev` — Start with nodemon (auto-reload)
- `npm run start` — Start production server

---

## 🎯 When Adding New Features

### Adding a New Page

1. Create component in `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx` under `<Routes>`
3. Add navigation link in `src/constants/data.js` (if needed)
4. Update `src/components/Navbar.jsx` if adding to main nav

### Adding a New Component

1. Create component in `src/components/NewComponent.jsx`
2. Import in parent component
3. Add any hardcoded data to `src/constants/data.js`
4. Add CSS variables to `src/index.css` if needed

### Adding a New API Endpoint

1. Create route handler in `backend/routes/` (or add to existing)
2. Add route in `backend/server.js`
3. Create/update Mongoose model in `backend/models/`
4. Add authentication middleware if needed (`backend/middleware/auth.js`)
5. Call from frontend using `fetch()` or axios

### Adding a New Database Model

1. Create schema file in `backend/models/NewModel.js`
2. Export Mongoose model
3. Import in `backend/server.js`
4. Create API routes to handle CRUD operations

---

## 📊 Project Statistics

- **Frontend Components**: 17 (7 homepage + 10 pages)
- **Backend Models**: 4 (User, Ride, Review, Ticket)
- **API Endpoints**: 20+ (auth, rides, reviews, tickets, admin)
- **CSS Variables**: 3 (navy, green, green-light)
- **Fonts**: 2 (Poppins, Inter)
- **External APIs**: 1 (Open-Meteo Weather)
- **Real-Time Events**: 8 (Socket.io)

---

## 🔐 Security Considerations

- **Authentication**: JWT tokens stored in localStorage
- **Password**: Hashed with bcryptjs (10 salt rounds)
- **CORS**: Configured for frontend origin
- **API Routes**: Protected with auth middleware
- **External Links**: Use `rel="noopener noreferrer"`
- **Input Validation**: Server-side validation on all endpoints

---

## 📝 Notes for Future Development

1. **Real-Time Tracking**: CampusMap component ready, needs Socket.io integration
2. **Weather API**: Live weather in Hero section (Open-Meteo)
3. **Email Notifications**: Nodemailer configured, needs email templates
4. **Admin Dashboard**: Route exists, needs full implementation
5. **Payment Integration**: Not yet implemented (Stripe/JazzCash)
6. **Push Notifications**: Not yet implemented
7. **Analytics**: Not yet implemented

---

## 🤝 Team

- **Frontend Lead**: USWA ABBAS TAHIRA
- **Backend Lead**: AMINA YOUNUS
- **Project**: UET Rides Campus Ride-Sharing Platform

---

**This map should be your reference guide for understanding the project structure. When starting a new session, read this file first to understand the complete context!**
