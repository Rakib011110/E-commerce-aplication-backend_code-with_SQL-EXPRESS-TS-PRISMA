"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsRoutes = void 0;
const express_1 = require("express");
const review_controller_1 = require("./review.controller");
const auth_1 = require("../../../middlewares/auth");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.auth)(client_1.UserRole.CUSTOMER, client_1.UserRole.VENDOR), review_controller_1.createReview);
router.get("/:id", (0, auth_1.auth)(client_1.UserRole.CUSTOMER, client_1.UserRole.VENDOR), review_controller_1.getReview);
router.put("/:id", (0, auth_1.auth)(client_1.UserRole.CUSTOMER), review_controller_1.updateReview);
router.delete("/:id", (0, auth_1.auth)(client_1.UserRole.CUSTOMER), review_controller_1.deleteReview);
router.put("/reply/:id", (0, auth_1.auth)(client_1.UserRole.VENDOR), review_controller_1.addVendorReply);
router.get("/", (0, auth_1.auth)(client_1.UserRole.VENDOR), review_controller_1.getAllCustomerReviews);
exports.ReviewsRoutes = router;