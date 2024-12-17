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
exports.ProductController = void 0;
const catchAsynce_1 = require("../../../../Shared/catchAsynce");
const sendResponse_1 = __importDefault(require("../../../../Shared/sendResponse"));
const product_service_1 = require("./product.service");
const createProduct = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.ProductService.createProduct(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Product created successfully",
        data: result,
    });
}));
const getAllProducts = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.ProductService.getAllProducts();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Products retrieved successfully",
        data: result,
    });
}));
const getProductById = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.ProductService.getProductById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Product retrieved successfully",
        data: result,
    });
}));
const updateProduct = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.ProductService.updateProduct(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Product updated successfully",
        data: result,
    });
}));
const deleteProduct = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.ProductService.deleteProduct(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Product deleted successfully",
        data: result,
    });
}));
exports.ProductController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
