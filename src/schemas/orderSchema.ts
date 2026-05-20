import { z } from "zod";

export const orderSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  products: z
    .array(
      z.object({
        productId: z.string().min(1, "Product ID is required"),
        quantity: z
          .number()
          .int()
          .positive("Quantity must be a positive integer"),
      }),
    )
    .min(1, "At least one product is required"),
});
