"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const client_1 = require("@prisma/client");
const auth_1 = require("../../middlewares/auth");
const router = express_1.default.Router();
// Create a new order
router.post("/", (0, auth_1.auth)(client_1.UserRole.CUSTOMER), order_controller_1.OrderController.createOrder);
router.get("/", (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.CUSTOMER), order_controller_1.OrderController.getAllOrders);
// Create a Stripe payment intent
router.post("/:id", (0, auth_1.auth)(client_1.UserRole.CUSTOMER), order_controller_1.OrderController.createPaymentIntent);
router.put("/:id", (0, auth_1.auth)(client_1.UserRole.CUSTOMER, client_1.UserRole.VENDOR), order_controller_1.OrderController.updateOrderStatus);
// router.get("/:id", auth(UserRole.CUSTOMER), OrderController.getOrderDetails);
router.get("/history", (0, auth_1.auth)(client_1.UserRole.CUSTOMER, client_1.UserRole.VENDOR), order_controller_1.OrderController.getOrderHistory);
exports.OrderRoutes = router;
