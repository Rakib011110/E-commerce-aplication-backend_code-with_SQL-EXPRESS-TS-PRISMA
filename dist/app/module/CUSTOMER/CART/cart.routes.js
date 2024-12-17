"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
const auth_1 = require("../../../middlewares/auth");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/items", (0, auth_1.auth)(client_1.UserRole.CUSTOMER), cart_controller_1.CartController.addItemToCart);
router.get("/items", (0, auth_1.auth)(client_1.UserRole.CUSTOMER), cart_controller_1.CartController.getCartItems);
router.get("/", (0, auth_1.auth)(client_1.UserRole.CUSTOMER), cart_controller_1.CartController.getCart);
router.put("/items/:id", (0, auth_1.auth)(client_1.UserRole.CUSTOMER), cart_controller_1.CartController.updateCartItem);
router.delete("/items/:id", (0, auth_1.auth)(client_1.UserRole.CUSTOMER), cart_controller_1.CartController.removeCartItem);
exports.CartRoutes = router;
