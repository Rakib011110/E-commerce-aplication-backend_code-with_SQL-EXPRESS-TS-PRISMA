import express from "express";
import { OrderController } from "./order.controller";
import { UserRole } from "@prisma/client";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth(UserRole.CUSTOMER), OrderController.createOrder); // Place order
router.post(
  "/:id/payment-intent",
  auth(UserRole.CUSTOMER),
  OrderController.createPaymentIntent
); // Create payment intent
router.put("/:id", auth(UserRole.CUSTOMER), OrderController.updateOrderStatus); // Update order status
router.get("/:id", auth(UserRole.CUSTOMER), OrderController.getOrderDetails); // Get order details

export const OrderRoutes = router;
