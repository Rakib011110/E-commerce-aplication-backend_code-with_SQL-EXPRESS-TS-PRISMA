import express from "express";
import { UserRoutes } from "../module/USERS/user.routes";
import { AuthRoutes } from "../module/AUTH/auth.routes";
import { AdminRouter } from "../module/ADMIN/admin.routes";
import { CustomerRouter } from "../module/CUSTOMER/customer.routes";
import { VendorRoutes } from "../module/VENDOR/vendor.routes";
import { ShopRouter } from "../module/VENDOR/SHOP/shop.routes";
import { ProductRoutes } from "../module/VENDOR/PRODUCTS/product.routes";
import { CartRoutes } from "../module/CUSTOMER/CART/cart.routes";
import { ShopFollowRoutes } from "../module/CUSTOMER/FOLLOW/follow.routes";
import { OrderRoutes } from "../module/ORDER/order.routes";
import { ReviewsRoutes } from "../module/CUSTOMER/REVIEWS/review.routes";
import { CategoryRoutes } from "../module/VENDOR/PRODUCTS/Categories/categoryRoutes";

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
    path: "/follow",
    router: ShopFollowRoutes,
  },

  {
    path: "/product",
    router: ProductRoutes,
  },
  {
    path: "/categories",
    router: CategoryRoutes,
  },
  {
    path: "/review",
    router: ReviewsRoutes,
  },
  {
    path: "/cart",
    router: CartRoutes,
  },
  {
    path: "/order",
    router: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => routers.use(route.path, route.router));
export default routers;
