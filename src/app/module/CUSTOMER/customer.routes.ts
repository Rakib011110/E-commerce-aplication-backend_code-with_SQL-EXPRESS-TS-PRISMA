import express from "express";
import { CustomerController } from "./customer.controller";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", CustomerController.getAllCustomers);
router.get("/:id", CustomerController.getCustomerById);
router.post("/", CustomerController.createCustomer);
router.put("/:id", auth(UserRole.CUSTOMER), CustomerController.updateCustomer);
router.delete("/:id", CustomerController.softDeleteCustomer);

export const CustomerRouter = router;
