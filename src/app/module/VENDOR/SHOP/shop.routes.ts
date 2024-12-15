import express from "express";
import { ShopController } from "./shop.controller";
import { UserRole } from "@prisma/client";
import { auth } from "../../../middlewares/auth";

const router = express.Router();

router.post("/", auth(UserRole.VENDOR), ShopController.createShop);
router.get("/", ShopController.getAllShop);
router.get("/:id", ShopController.getShopById);
router.put("/:id", ShopController.updateShop);
router.delete("/:id", ShopController.softDeleteShop);

export const ShopRouter = router;
