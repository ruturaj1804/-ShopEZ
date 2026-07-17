# ShopEZ

ShopEZ is a full-featured e-commerce web application built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a seamless shopping experience for users and a powerful seller dashboard for admins to manage products, track orders, and analyze sales.

## Features

### For Users
- **User Authentication** – Register, login, and manage your profile with JWT-based secure authentication
- **Product Catalog** – Browse products with search, category filtering, and price sorting
- **Product Details** – View detailed product information including images, descriptions, ratings, discounts, and stock availability
- **Shopping Cart** – Add products, update quantities, and remove items with real-time price calculations
- **Secure Checkout** – Enter shipping address and payment method to place orders
- **Order Tracking** – View order history and track order status (Processing, Shipped, Delivered, Cancelled)
- **User Profile** – Manage personal information and view all past orders

### For Admins / Sellers
- **Seller Dashboard** – Centralized hub to manage products and monitor sales
- **Add Products** – Upload product images directly, set prices, discounts, stock, and categories
- **Inline Editing** – Quickly update product prices and stock levels without leaving the page
- **Low Stock Alerts** – Automatic warnings when products fall below 10 units
- **Order Management** – View all customer orders and update order statuses
- **Revenue Analytics** – Track total revenue, orders, products, and user count
- **User Management** – View and manage registered users

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router, Axios, React Icons, React Toastify |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Authentication | JWT (JSON Web Tokens), bcryptjs |
| File Upload | Multer |
| Architecture | MVC (Model-View-Controller) |

## Project Structure

```
E-commerce Application/
├── Client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # Navbar, Footer, ProductCard
│   │   ├── context/        # AuthContext, CartContext
│   │   ├── pages/          # Landing, Products, Cart, Profile, Login, Register
│   │   │   └── admin/      # AdminDashboard, SellerDashboard, AllOrders, AllProducts, NewProduct
│   │   └── services/       # API client, utility functions
│   └── package.json
├── Server/                 # Express backend
│   ├── config/             # Database connection
│   ├── controllers/        # Business logic (user, product, cart, order, admin)
│   ├── middleware/         # Auth (JWT), file upload (Multer)
│   ├── models/             # Mongoose schemas (User, Product, Cart, Order, Admin)
│   ├── routes/             # API route definitions
│   ├── uploads/            # Uploaded product images
│   ├── index.js            # Server entry point
│   ├── seed.js             # Database seeder script
│   └── package.json
└── .gitignore
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running on `localhost:27017` or provide a remote URI)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ruturaj1804/-ShopEZ.git
   cd "E-commerce Application"
   ```

2. **Set up the Backend**
   ```bash
   cd Server
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the `Server` folder:
   ```
   MONGO_URI=mongodb://localhost:27017/shopez
   JWT_SECRET=your_secret_key_here
   PORT=8000
   ```

4. **Seed the Database** (adds sample products & admin user)
   ```bash
   node seed.js
   ```

5. **Set up the Frontend**
   ```bash
   cd ../Client
   npm install
   ```

### Running the Application

1. **Start MongoDB** – Make sure MongoDB is running on your machine

2. **Start the Backend Server**
   ```bash
   cd Server
   npm run dev
   ```
   Server runs on `http://localhost:8000`

3. **Start the Frontend** (in a new terminal)
   ```bash
   cd Client
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

### Default Admin Login
- **Email:** `admin@shopez.com`
- **Password:** `admin123`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login user |
| GET | `/api/users/profile` | Get user profile (protected) |
| PUT | `/api/users/profile` | Update user profile (protected) |
| GET | `/api/products` | Get all products (supports search, category, sort) |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product (admin, multipart) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |
| GET | `/api/cart` | Get user cart (protected) |
| POST | `/api/cart/add` | Add item to cart (protected) |
| PUT | `/api/cart/:itemId` | Update cart item quantity (protected) |
| DELETE | `/api/cart/:itemId` | Remove item from cart (protected) |
| POST | `/api/orders` | Create order (protected) |
| GET | `/api/orders/myorders` | Get user orders (protected) |
| GET | `/api/orders/all` | Get all orders (admin) |
| PUT | `/api/orders/:id/status` | Update order status (admin) |
| GET | `/api/admin/dashboard` | Get dashboard stats (admin) |
| GET | `/api/admin/users` | Get all users (admin) |
| GET | `/api/admin/settings` | Get site settings |

## Key Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Hero banner, categories, featured products |
| Products | `/products` | All products with search, filter, sort |
| Product Detail | `/products/:id` | Single product view with add to cart |
| Cart | `/cart` | Shopping cart with checkout |
| Profile | `/profile` | User info and order history |
| Login | `/login` | User authentication |
| Register | `/register` | New user registration |
| Seller Dashboard | `/admin/sell` | Product management & sales overview |
| Admin Dashboard | `/admin` | Stats, orders, users management |
| All Orders | `/admin/orders` | View & manage all orders |
| All Products | `/admin/products` | View & delete products |
| New Product | `/admin/products/new` | Add new product |

## License

This project is open source and available under the [MIT License](LICENSE).
