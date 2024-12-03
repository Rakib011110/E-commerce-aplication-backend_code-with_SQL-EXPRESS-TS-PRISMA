import express from "express";
import { CustomerController } from "./customer.controller";

const router = express.Router();

router.get("/", CustomerController.getAllCustomers);
router.get("/:id", CustomerController.getCustomerById);
router.post("/", CustomerController.createCustomer);
router.put("/:id", CustomerController.updateCustomer);
router.delete("/:id", CustomerController.softDeleteCustomer);

export const CustomerRouter = router;
