"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryHandler = exports.updateCategoryHandler = exports.getCategoryByIdHandler = exports.getAllCategoriesHandler = exports.createCategoryHandler = void 0;
const categoryService_1 = require("./categoryService");
// Create a category
const createCategoryHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const category = yield (0, categoryService_1.createCategory)(name);
        res.status(201).json({ success: true, data: category });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error creating category" });
    }
});
exports.createCategoryHandler = createCategoryHandler;
const getAllCategoriesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, categoryService_1.getAllCategories)();
        res.status(200).json({ success: true, data: categories });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error fetching categories" });
    }
});
exports.getAllCategoriesHandler = getAllCategoriesHandler;
const getCategoryByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield (0, categoryService_1.getCategoryById)(id);
        if (!category) {
            return res
                .status(404)
                .json({ success: false, message: "Category not found" });
        }
        res.status(200).json({ success: true, data: category });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error fetching category" });
    }
});
exports.getCategoryByIdHandler = getCategoryByIdHandler;
const updateCategoryHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedCategory = yield (0, categoryService_1.updateCategory)(id, name);
        res.status(200).json({ success: true, data: updatedCategory });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error updating category" });
    }
});
exports.updateCategoryHandler = updateCategoryHandler;
const deleteCategoryHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, categoryService_1.deleteCategory)(id);
        res
            .status(200)
            .json({ success: true, message: "Category deleted successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Error deleting category" });
    }
});
exports.deleteCategoryHandler = deleteCategoryHandler;
