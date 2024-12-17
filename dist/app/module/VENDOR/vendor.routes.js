"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const vendor_controller_1 = require("./vendor.controller");
const router = express_1.default.Router();
router.get("/", vendor_controller_1.VendorController.getAllVendors);
router.get("/:id", vendor_controller_1.VendorController.getVendorById);
router.put("/:id", vendor_controller_1.VendorController.updateVendor);
router.delete("/:id", vendor_controller_1.VendorController.softDeleteVendor);
exports.VendorRoutes = router;
