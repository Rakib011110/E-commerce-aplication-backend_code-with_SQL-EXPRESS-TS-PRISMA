import express from "express";
import { UserRoutes } from "../module/USERS/user.routes";
import { AuthRoutes } from "../module/AUTH/auth.routes";
import { AdminRouter } from "../module/ADMIN/admin.routes";
import { CustomerRouter } from "../module/CUSTOMER/customer.routes";

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
];

moduleRoutes.forEach((route) => routers.use(route.path, route.router));
export default routers;
