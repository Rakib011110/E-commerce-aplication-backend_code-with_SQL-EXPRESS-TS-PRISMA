"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopFollowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const follow_controller_1 = require("./follow.controller");
const auth_1 = require("../../../middlewares/auth");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/:id", (0, auth_1.auth)(client_1.UserRole.CUSTOMER, client_1.UserRole.CUSTOMER), follow_controller_1.ShopController.followShop); // Follow a shop
router.delete("/:id", (0, auth_1.auth)(client_1.UserRole.CUSTOMER), follow_controller_1.ShopController.unfollowShop); // Unfollow a shop
exports.ShopFollowRoutes = router;
