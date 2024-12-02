import express from "express";
import { UserRoutes } from "../module/USERS/user.routes";

const routers = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    router: UserRoutes,
  },
];

moduleRoutes.forEach((route) => routers.use(route.path, route.router));
export default routers;
