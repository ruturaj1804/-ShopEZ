# Project Development: User Acceptance Testing (UAT)

| Meta Attribute | Value |
| :--- | :--- |
| **Date** | 13 August 2026 |
| **Team ID** | N/A |
| **Project Name** | ShopEZ Ecommerce Application |
| **Author / Repo** | Ruturaj Misal ([https://github.com/ruturaj1804/-ShopEZ](https://github.com/ruturaj1804/-ShopEZ)) |
| **Maximum Marks** | 5 Marks |

---

## Project Overview
- **Project Name:** ShopEZ Ecommerce Application
- **Project Description:** Full-stack MERN e-commerce application offering customer catalog, cart, checkout, and seller/admin management.
- **Version:** 1.0.0
- **GitHub Repository:** [https://github.com/ruturaj1804/-ShopEZ](https://github.com/ruturaj1804/-ShopEZ)

---

## UAT Test Cases Execution Matrix

| Test ID | Test Scenario | Test Steps | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-001** | User Registration | 1. Navigate to `/register`<br>2. Enter name, valid email, password<br>3. Click Register | User created, JWT generated, redirected to homepage with welcome toast | As expected | Pass |
| **TC-002** | User Login | 1. Navigate to `/login`<br>2. Enter credentials<br>3. Click Login | User authenticated, token saved in localStorage, navbar shows user name and profile | As expected | Pass |
| **TC-003** | Invalid Login Rejection | 1. Enter unregistered email or incorrect password<br>2. Click Login | HTTP 401 error returned, error toast notification displayed | As expected | Pass |
| **TC-004** | Product Catalog Browsing | 1. Open `/products`<br>2. Click 'Electronics' category pill<br>3. Type 'Wireless' in search bar | Product list filtered accurately by category and search keyword in real-time | As expected | Pass |
| **TC-005** | Product Detail Page | 1. Click on a product card<br>2. Verify image, price, discount, stock | Detail page displays accurate product information and customer review section | As expected | Pass |
| **TC-006** | Add Item to Cart | 1. On Product Detail, click 'Add to Cart' | Cart badge in navbar updates, success toast appears, item stored in MongoDB cart | As expected | Pass |
| **TC-007** | Cart Quantity Update | 1. Navigate to `/cart`<br>2. Increase quantity of item<br>3. Click decrease or remove | Item line total and overall cart totalPrice recompute dynamically | As expected | Pass |
| **TC-008** | Checkout & Order Creation | 1. In cart, enter shipping address<br>2. Select COD<br>3. Click Place Order | Order document created in MongoDB, product stock deducted, cart cleared | As expected | Pass |
| **TC-009** | Order History in Profile | 1. Navigate to `/profile`<br>2. Check Order History table | Newly placed order visible with date, items, total price, and 'Processing' status | As expected | Pass |
| **TC-010** | Product Review Submission | 1. On product page, enter 5-star rating and comment<br>2. Submit review | Review saved under product reviews array; overall rating updated | As expected | Pass |
| **TC-011** | Seller Central Navigation | 1. Login as admin<br>2. Navigate to `/admin/sell` | Seller Dashboard renders with product inventory list and sales overview cards | As expected | Pass |
| **TC-012** | Inline Price & Stock Edit | 1. In Seller Dashboard, click price cell<br>2. Edit price from 500 to 450<br>3. Save | PUT request sends update to backend, MongoDB product price updated immediately | As expected | Pass |
| **TC-013** | Low Stock Alert Indicator | 1. Set product stock to 5 units<br>2. Check Seller Dashboard | Prominent warning badge displayed indicating inventory below 10 units | As expected | Pass |
| **TC-014** | Admin Order Status Update | 1. Open `/admin/orders`<br>2. Change status from 'Processing' to 'Shipped' | Order status updated in database; user sees updated status in profile | As expected | Pass |
| **TC-015** | Role Protection Guard | 1. Login as standard user<br>2. Attempt direct URL access to `/admin` | Redirected back to homepage; unauthorized access blocked | As expected | Pass |
