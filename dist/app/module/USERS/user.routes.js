"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/create-admin", user_controller_1.UserController.createAdmin);
router.post("/create-vendor", user_controller_1.UserController.createVendor);
router.post("/create-customer", user_controller_1.UserController.createCustomer);
router.get("/", user_controller_1.UserController.getAllUsers);
router.delete("/:id", user_controller_1.UserController.deleteUser);
router.patch("/change-role/:id", user_controller_1.UserController.changeRole);
exports.UserRoutes = router;
