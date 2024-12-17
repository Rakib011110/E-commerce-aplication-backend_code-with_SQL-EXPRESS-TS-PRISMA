import express from "express";
import { ProductController } from "./product.controller";
import { auth } from "../../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.CUSTOMER, UserRole.VENDOR),
  ProductController.createProduct
);

router.get("/", ProductController.getAllProducts);

router.get("/:id", ProductController.getProductById);

router.put(
  "/:id",
  auth(UserRole.CUSTOMER, UserRole.VENDOR),
  ProductController.updateProduct
);

router.delete(
  "/:id",
  auth(UserRole.CUSTOMER, UserRole.VENDOR),
  ProductController.deleteProduct
);

export const ProductRoutes = router;
