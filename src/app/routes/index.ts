import express from "express";
import { UserRoutes } from "../module/USERS/user.routes";
import { AuthRoutes } from "../module/AUTH/auth.routes";
import { AdminRouter } from "../module/ADMIN/admin.routes";
import { CustomerRouter } from "../module/CUSTOMER/customer.routes";
import { VendorRoutes } from "../module/VENDOR/vendor.routes";
import { ShopRouter } from "../module/VENDOR/SHOP/shop.routes";
import { ProductRoutes } from "../module/VENDOR/PRODUCTS/product.routes";

const routers = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    router: AuthRoutes,
  },
  {
    path: "/user",
    router: UserRoutes,
  },
  {
    path: "/admin",
    router: AdminRouter,
  },
  {
    path: "/customer",
    router: CustomerRouter,
  },
  {
    path: "/vendor",
    router: VendorRoutes,
  },
  {
    path: "/shop",
    router: ShopRouter,
  },
  {
    path: "/product",
    router: ProductRoutes,
  },
];

moduleRoutes.forEach((route) => routers.use(route.path, route.router));
export default routers;
