import { Router } from "express";
import {
  createReview,
  deleteReview,
  getReview,
  updateReview,
} from "./review.controller";
import { auth } from "../../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/", auth(UserRole.CUSTOMER), createReview);
router.get("/:id", auth(UserRole.CUSTOMER), getReview);
router.put("/:id", auth(UserRole.CUSTOMER), updateReview);
router.delete("/:id", auth(UserRole.CUSTOMER), deleteReview);

export const ReviewsRoutes = router;
