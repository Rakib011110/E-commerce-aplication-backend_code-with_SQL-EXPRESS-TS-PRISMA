"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopRouter = void 0;
const express_1 = __importDefault(require("express"));
const shop_controller_1 = require("./shop.controller");
const client_1 = require("@prisma/client");
const auth_1 = require("../../../middlewares/auth");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)(client_1.UserRole.VENDOR), shop_controller_1.ShopController.createShop);
router.get("/vendor", (0, auth_1.auth)(client_1.UserRole.VENDOR), shop_controller_1.ShopController.getVendorShop);
router.get("/", shop_controller_1.ShopController.getAllShop);
router.get("/:id", shop_controller_1.ShopController.getShopById);
router.put("/", (0, auth_1.auth)(client_1.UserRole.VENDOR), shop_controller_1.ShopController.updateShop);
router.delete("/:id", shop_controller_1.ShopController.softDeleteShop);
exports.ShopRouter = router;
