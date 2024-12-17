"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRouter = void 0;
const express_1 = __importDefault(require("express"));
const customer_controller_1 = require("./customer.controller");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", customer_controller_1.CustomerController.getAllCustomers);
router.get("/:id", customer_controller_1.CustomerController.getCustomerById);
router.post("/", customer_controller_1.CustomerController.createCustomer);
router.put("/:id", (0, auth_1.auth)(client_1.UserRole.CUSTOMER), customer_controller_1.CustomerController.updateCustomer);
router.delete("/:id", customer_controller_1.CustomerController.softDeleteCustomer);
exports.CustomerRouter = router;
