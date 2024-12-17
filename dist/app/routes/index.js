"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../module/USERS/user.routes");
const auth_routes_1 = require("../module/AUTH/auth.routes");
const admin_routes_1 = require("../module/ADMIN/admin.routes");
const customer_routes_1 = require("../module/CUSTOMER/customer.routes");
const vendor_routes_1 = require("../module/VENDOR/vendor.routes");
const shop_routes_1 = require("../module/VENDOR/SHOP/shop.routes");
const product_routes_1 = require("../module/VENDOR/PRODUCTS/product.routes");
const cart_routes_1 = require("../module/CUSTOMER/CART/cart.routes");
const follow_routes_1 = require("../module/CUSTOMER/FOLLOW/follow.routes");
const order_routes_1 = require("../module/ORDER/order.routes");
const review_routes_1 = require("../module/CUSTOMER/REVIEWS/review.routes");
const categoryRoutes_1 = require("../module/VENDOR/PRODUCTS/Categories/categoryRoutes");
const routers = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/auth",
        router: auth_routes_1.AuthRoutes,
    },
    {
        path: "/user",
        router: user_routes_1.UserRoutes,
    },
    {
        path: "/admin",
        router: admin_routes_1.AdminRouter,
    },
    {
        path: "/customer",
        router: customer_routes_1.CustomerRouter,
    },
    {
        path: "/vendor",
        router: vendor_routes_1.VendorRoutes,
    },
    {
        path: "/shop",
        router: shop_routes_1.ShopRouter,
    },
    {
        path: "/follow",
        router: follow_routes_1.ShopFollowRoutes,
    },
    {
        path: "/product",
        router: product_routes_1.ProductRoutes,
    },
    {
        path: "/categories",
        router: categoryRoutes_1.CategoryRoutes,
    },
    {
        path: "/review",
        router: review_routes_1.ReviewsRoutes,
    },
    {
        path: "/cart",
        router: cart_routes_1.CartRoutes,
    },
    {
        path: "/order",
        router: order_routes_1.OrderRoutes,
    },
];
moduleRoutes.forEach((route) => routers.use(route.path, route.router));
exports.default = routers;
