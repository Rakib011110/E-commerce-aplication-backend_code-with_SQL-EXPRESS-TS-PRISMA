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
exports.UserServices = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../../Shared/prisma");
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(payload.password, 12);
        const userData = {
            email: payload.admin.email,
            password: hashedPassword,
            role: client_1.UserRole.ADMIN,
        };
        const result = yield prisma_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield transactionClient.user.create({ data: userData });
            const createdAdminData = yield transactionClient.admin.create({
                data: {
                    name: payload.admin.name,
                    profilePhoto: payload.admin.profilePhoto,
                    userId: user.id,
                },
            });
            return createdAdminData;
        }));
        return result;
    }
    catch (error) {
        throw new Error(error.message || "Failed to create admin");
    }
});
const createVendor = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(payload.password, 12);
        const userData = {
            email: payload.vendor.email,
            password: hashedPassword,
            role: client_1.UserRole.VENDOR,
        };
        const result = yield prisma_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield transactionClient.user.create({ data: userData });
            const createdVendorData = yield transactionClient.vendor.create({
                data: {
                    contactNumber: payload.vendor.contactNumber,
                    profilePhoto: payload.vendor.profilePhoto,
                    userId: user.id,
                },
            });
            return createdVendorData;
        }));
        return result;
    }
    catch (error) {
        throw new Error(error.message || "Failed to create vendor");
    }
});
const createCustomer = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(payload.password, 12);
        const userData = {
            email: payload.customer.email,
            password: hashedPassword,
            role: client_1.UserRole.CUSTOMER,
        };
        const result = yield prisma_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield transactionClient.user.create({ data: userData });
            const createdCustomerData = yield transactionClient.customer.create({
                data: {
                    name: payload.customer.name,
                    contactNumber: payload.customer.contactNumber,
                    profilePhoto: payload.customer.profilePhoto,
                    address: payload.customer.address,
                    userId: user.id,
                },
            });
            return createdCustomerData;
        }));
        return result;
    }
    catch (error) {
        throw new Error(error.message || "Failed to create customer");
    }
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield prisma_1.prisma.admin.findMany({
            where: {
                isDeleted: false,
            },
            include: { user: true },
        });
        const vendors = yield prisma_1.prisma.vendor.findMany({
            include: { user: true },
            where: {
                isDeleted: false,
            },
        });
        const customers = yield prisma_1.prisma.customer.findMany({
            where: {
                isDeleted: false,
            },
            include: { user: true },
        });
        return {
            admins,
            vendors,
            customers,
        };
    }
    catch (error) {
        throw new Error(error.message || "Failed to fetch all users");
    }
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield prisma_1.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) {
            throw new Error("User not found");
        }
        if (existingUser.isDeleted) {
            throw new Error("User is already deleted");
        }
        const deletedUser = yield prisma_1.prisma.user.update({
            where: { id: userId },
            data: { isDeleted: true },
        });
        return deletedUser;
    }
    catch (error) {
        throw new Error(error.message || "Failed to delete user");
    }
});
const changeRole = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate role
        if (!Object.values(client_1.UserRole).includes(role)) {
            throw new Error("Invalid role provided");
        }
        // Check if user exists
        const existingUser = yield prisma_1.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!existingUser) {
            throw new Error("User not found");
        }
        if (existingUser.isDeleted) {
            throw new Error("Cannot change role of a deleted user");
        }
        // Update role
        const updatedUser = yield prisma_1.prisma.user.update({
            where: { id: userId },
            data: { role },
        });
        return updatedUser;
    }
    catch (error) {
        throw new Error(error.message || "Failed to change user role");
    }
});
exports.UserServices = {
    createAdmin,
    createVendor,
    createCustomer,
    getAllUsers,
    deleteUser,
    changeRole,
};
