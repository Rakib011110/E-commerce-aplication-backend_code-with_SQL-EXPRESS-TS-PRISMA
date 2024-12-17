import { Request, Response } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./categoryService";
// Create a category
export const createCategoryHandler = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const category = await createCategory(name);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating category" });
  }
};

export const getAllCategoriesHandler = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching categories" });
  }
};

export const getCategoryByIdHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching category" });
  }
};

export const updateCategoryHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await updateCategory(id, name);
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating category" });
  }
};

export const deleteCategoryHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteCategory(id);
    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting category" });
  }
};
