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
exports.CartController = void 0;
const cart_service_1 = require("./cart.service");
const sendResponse_1 = __importDefault(require("../../../../Shared/sendResponse"));
const catchAsynce_1 = require("../../../../Shared/catchAsynce");
const addItemToCart = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { productId, quantity } = req.body;
    const customerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield cart_service_1.CartService.addItemToCart({
        productId,
        quantity,
        customerId,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Item added to cart successfully",
        data: result,
    });
}));
const getCartItems = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const customerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // Extract user ID from token (middleware)
    const result = yield cart_service_1.CartService.getCartItems(customerId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Cart items retrieved successfully",
        data: result,
    });
}));
const getCart = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const customerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const result = yield cart_service_1.CartService.getCart(customerId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Cart items retrieved successfully",
        data: result,
    });
}));
const updateCartItem = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { quantity } = req.body;
    const result = yield cart_service_1.CartService.updateCartItem(id, quantity);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Cart item updated successfully",
        data: result,
    });
}));
const removeCartItem = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield cart_service_1.CartService.removeCartItem(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Cart item removed successfully",
        data: null,
    });
}));
exports.CartController = {
    addItemToCart,
    getCartItems,
    updateCartItem,
    removeCartItem,
    getCart,
};
