import express from "express";
import { AuthController } from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/login", AuthController.loginUser);
router.post(
  "/refreshtoken",
  auth(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.VENDOR),
  AuthController.loginUser
);

export const AuthRoutes = router;
