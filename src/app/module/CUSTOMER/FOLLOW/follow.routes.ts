import express from "express";
import { ShopController } from "./follow.controller";
import { auth } from "../../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/:id",
  auth(UserRole.CUSTOMER, UserRole.CUSTOMER),
  ShopController.followShop
); // Follow a shop
router.delete("/:id", auth(UserRole.CUSTOMER), ShopController.unfollowShop); // Unfollow a shop

export const ShopFollowRoutes = router;
