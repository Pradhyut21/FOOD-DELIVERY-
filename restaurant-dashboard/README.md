# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




# 🍽️ CraveMate

> An integrated food delivery & dine-out platform — order in, book a table, join queues, and explore cuisines, all in one app.

![Tech Stack](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

---

## 📖 Overview

CraveMate is a full-stack, mobile-first food platform with four sides:

| Side | Description |
|------|-------------|
| 🧑 **Customer App** | Browse restaurants, order food, book tables, track deliveries |
| 🍴 **Restaurant Dashboard** | Manage orders, menus, reservations, analytics |
| 🛵 **Delivery Partner App** | Accept/decline orders, navigate, track earnings |
| 🛠️ **Admin Panel** | Manage users, restaurants, campaigns, payouts |

---

## 🛠️ Tech Stack

### Frontend
- **React** (Web Dashboard) + **React Native** (Mobile)
- **Vite** — build tool and dev server
- **Socket.io Client** — real-time order tracking and live queue updates

### Backend
- **Node.js** + **Express** — REST API server
- **Socket.io** — real-time events (order status, delivery tracking, chat)

### Database & Caching
- **PostgreSQL** — primary relational database
- **Redis** — sessions, real-time queues, caching

### Services & Integrations
| Service | Purpose |
|---------|---------|
| Firebase Auth | OTP-based phone login |
| Firebase Cloud Messaging | Push notifications |
| Google Maps API | Delivery tracking, restaurant discovery |
| Razorpay | Payments — UPI, Card, Wallet, COD, Split Pay |
| AWS S3 | Image and menu asset storage |

---

## 📁 Project Structure

```
cravemate/
├── client/               # React web dashboard (Restaurant + Admin)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── utils/
│   └── vite.config.js
├── mobile/               # React Native customer & delivery partner app
│   └── src/
├── server/               # Node.js + Express backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── sockets/
│   └── index.js
├── .env.example
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) v14+
- [Redis](https://redis.io/) v7+
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## 🚀 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/cravemate.git
cd cravemate
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your credentials (see [Environment Variables](#-environment-variables) below).

### 3. Install dependencies

```bash
# Web client (Restaurant Dashboard + Admin Panel)
cd client
npm install

# Backend server
cd ../server
npm install
```

### 4. Set up the database

```bash
# Create the PostgreSQL database
psql -U postgres -c "CREATE DATABASE cravemate;"

# Run migrations
cd server
npm run migrate
```

### 5. Start Redis

```bash
redis-server
```

### 6. Run the development servers

**Backend (from `/server`):**
```bash
npm run dev
# Runs on http://localhost:5000
```

**Web Client (from `/client`):**
```bash
npm run dev
# Runs on http://localhost:5173
```

> For the **mobile app**, navigate to `/mobile` and follow the React Native + Expo setup in [`mobile/README.md`](./mobile/README.md).

---

## 🔑 Environment Variables

Create a `.env` file in the root of `/server` based on `.env.example`:

```env
# Server
PORT=5000
NODE_ENV=development

# PostgreSQL
POSTGRES_URL=postgresql://postgres:password@localhost:5432/cravemate

# Redis
REDIS_URL=redis://localhost:6379

# Firebase (Auth + FCM)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key

# Google Maps
GOOGLE_MAPS_API_KEY=your_google_maps_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET=your_s3_bucket_name
AWS_REGION=ap-south-1
```

---

## 🧪 Running Tests

```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test
```

---

## 📦 Build for Production

```bash
# Build the web client
cd client
npm run build
# Output in client/dist/

# Start the production server
cd server
npm start
```

---

## 🗃️ Core Database Tables

| Table | Description |
|-------|-------------|
| `users` | Customer profiles, dietary preferences, addresses |
| `restaurants` | Restaurant info, hours, cuisine tags, live cam status |
| `menu_items` | Dishes with allergens, dietary tags, ratings |
| `orders` | Order lifecycle, items, payment, carbon footprint |
| `reservations` | Table bookings, party size, experience packages |
| `delivery_partners` | Partner profiles, vehicle type, live location |
| `loyalty_coins` | Per-user per-restaurant coin balances |
| `flash_tables` | Auction listings, bids, countdown timers |
| `subscriptions` | Meal plans, surprise boxes, insider memberships |
| `corporate_accounts` | Company wallets, employee limits, invoices |
| `food_passport` | Cuisines tried, badges earned, vouchers |

---

## ✨ Key Features

- 🛵 **Real-time delivery tracking** via Socket.io + Google Maps
- 👥 **Group Order mode** — friends add items to a shared live cart
- 🌍 **Food Passport** — gamified cuisine exploration with stamps and rewards
- ⚡ **Flash Tables** — auction-style last-minute dine-out deals
- 🌱 **Carbon Footprint tracker** — per-order CO₂ estimate with eco packaging option
- 💼 **Corporate Food Wallets** — company-funded meals with budget controls
- 🎰 **Surprise Meal Box** — weekly mystery delivery based on your budget and preferences

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">Built with 🍊 by the CraveMate team</p>
