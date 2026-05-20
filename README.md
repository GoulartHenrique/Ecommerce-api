# eCommerce API

A backend REST API project built with Express, TypeScript, MongoDB Atlas, Mongoose, and Zod.

## Features

- CRUD operations for:
  - Categories
  - Products
  - Users
  - Orders
- Request validation using Zod
- MongoDB Atlas integration
- Mongoose schemas and models
- Layered architecture:
  - Routes
  - Controllers
  - Middlewares
  - Models
  - Schemas
- Centralized error handling
- Swagger UI documentation
- Password excluded from all API responses

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB Atlas
- Mongoose
- Zod
- Swagger UI
- CORS
- dotenv

## Project Structure

```
src/
├── controllers/
├── db/
├── middlewares/
├── models/
├── routes/
├── schemas/
├── types/
├── swagger.ts
└── app.ts
```

## Validation

The project uses Zod for:

- Request body validation
- Email format validation
- Password minimum length
- Positive price enforcement
- Required field checks

## Business Logic

Examples:

- Check whether category/product/user exists before referencing
- Prevent duplicate user emails
- Automatically calculate order total on the server
- Validate product references inside orders
- Exclude password from all responses

## Development

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env` file in the project root:

```
PORT=3000
MONGODB_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@your-cluster.mongodb.net/ecommerce
```

> ⚠️ Never commit your `.env` file to GitHub.

## API Documentation

Once the server is running, open Swagger UI:

```
http://localhost:3000/api-docs
```

## API Endpoints

**Categories:** `GET /categories` · `POST /categories` · `GET /categories/:id` · `PUT /categories/:id` · `DELETE /categories/:id`

**Users:** `GET /users` · `POST /users` · `GET /users/:id` · `PUT /users/:id` · `DELETE /users/:id`

**Products:** `GET /products` · `GET /products?categoryId=` · `POST /products` · `GET /products/:id` · `PUT /products/:id` · `DELETE /products/:id`

**Orders:** `GET /orders` · `POST /orders` · `GET /orders/:id` · `PUT /orders/:id` · `DELETE /orders/:id`

## Testing

Use Postman or Thunder Client to test all CRUD endpoints.
