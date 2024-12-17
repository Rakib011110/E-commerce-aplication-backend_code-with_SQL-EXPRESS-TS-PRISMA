import { Router } from "express";
import {
  addVendorReply,
  createReview,
  deleteReview,
  getAllCustomerReviews,
  getReview,
  getVendorReviews,
  updateReview,
} from "./review.controller";
import { auth } from "../../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post("/", auth(UserRole.CUSTOMER, UserRole.VENDOR), createReview);
router.get("/:id", auth(UserRole.CUSTOMER, UserRole.VENDOR), getReview);
router.put("/:id", auth(UserRole.CUSTOMER), updateReview);
router.delete("/:id", auth(UserRole.CUSTOMER), deleteReview);
router.put("/reply/:id", auth(UserRole.VENDOR), addVendorReply);
router.get("/", auth(UserRole.VENDOR), getAllCustomerReviews);

export const ReviewsRoutes = router;
