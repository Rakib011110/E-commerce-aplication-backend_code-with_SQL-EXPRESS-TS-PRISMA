import express from "express";
import { ShopController } from "./shop.controller";

const router = express.Router();

router.post("/", ShopController.createShop);
router.get("/", ShopController.getAllShop);
router.get("/:id", ShopController.getShopById);
router.put("/:id", ShopController.updateShop);
router.delete("/:id", ShopController.softDeleteShop);

export const ShopRouter = router;
