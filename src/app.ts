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
  res.json({ message: "eCommerce API is running" });
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
