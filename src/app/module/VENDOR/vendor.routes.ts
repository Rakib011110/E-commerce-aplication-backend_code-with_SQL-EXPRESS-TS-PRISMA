import express from "express";
import { VendorController } from "./vendor.controller";

const router = express.Router();

router.get("/", VendorController.getAllVendors);
router.get("/:id", VendorController.getVendorById);
router.put("/:id", VendorController.updateVendor);
router.delete("/:id", VendorController.softDeleteVendor);

export const VendorRoutes = router;
