import { Request, Response } from "express";
import { Order, User, Product } from "../models";

// GET /orders
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /orders/:id
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /orders
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, products } = req.body;

    // Validate user exists
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    // Validate all products exist and calculate total
    let total = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        res
          .status(400)
          .json({ message: `Product ${item.productId} not found` });
        return;
      }

      total += product.price * item.quantity;
    }

    const order = await Order.create({
      userId,
      products,
      total,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /orders/:id
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { userId, products } = req.body;

    // Validate user exists
    if (userId) {
      const user = await User.findById(userId);
      if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
      }
    }

    // Validate all products and recalculate total
    let total = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        res
          .status(400)
          .json({ message: `Product ${item.productId} not found` });
        return;
      }

      total += product.price * item.quantity;
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { userId, products, total },
      { new: true },
    );

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /orders/:id
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
