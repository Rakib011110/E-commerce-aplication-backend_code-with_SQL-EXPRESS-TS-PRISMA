import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post("/login", AuthController.loginUser);
router.post("/refreshtoken", AuthController.loginUser);

export const AuthRoutes = router;
