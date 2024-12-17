import express from "express";
import { OrderController } from "./order.controller";
import { UserRole } from "@prisma/client";
import { auth } from "../../middlewares/auth";

const router = express.Router();

// Create a new order
router.post("/", auth(UserRole.CUSTOMER), OrderController.createOrder);
router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER),
  OrderController.getAllOrders
);

// Create a Stripe payment intent
router.post(
  "/:id",
  auth(UserRole.CUSTOMER),
  OrderController.createPaymentIntent
);

router.put(
  "/:id",
  auth(UserRole.CUSTOMER, UserRole.VENDOR),
  OrderController.updateOrderStatus
);

// router.get("/:id", auth(UserRole.CUSTOMER), OrderController.getOrderDetails);

router.get(
  "/history",
  auth(UserRole.CUSTOMER, UserRole.VENDOR),
  OrderController.getOrderHistory
);

export const OrderRoutes = router;
