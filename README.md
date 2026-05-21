# 🛒 eCommerce API

This is a RESTful API I built for an online store, my solo backend project.

It handles everything a basic eCommerce backend needs: users, categories, products, and orders. All with validation, data integrity checks, and auto-calculated order totals.

<img width="1920" height="1688" alt="swaggerUI" src="https://github.com/user-attachments/assets/a16af9b7-668f-434b-adac-f220b6d362e5" />
<img width="1562" height="975" alt="Postman" src="https://github.com/user-attachments/assets/fa24294f-8394-431b-ae78-de18bb2cf6f8" />
<img width="273" height="456" alt="struc" src="https://github.com/user-attachments/assets/56640f74-b3db-4506-83cd-a70bd3f47b3d" />

🔗 **live Project:** [Swagger UI on Render](https://ecommerce-api-s8fd.onrender.com/api-docs)

---

## What it does

- **Full CRUD** for Categories, Products, Users, and Orders
- **Validates everything** with Zod before it touches the database
- **Checks data integrity** — can't create a product without a real category, can't place an order without a real user
- **Calculates order totals on the server** — price × quantity for each product, so nobody can fake the price
- **Never exposes passwords** in any API response
- **Catches duplicate emails** and returns a clear error
- **Filters products by category** — just add `?categoryId=` to the URL
- **Swagger UI** — test every endpoint right in the browser
- **Deployed on Render** — no localhost needed

---

## Built with

- **TypeScript** + **Express** — the backbone
- **MongoDB Atlas** + **Mongoose** — cloud database and ODM
- **Zod** — input validation that actually gives useful error messages
- **Swagger UI** — so anyone can explore the API without Postman
- **dotenv** — keeps secrets out of GitHub
- **ts-node-dev** — hot reload during development

---

## Project structure

```
src/
├── app.ts              → Where everything starts
├── swagger.ts          → Swagger config
├── db/
│   └── index.ts        → Connects to MongoDB Atlas
├── models/             → How the data looks in the database
│   ├── User.ts         → name, email, password (unique email)
│   ├── Category.ts     → name
│   ├── Product.ts      → name, description, price, categoryId
│   └── Order.ts        → userId, products[], total (auto-calculated)
├── schemas/            → Zod schemas that validate incoming data
├── controllers/        → The actual logic (create, read, update, delete)
├── routes/             → Maps URLs to controllers + Swagger docs
├── middlewares/
│   ├── validate.ts     → Reusable validation middleware
│   └── errorHandler.ts → Catches unexpected errors
└── types/
```

---

## How to run it locally

You'll need **Node.js** and a **MongoDB Atlas** account.

```bash
git clone https://github.com/GoulartHenrique/Ecommerce-api.git
cd Ecommerce-api
npm install
```

Create a `.env` file in the root:

```env
PORT=3000
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@your-cluster.mongodb.net/ecommerce
```

> ⚠️ This file is in `.gitignore`.

Then just:

```bash
npm run dev
```

Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs) and you're good to go.

---

## API at a glance

### Categories

| Method   | Endpoint          | What it does |
| -------- | ----------------- | ------------ |
| `GET`    | `/categories`     | List all     |
| `GET`    | `/categories/:id` | Get one      |
| `POST`   | `/categories`     | Create       |
| `PUT`    | `/categories/:id` | Update       |
| `DELETE` | `/categories/:id` | Delete       |

### Users

| Method   | Endpoint     | What it does            |
| -------- | ------------ | ----------------------- |
| `GET`    | `/users`     | List all (no passwords) |
| `GET`    | `/users/:id` | Get one (no password)   |
| `POST`   | `/users`     | Create                  |
| `PUT`    | `/users/:id` | Update                  |
| `DELETE` | `/users/:id` | Delete                  |

### Products

| Method   | Endpoint                  | What it does                  |
| -------- | ------------------------- | ----------------------------- |
| `GET`    | `/products`               | List all                      |
| `GET`    | `/products?categoryId=ID` | Filter by category            |
| `GET`    | `/products/:id`           | Get one                       |
| `POST`   | `/products`               | Create (validates categoryId) |
| `PUT`    | `/products/:id`           | Update (validates categoryId) |
| `DELETE` | `/products/:id`           | Delete                        |

### Orders

| Method   | Endpoint      | What it does                   |
| -------- | ------------- | ------------------------------ |
| `GET`    | `/orders`     | List all                       |
| `GET`    | `/orders/:id` | Get one                        |
| `POST`   | `/orders`     | Create (total auto-calculated) |
| `PUT`    | `/orders/:id` | Update (total recalculated)    |
| `DELETE` | `/orders/:id` | Delete                         |

---

## The business rules I'm most proud of

**🔐 Passwords never leak** — `.select("-password")` on every query, plus destructuring on create.

**🧮 Server calculates the total** — the client sends products and quantities, the API looks up real prices and does the math. No way to cheat.

**🔗 Data integrity everywhere** — try to create a product with a fake categoryId? 400. Order with a non-existent user? 400. Every reference is validated before saving.

**📧 Duplicate emails handled gracefully** — MongoDB's error code `11000` gets caught and returns a clean `409 Conflict`.

---

## Quick test examples

**Create a category:**

```json
POST /categories
{ "name": "Electronics" }
```

**Create a user:**

```json
POST /users
{ "name": "Henrique", "email": "henrique@test.com", "password": "123456" }
```

**Create a product** (use a real category `_id`):

```json
POST /products
{ "name": "iPhone 15", "description": "Latest Apple smartphone", "price": 999, "categoryId": "CATEGORY_ID" }
```

**Create an order** (total is calculated for you):

```json
POST /orders
{ "userId": "USER_ID", "products": [{ "productId": "PRODUCT_ID", "quantity": 2 }] }
```
