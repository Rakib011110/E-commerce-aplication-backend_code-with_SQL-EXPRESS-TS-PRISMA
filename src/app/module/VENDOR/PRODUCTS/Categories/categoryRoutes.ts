import { Router } from "express";
import {
  createCategoryHandler,
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from "./categoryController";

const router = Router();

router.post("/", createCategoryHandler);
router.get("/", getAllCategoriesHandler);
// router.get("/categories/:id", getCategoryByIdHandler); // Read Single
router.put("/:id", updateCategoryHandler);
router.delete("/:id", deleteCategoryHandler);

export const CategoryRoutes = router;
