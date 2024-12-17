"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const auth_1 = require("../../../middlewares/auth");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)(client_1.UserRole.CUSTOMER, client_1.UserRole.VENDOR), product_controller_1.ProductController.createProduct);
router.get("/", product_controller_1.ProductController.getAllProducts);
router.get("/:id", product_controller_1.ProductController.getProductById);
router.put("/:id", (0, auth_1.auth)(client_1.UserRole.CUSTOMER, client_1.UserRole.VENDOR), product_controller_1.ProductController.updateProduct);
router.delete("/:id", (0, auth_1.auth)(client_1.UserRole.CUSTOMER, client_1.UserRole.VENDOR), product_controller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
