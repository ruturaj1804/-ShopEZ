# Ideation Phase: Brainstorming & Idea Prioritization

| Meta Attribute | Value |
| :--- | :--- |
| **Date** | 10 August 2026 |
| **Team ID** | N/A |
| **Project Name** | ShopEZ Ecommerce Application |
| **Author / Repo** | Ruturaj Misal ([https://github.com/ruturaj1804/-ShopEZ](https://github.com/ruturaj1804/-ShopEZ)) |
| **Maximum Marks** | 4 Marks |

---

## Action Priority Matrix (Impact vs. Effort)

| Idea / Feature Description | Target User | Impact | Effort | Priority Category | Implementation Decision |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **JWT Bearer Authentication & Role Access** | All Users & Admins | High | Medium | Must Have (Sprint 1) | Implemented using JSON Web Tokens & bcryptjs |
| **Product Catalog with Search & Category Filters** | Shoppers | High | Low | Must Have (Sprint 2) | Implemented with MongoDB regex queries & React state |
| **Product Image Upload via Multer** | Sellers / Admins | High | Medium | Must Have (Sprint 2) | Implemented with Multer middleware storing in `/uploads` |
| **Dynamic Cart with Real-time Total Calculations** | Shoppers | High | Low | Must Have (Sprint 3) | Implemented via React CartContext & MongoDB Cart model |
| **Cash on Delivery (COD) & Multi-item Checkout** | Shoppers | High | Medium | Must Have (Sprint 3) | Implemented with Order schema & shipping address fields |
| **Order Status Tracking (Processing/Shipped/Delivered)** | Shoppers & Admins | High | Low | Must Have (Sprint 3) | Implemented with Order status enum and user profile view |
| **Seller Central (`/admin/sell`) with Inline Price/Stock Edit** | Sellers | High | Medium | Must Have (Sprint 4) | Implemented with React inline editing and PUT `/api/products/:id` |
| **Automated Low Stock Warning Banner (< 10 units)** | Sellers / Admins | High | Low | Must Have (Sprint 4) | Implemented on Seller Dashboard when stock < 10 |
| **Admin Analytics (Total Revenue, Orders, Products, Users)** | Platform Admins | High | Medium | Must Have (Sprint 4) | Implemented via MongoDB aggregations in `/api/admin/dashboard` |
| **Product Ratings & Customer Reviews** | Shoppers | Medium | Medium | Should Have | Implemented with nested review schema in Product model |
| **Third-party Payment Gateway (Razorpay/Stripe)** | Shoppers | High | High | Future Roadmap | Planned for Phase 2 production release |
| **AI-Powered Product Recommendations** | Shoppers | Medium | High | Nice to Have | Deferred to future iteration |
