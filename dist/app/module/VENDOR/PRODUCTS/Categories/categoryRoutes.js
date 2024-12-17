"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = require("express");
const categoryController_1 = require("./categoryController");
const router = (0, express_1.Router)();
router.post("/", categoryController_1.createCategoryHandler);
router.get("/", categoryController_1.getAllCategoriesHandler);
// router.get("/categories/:id", getCategoryByIdHandler); // Read Single
router.put("/:id", categoryController_1.updateCategoryHandler);
router.delete("/:id", categoryController_1.deleteCategoryHandler);
exports.CategoryRoutes = router;
