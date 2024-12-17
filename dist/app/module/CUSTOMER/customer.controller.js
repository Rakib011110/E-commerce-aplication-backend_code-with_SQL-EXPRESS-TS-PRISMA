"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const catchAsynce_1 = require("../../../Shared/catchAsynce");
const customer_service_1 = require("./customer.service");
const sendResponse_1 = __importDefault(require("../../../Shared/sendResponse"));
// Get all customers
const getAllCustomers = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield customer_service_1.CustomerServices.getAllCustomers();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "All customers retrieved successfully",
        data: result,
    });
}));
// Get customer by ID
const getCustomerById = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield customer_service_1.CustomerServices.getCustomerById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Customer retrieved successfully",
        data: result,
    });
}));
// Create a new customer
const createCustomer = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customerData = req.body;
    const result = yield customer_service_1.CustomerServices.createCustomer(customerData);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Customer created successfully",
        data: result,
    });
}));
// Update customer by ID
const updateCustomer = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const customerData = req.body;
    const result = yield customer_service_1.CustomerServices.updateCustomer(id, customerData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Customer updated successfully",
        data: result,
    });
}));
// Soft delete customer by ID
const softDeleteCustomer = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield customer_service_1.CustomerServices.softDeleteCustomer(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Customer deleted successfully",
        data: result,
    });
}));
exports.CustomerController = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    softDeleteCustomer,
};
