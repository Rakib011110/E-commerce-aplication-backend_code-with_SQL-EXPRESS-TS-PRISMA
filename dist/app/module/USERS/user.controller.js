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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
// Create Admin Controller
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.createAdmin(req.body);
        res.status(200).json({
            success: true,
            message: "Admin created successfully",
            data: result,
        });
    }
    catch (err) {
        console.error("Error creating admin:", err);
        res.status(500).json({
            success: false,
            message: (err === null || err === void 0 ? void 0 : err.message) || "Something went wrong",
            error: err,
        });
    }
});
// Create Vendor Controller
const createVendor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const result = yield user_service_1.UserServices.createVendor(req.body);
        res.status(200).json({
            success: true,
            message: "Vendor created successfully",
            data: result,
        });
    }
    catch (err) {
        console.error("Error creating vendor:", err);
        res.status(500).json({
            success: false,
            message: (err === null || err === void 0 ? void 0 : err.message) || "Something went wrong",
            error: err,
        });
    }
});
// Create Customer Controller
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.createCustomer(req.body);
        res.status(200).json({
            success: true,
            message: "Customer created successfully",
            data: result,
        });
    }
    catch (err) {
        console.error("Error creating customer:", err);
        res.status(500).json({
            success: false,
            message: (err === null || err === void 0 ? void 0 : err.message) || "Something went wrong",
            error: err,
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUsers();
        res.status(200).json({
            success: true,
            message: "All users fetched successfully",
            data: result,
        });
    }
    catch (err) {
        console.error("Error fetching all users:", err);
        res.status(500).json({
            success: false,
            message: (err === null || err === void 0 ? void 0 : err.message) || "Something went wrong",
            error: err,
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield user_service_1.UserServices.deleteUser(id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: result,
        });
    }
    catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({
            success: false,
            message: (err === null || err === void 0 ? void 0 : err.message) || "Something went wrong",
            error: err,
        });
    }
});
const changeRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { role } = req.body;
    try {
        const result = yield user_service_1.UserServices.changeRole(id, role);
        res.status(200).json({
            success: true,
            message: `User role updated to ${role} successfully`,
            data: result,
        });
    }
    catch (err) {
        console.error("Error changing user role:", err);
        res.status(500).json({
            success: false,
            message: (err === null || err === void 0 ? void 0 : err.message) || "Something went wrong",
            error: err,
        });
    }
});
exports.UserController = {
    createAdmin,
    createVendor,
    createCustomer,
    getAllUsers,
    deleteUser,
    changeRole,
};
