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
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const catchAsynce_1 = require("../../../Shared/catchAsynce");
const sendResponse_1 = __importDefault(require("../../../Shared/sendResponse"));
const createOrder = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { cartId, totalAmount } = req.body;
    const customerId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const order = yield order_service_1.OrderService.createOrder({
        cartId,
        customerId,
        totalAmount,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Order created successfully.",
        data: order,
    });
}));
const createPaymentIntent = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: orderId } = req.params;
    const paymentIntent = yield order_service_1.OrderService.createPaymentIntent(orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Payment intent created successfully.",
        data: paymentIntent,
    });
}));
const getAllOrders = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { page = 1, limit = 10, status, customerId, shopId } = req.query;
    const role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId;
    const orders = yield order_service_1.OrderService.getAllOrders({
        role,
        userId,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        status: status,
        customerId: customerId,
        shopId: shopId,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Orders fetched successfully.",
        data: orders,
    });
}));
const updateOrderStatus = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: orderId } = req.params;
    const { status } = req.body;
    const order = yield order_service_1.OrderService.updateOrderStatus(orderId, status);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `Order status updated to ${status}.`,
        data: order,
    });
}));
const getOrderDetails = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: orderId } = req.params;
    const order = yield order_service_1.OrderService.getOrderDetails(orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order details fetched successfully.",
        data: order,
    });
}));
const getOrderHistory = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
    const { page = 1, limit = 10 } = req.query;
    console.log("Fetching Order History");
    console.log("User ID:", id);
    console.log("Role:", role);
    console.log("Page:", page, "Limit:", limit);
    const orders = yield order_service_1.OrderService.getOrderHistory({
        id,
        role,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
    });
    console.log("Fetched Orders:", orders);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order history fetched successfully.",
        data: orders,
    });
}));
exports.OrderController = {
    createOrder,
    createPaymentIntent,
    updateOrderStatus,
    getOrderDetails,
    getOrderHistory,
    getAllOrders,
};
