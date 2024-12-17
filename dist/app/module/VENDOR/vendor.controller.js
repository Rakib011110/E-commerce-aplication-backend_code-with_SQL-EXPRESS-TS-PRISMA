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
exports.VendorController = void 0;
const vendor_service_1 = require("./vendor.service");
const sendResponse_1 = __importDefault(require("../../../Shared/sendResponse"));
const catchAsynce_1 = require("../../../Shared/catchAsynce");
// Get all vendors
const getAllVendors = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield vendor_service_1.VendorServices.getAllVendors();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Vendors retrieved successfully",
        data: result,
    });
}));
// Get vendor by ID
const getVendorById = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const vendor = yield vendor_service_1.VendorServices.getVendorById(id);
    if (!vendor) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 404,
            success: false,
            message: "Vendor not found",
            data: vendor,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Vendor retrieved successfully",
        data: vendor,
    });
}));
// Update vendor by ID
const updateVendor = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedData = req.body;
    const vendor = yield vendor_service_1.VendorServices.getVendorById(id);
    if (!vendor) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 404,
            success: false,
            message: "Vendor not found",
            data: vendor,
        });
    }
    const updatedVendor = yield vendor_service_1.VendorServices.updateVendor(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Vendor updated successfully",
        data: updatedVendor,
    });
}));
// Soft delete vendor by ID
const softDeleteVendor = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const vendor = yield vendor_service_1.VendorServices.getVendorById(id);
    if (!vendor) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 404,
            success: false,
            message: "Vendor not found",
            data: vendor,
        });
    }
    const deletedVendor = yield vendor_service_1.VendorServices.softDeleteVendor(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Vendor soft deleted successfully",
        data: deletedVendor,
    });
}));
exports.VendorController = {
    getAllVendors,
    getVendorById,
    updateVendor,
    softDeleteVendor,
};
