import express from "express";
import { CartController } from "./cart.controller";
import { auth } from "../../../middlewares/auth";
import { UserRole } from "@prisma/client";
const router = express.Router();

router.post(
  "/items",

  CartController.addItemToCart
);

router.get("/items", auth(UserRole.CUSTOMER), CartController.getCartItems);

router.put(
  "/items/:id",
  auth(UserRole.CUSTOMER),
  CartController.updateCartItem
);

router.delete(
  "/items/:id",
  auth(UserRole.CUSTOMER),
  CartController.removeCartItem
);

export const CartRoutes = router;
