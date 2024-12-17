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
exports.ShopController = void 0;
const shop_service_1 = require("./shop.service");
const sendResponse_1 = __importDefault(require("../../../../Shared/sendResponse"));
const catchAsynce_1 = require("../../../../Shared/catchAsynce");
// Create a shop
const createShop = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, logo, description, contactNumber } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId) {
        throw new Error("Unauthorized access: Vendor ID is required to create a shop.");
    }
    const shopData = { name, logo, description, contactNumber, userId };
    console.log(shopData);
    const result = yield shop_service_1.ShopService.createShop(shopData);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Shop created successfully",
        data: result,
    });
}));
const getAllShop = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shopData = req.body;
    const result = yield shop_service_1.ShopService.getAllShop();
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Shop created successfully",
        data: result,
    });
}));
const getVendorShop = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId) {
        throw new Error("Unauthorized: No user ID found in token.");
    }
    const shop = yield shop_service_1.ShopService.getVendorShop(userId);
    if (!shop) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 404,
            success: false,
            message: "Shop not found for the vendor",
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Vendor shop retrieved successfully",
        data: shop,
    });
}));
// Get shop by ID
const getShopById = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield shop_service_1.ShopService.getShopById(id);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 404,
            success: false,
            message: "Shop not found",
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Shop retrieved successfully",
        data: result,
    });
}));
// Update shop by ID
const updateShop = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const updatedData = req.body;
    const shop = yield shop_service_1.ShopService.getShopById(id);
    if (!shop) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 404,
            success: false,
            message: "Shop not found",
            data: shop,
        });
    }
    const result = yield shop_service_1.ShopService.updateShop(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Shop updated successfully",
        data: result,
    });
}));
// Soft delete shop by ID
const softDeleteShop = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const shop = yield shop_service_1.ShopService.getShopById(id);
    if (!shop) {
        return (0, sendResponse_1.default)(res, {
            statusCode: 404,
            success: false,
            message: "Shop not found",
            data: shop,
        });
    }
    const result = yield shop_service_1.ShopService.softDeleteShop(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Shop soft deleted successfully",
        data: result,
    });
}));
exports.ShopController = {
    createShop,
    getShopById,
    updateShop,
    softDeleteShop,
    getAllShop,
    getVendorShop,
};
