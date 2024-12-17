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
exports.OrderService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const prisma_1 = require("../../../Shared/prisma");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2024-11-20.acacia",
});
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cart = yield prisma_1.prisma.cart.findUnique({
        where: { id: payload.cartId },
        include: { cartItems: { include: { product: true } } },
    });
    if (!cart || cart.customerId !== payload.customerId) {
        throw new Error("Unauthorized access to the cart.");
    }
    const shopId = (_a = cart.cartItems[0]) === null || _a === void 0 ? void 0 : _a.product.shopId;
    if (!shopId) {
        throw new Error("Shop ID could not be determined from the cart items.");
    }
    const order = yield prisma_1.prisma.order.create({
        data: {
            orderNumber: `ORD-${Date.now()}`,
            totalAmount: payload.totalAmount,
            customerId: payload.customerId,
            shopId,
            status: "PENDING",
            paymentStatus: "PAID",
            orderItems: {
                create: cart.cartItems.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.product.price,
                })),
            },
        },
    });
    yield prisma_1.prisma.cart.update({
        where: { id: payload.cartId },
        data: { cartItems: { deleteMany: {} } },
    });
    return order;
});
const createPaymentIntent = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prisma_1.prisma.order.findUnique({
        where: { id: orderId },
    });
    if (!order)
        throw new Error("Order not found.");
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: Math.round(order.totalAmount * 100),
        currency: "usd",
        payment_method_types: ["card"],
        metadata: { orderId },
    });
    return { clientSecret: paymentIntent.client_secret };
});
const getAllOrders = (_a) => __awaiter(void 0, [_a], void 0, function* ({ role, userId, page, limit, status, customerId, shopId, }) {
    const offset = (page - 1) * limit;
    const whereClause = {};
    if (status) {
        whereClause.status = status;
    }
    if (customerId) {
        whereClause.customerId = customerId;
    }
    if (shopId) {
        whereClause.shopId = shopId;
    }
    if (role === "VENDOR") {
        const shop = yield prisma_1.prisma.shop.findUnique({ where: { userId } });
        if (!shop)
            throw new Error("Shop not found for this vendor.");
        whereClause.shopId = shop.id;
    }
    const orders = yield prisma_1.prisma.order.findMany({
        where: whereClause,
        include: { orderItems: { include: { product: true } } },
        skip: offset,
        take: limit,
        orderBy: { createdAt: "desc" },
    });
    const totalOrders = yield prisma_1.prisma.order.count({ where: whereClause });
    return {
        orders,
        totalOrders,
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
    };
});
const updateOrderStatus = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.order.update({
        where: { id: orderId },
        data: { status },
    });
});
const getOrderDetails = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.prisma.order.findUnique({
        where: { id: orderId },
        include: { orderItems: { include: { product: true } } },
    });
});
const getOrderHistory = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, role, page, limit, }) {
    const customer = yield prisma_1.prisma.customer.findUnique({
        where: { id },
        select: { id: true },
    });
    if (!customer) {
        throw new Error("Customer not found for this user.");
    }
    const orders = yield prisma_1.prisma.order.findMany({
        where: { customerId: customer.id },
        include: {
            orderItems: {
                include: { product: true },
            },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
    });
    return orders;
});
exports.OrderService = {
    createOrder,
    createPaymentIntent,
    updateOrderStatus,
    getOrderDetails,
    getOrderHistory,
    getAllOrders,
};
