import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/create-admin", UserController.createAdmin);
router.post("/create-vendor", UserController.createVendor);
router.post("/create-customer", UserController.createCustomer);
router.get("/", UserController.getAllUsers);
router.delete("/:id", UserController.deleteUser);
router.patch("/change-role/:id", UserController.changeRole);

export const UserRoutes = router;
