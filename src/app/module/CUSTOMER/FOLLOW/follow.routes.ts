import express from "express";
import { ShopController } from "./follow.controller";

const router = express.Router();

router.post("/:id/follow", ShopController.followShop);
router.delete("/:id/follow", ShopController.unfollowShop);

export const FollowShopRoutes = router;
