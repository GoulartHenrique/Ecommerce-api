import express from "express";
import cors from "cors";
import connectDB from "./db";
import {
  categoryRoutes,
  userRoutes,
  productRoutes,
  orderRoutes,
} from "./routes";
import { errorHandler } from "./middlewares";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

const app = express();
const PORT = process.env.PORT || 3000;

// Global middlewares
app.use(cors());
app.use(express.json());

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// Test route
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body style="background-color: #1a1a1a; color: #ffffff; font-family: Arial; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
        <h1>🛒 eCommerce API is running</h1>
      </body>
    </html>
  `);
});

// Error handler (must be last)
app.use(errorHandler);

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;
