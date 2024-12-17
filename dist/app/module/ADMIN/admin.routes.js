"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
// Route to get all admins
router.get("/", admin_controller_1.AdminController.getAllAdminFromDB);
// Route to get an admin by ID
router.get("/:id", admin_controller_1.AdminController.getAdminById);
// Route to update an admin by ID
router.patch("/:id", admin_controller_1.AdminController.updateAdminById);
// Route to soft delete an admin by ID
router.delete("/:id", admin_controller_1.AdminController.softDeleteAdminById);
exports.AdminRouter = router;
