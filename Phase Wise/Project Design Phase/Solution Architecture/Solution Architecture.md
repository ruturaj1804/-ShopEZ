# Project Design Phase: Solution Architecture

| Meta Attribute | Value |
| :--- | :--- |
| **Date** | 12 August 2026 |
| **Team ID** | N/A |
| **Project Name** | ShopEZ Ecommerce Application |
| **Author / Repo** | Ruturaj Misal ([https://github.com/ruturaj1804/-ShopEZ](https://github.com/ruturaj1804/-ShopEZ)) |
| **Maximum Marks** | 4 Marks |

---

## 1. High-Level Architecture
ShopEZ implements a 3-tier layered architecture adhering to the Model-View-Controller (MVC) pattern.

```mermaid
flowchart TD
    subgraph Client ["Client Layer (React 18 / Vite)"]
        UI["React Pages (Landing, Products, Cart, Profile, Admin)"]
        Context["Context API (AuthContext, CartContext)"]
        Axios["Axios Interceptor (Bearer JWT)"]
        UI --> Context
        Context --> Axios
    end

    subgraph Server ["Server Layer (Node.js & Express.js)"]
        Routes["Express Routers (/api/users, /products, /cart, /orders, /admin)"]
        MW["Middleware (protect, adminOnly, upload)"]
        Controllers["Controllers (user, product, cart, order, admin)"]
        Axios -->|REST / JSON| Routes
        Routes --> MW
        MW --> Controllers
    end

    subgraph Database ["Data Persistence Layer (MongoDB Atlas)"]
        Models["Mongoose Models (User, Product, Cart, Order, Admin)"]
        DB[(MongoDB Database)]
        Controllers --> Models
        Models --> DB
    end
```

---

## 2. Database Entity Relationship (ER) Schema

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER ||--|| CART : owns
    USER ||--o{ REVIEW : writes
    PRODUCT ||--o{ REVIEW : contains
    ORDER ||--|{ ORDER_ITEM : includes
    CART ||--|{ CART_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : references
    PRODUCT ||--o{ CART_ITEM : references

    USER {
        ObjectId _id PK
        string name
        string email UK
        string password
        string phone
        string address
        string role "user | admin"
        date createdAt
    }

    PRODUCT {
        ObjectId _id PK
        string name
        string description
        number price
        number discount
        string category
        string image
        number stock
        number rating
        number numReviews
    }

    CART {
        ObjectId _id PK
        ObjectId user FK
        number totalPrice
    }

    ORDER {
        ObjectId _id PK
        ObjectId user FK
        object shippingAddress
        string paymentMethod "COD"
        number totalPrice
        boolean isPaid
        string orderStatus "Processing | Shipped | Delivered | Cancelled"
        date deliveredAt
    }
```

---

## 3. Security Architecture
- **JWT Authentication:** Tokens signed with `JWT_SECRET`, transmitted via HTTP headers `Authorization: Bearer <token>`, and verified by Express `protect` middleware.
- **Password Salting:** Passwords hashed with `bcryptjs` using 10 rounds before storing in MongoDB.
- **Role-Based Guards (`adminOnly`):** Validates that `req.user.role === 'admin'` before allowing administrative and seller route access.
- **CORS Allowlist:** Configured to allow trusted origins during development and production.
