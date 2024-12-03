import express from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

// Route to get all admins
router.get("/", AdminController.getAllAdminFromDB);

// Route to get an admin by ID
router.get("/:id", AdminController.getAdminById);

// Route to update an admin by ID
router.patch("/:id", AdminController.updateAdminById);

// Route to soft delete an admin by ID
router.delete("/:id", AdminController.softDeleteAdminById);

export const AdminRouter = router;
