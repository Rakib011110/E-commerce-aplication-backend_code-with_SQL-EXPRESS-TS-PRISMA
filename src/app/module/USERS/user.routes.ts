import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/create-admin", UserController.createAdmin);
router.post("/create-vendor", UserController.createVendor);
router.post("/create-customer", UserController.createCustomer);

export const UserRoutes = router;
