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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerServices = void 0;
const prisma_1 = require("../../../Shared/prisma");
// Get all customers
const getAllCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield prisma_1.prisma.customer.findMany({
        where: { isDeleted: false }, // Optional: Add a filter for non-deleted customers
    });
    return customers;
});
// Get customer by ID
const getCustomerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield prisma_1.prisma.customer.findUnique({
        where: { id },
    });
    return customer;
});
// Create a new customer
const createCustomer = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield prisma_1.prisma.customer.create({
        data,
    });
    return customer;
});
// Update customer by ID
const updateCustomer = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield prisma_1.prisma.customer.update({
        where: { id },
        data,
    });
    return customer;
});
// Soft delete customer by ID
const softDeleteCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield prisma_1.prisma.customer.update({
        where: { id },
        data: { isDeleted: true },
    });
    return customer;
});
exports.CustomerServices = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    softDeleteCustomer,
};
