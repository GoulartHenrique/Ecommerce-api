import { Request, Response } from "express";
import { Product, Category } from "../models";

// GET /products (supports ?categoryId= filter)
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.query;
    const filter = categoryId ? { categoryId: String(categoryId) } : {};

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /products/:id
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /products
export const createProduct = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.body.categoryId);

    if (!category) {
      res.status(400).json({ message: "Category not found" });
      return;
    }

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /products/:id
export const updateProduct = async (req: Request, res: Response) => {
  try {
    if (req.body.categoryId) {
      const category = await Category.findById(req.body.categoryId);

      if (!category) {
        res.status(400).json({ message: "Category not found" });
        return;
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /products/:id
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
