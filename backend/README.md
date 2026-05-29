# Food Delivery - Backend API

Node.js + Express + MongoDB REST API powering all 4 frontend apps.

## Folder Structure

```
backend/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── authController.js      # Register, login, profile
│   ├── menuController.js      # Menu CRUD
│   ├── orderController.js     # Order lifecycle
│   ├── restaurantController.js
│   ├── categoryController.js
│   └── userController.js      # Admin user management
├── middleware/
│   └── authMiddleware.js      # JWT protect + role guard
├── models/
│   ├── User.js
│   ├── Restaurant.js
│   ├── MenuItem.js
│   ├── Order.js
│   └── Category.js
├── routes/
│   ├── authRoutes.js
│   ├── menuRoutes.js
│   ├── orderRoutes.js
│   ├── restaurantRoutes.js
│   ├── categoryRoutes.js
│   └── userRoutes.js
├── utils/
│   ├── jwt.js                 # Token generation & verification
│   └── upload.js              # Multer image upload
├── uploads/                   # Uploaded images (auto-created)
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

## Setup

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Create `.env` file
```bash
cp .env.example .env
```
Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/food-delivery
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
```

### 3. Start server
```bash
# Development
npm run dev

# Production
npm start
```

Server runs at `http://localhost:5000`

---

## API Reference

### Auth — `/api/auth`
| Method | Endpoint              | Access   | Description         |
|--------|-----------------------|----------|---------------------|
| POST   | /register             | Public   | Register user       |
| POST   | /login                | Public   | Login               |
| GET    | /me                   | Private  | Get current user    |
| PUT    | /update-profile       | Private  | Update profile      |
| PUT    | /change-password      | Private  | Change password     |

**Register roles:** `customer`, `restaurant_owner`, `delivery_agent`

### Menu — `/api/menu`
| Method | Endpoint               | Access                   | Description          |
|--------|------------------------|--------------------------|----------------------|
| GET    | /                      | Public                   | List items (filter)  |
| GET    | /:id                   | Public                   | Get single item      |
| POST   | /                      | admin, restaurant_owner  | Create item          |
| PUT    | /:id                   | admin, restaurant_owner  | Update item          |
| DELETE | /:id                   | admin, restaurant_owner  | Delete item          |
| PATCH  | /:id/availability      | admin, restaurant_owner  | Toggle available     |

**Query params:** `restaurant`, `category`, `isVeg`, `search`, `page`, `limit`

### Orders — `/api/orders`
| Method | Endpoint               | Access                              | Description          |
|--------|------------------------|-------------------------------------|----------------------|
| POST   | /                      | customer                            | Place order          |
| GET    | /my-orders             | customer                            | My order history     |
| GET    | /                      | admin, restaurant_owner, agent      | All / filtered       |
| GET    | /:id                   | relevant parties                    | Order detail         |
| PATCH  | /:id/status            | admin, restaurant_owner, agent      | Update status        |
| PATCH  | /:id/cancel            | customer                            | Cancel order         |
| PATCH  | /:id/assign-agent      | admin                               | Assign delivery agent|

**Order statuses:** `pending → confirmed → preparing → ready → picked_up → out_for_delivery → delivered`

### Restaurants — `/api/restaurants`
| Method | Endpoint               | Access                   | Description          |
|--------|------------------------|--------------------------|----------------------|
| GET    | /                      | Public                   | List restaurants     |
| GET    | /:id                   | Public                   | Get restaurant       |
| POST   | /                      | admin, restaurant_owner  | Create               |
| PUT    | /:id                   | admin, restaurant_owner  | Update               |
| PATCH  | /:id/approve           | admin                    | Approve/reject       |
| PATCH  | /:id/toggle-open       | admin, restaurant_owner  | Open/close           |
| DELETE | /:id                   | admin                    | Delete               |

### Categories — `/api/categories`
| Method | Endpoint | Access   | Description   |
|--------|----------|----------|---------------|
| GET    | /        | Public   | All categories|
| POST   | /        | admin    | Create        |
| PUT    | /:id     | admin    | Update        |
| DELETE | /:id     | admin    | Delete        |

### Users — `/api/users`
| Method | Endpoint                | Access  | Description          |
|--------|-------------------------|---------|----------------------|
| GET    | /                       | admin   | All users            |
| GET    | /delivery-agents        | admin   | All delivery agents  |
| GET    | /:id                    | admin   | User by ID           |
| POST   | /create-admin           | admin   | Create admin user    |
| PATCH  | /:id/toggle-active      | admin   | Ban/unban user       |

---

## Auth Header
All protected routes require:
```
Authorization: Bearer <token>
```

## Image Uploads
- Images served at: `http://localhost:5000/uploads/<filename>`
- Max size: 5MB
- Supported: jpeg, jpg, png, webp
- Use `multipart/form-data` when sending image fields

## First Admin Setup
Since admin can't self-register, seed one manually in MongoDB:
```js
// In MongoDB shell or Compass
db.users.insertOne({
  name: "Admin",
  email: "admin@fooddelivery.com",
  password: "<bcrypt-hashed-password>",
  role: "admin",
  isActive: true
})
```
Or run this one-time script:
```bash
node -e "
const bcrypt = require('bcryptjs');
bcrypt.hash('admin123', 10).then(hash => console.log(hash));
"
```

---

## Frontend CORS Ports
The server allows these origins by default:
- `http://localhost:5173` — frontend (customer)
- `http://localhost:5174` — admin-panel
- `http://localhost:5175` — delivery-app
- `http://localhost:5176` — restaurant-dashboard

Update `server.js` if your Vite ports differ.
