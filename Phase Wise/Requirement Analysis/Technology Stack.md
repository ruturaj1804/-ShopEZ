# Requirement Analysis: Technology Stack & Architecture

| Meta Attribute | Value |
| :--- | :--- |
| **Date** | 12 August 2026 |
| **Team ID** | N/A |
| **Project Name** | ShopEZ Ecommerce Application |
| **Author / Repo** | Ruturaj Misal ([https://github.com/ruturaj1804/-ShopEZ](https://github.com/ruturaj1804/-ShopEZ)) |
| **Maximum Marks** | 4 Marks |

---

## Technology Stack Specification

| S.No | Layer / Component | Technology | Role & Justification in ShopEZ |
| :--- | :--- | :--- | :--- |
| **1** | Frontend Library | **React 18 / 19** | Declarative, component-based UI facilitating high interactivity and fast Single Page Application (SPA) navigation without page reloads. |
| **2** | Build Tool | **Vite** | Lightning-fast development server with Hot Module Replacement (HMR) and optimized Rollup-based production builds. |
| **3** | Client Routing | **React Router DOM (v7)** | Declarative client-side routing, nested routes, and `ProtectedRoute` wrappers for standard and admin roles. |
| **4** | State Management | **React Context API** | Native React state management via `AuthContext` (session & JWT storage) and `CartContext` (cart item synchronization). |
| **5** | HTTP Client | **Axios** | Promise-based HTTP client with request interceptors to inject `Bearer <token>` headers on authenticated requests. |
| **6** | UI & Notifications | **React Icons & React Toastify** | Modern iconography and non-intrusive toast alert popups for cart updates, login alerts, and checkout confirmation. |
| **7** | Backend Runtime | **Node.js & Express.js** | Lightweight, asynchronous, event-driven REST API server following MVC architectural patterns. |
| **8** | Database & ODM | **MongoDB & Mongoose ODM** | Document-oriented database providing schema validation, pre-save hooks, and relationship references for Users, Products, Carts, and Orders. |
| **9** | Authentication | **JSON Web Tokens (JWT)** | Stateless bearer token authentication ensuring secure communication between client and server. |
| **10** | Password Hashing | **bcryptjs** | Industry-standard cryptographic hashing of user passwords with 10 salt rounds. |
| **11** | File Uploads | **Multer** | Middleware for handling `multipart/form-data` during product creation to save images into `/uploads`. |
| **12** | Deployment | **Vercel & MongoDB Atlas** | Serverless deployment via `vercel.json` rewrites and cloud-hosted MongoDB Atlas cluster. |
