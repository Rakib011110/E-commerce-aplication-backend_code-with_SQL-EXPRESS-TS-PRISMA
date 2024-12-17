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
exports.AdminController = void 0;
const catchAsynce_1 = require("../../../Shared/catchAsynce");
const sendResponse_1 = __importDefault(require("../../../Shared/sendResponse"));
const addmin_service_1 = require("./addmin.service");
const getAllAdminFromDB = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield addmin_service_1.AdminService.getAllDBFormDB();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Admins retrieved successfully",
        data: result,
    });
}));
const getAdminById = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield addmin_service_1.AdminService.getAdminById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Admin retrieved successfully",
        data: result,
    });
}));
const updateAdminById = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    const result = yield addmin_service_1.AdminService.updateAdminById(id, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Admin updated successfully",
        data: result,
    });
}));
const softDeleteAdminById = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield addmin_service_1.AdminService.softDeleteAdminById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Admin deleted successfully",
        data: result,
    });
}));
exports.AdminController = {
    getAllAdminFromDB,
    getAdminById,
    updateAdminById,
    softDeleteAdminById,
};
