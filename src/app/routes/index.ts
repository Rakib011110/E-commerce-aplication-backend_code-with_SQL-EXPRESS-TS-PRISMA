import express from "express";
import { UserRoutes } from "../module/USERS/user.routes";
import { AuthRoutes } from "../module/AUTH/auth.routes";

const routers = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    router: UserRoutes,
  },
  {
    path: "/auth",
    router: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => routers.use(route.path, route.router));
export default routers;
