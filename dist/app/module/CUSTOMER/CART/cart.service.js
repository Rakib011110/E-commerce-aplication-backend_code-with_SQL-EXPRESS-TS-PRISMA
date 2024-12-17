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
exports.CartService = void 0;
const prisma_1 = require("../../../../Shared/prisma");
const addItemToCart = (_a) => __awaiter(void 0, [_a], void 0, function* ({ productId, quantity, customerId, }) {
    // Check if the customer exists
    const customerExists = yield prisma_1.prisma.customer.findUnique({
        where: { id: customerId },
    });
    if (!customerExists) {
        throw new Error("Customer does not exist");
    }
    // Fetch the cart for the customer
    let cart = yield prisma_1.prisma.cart.findUnique({
        where: { customerId },
    });
    // If cart doesn't exist, create it
    if (!cart) {
        cart = yield prisma_1.prisma.cart.create({
            data: { customerId },
        });
    }
    // Add item to the cart
    const newItem = yield prisma_1.prisma.cartItem.create({
        data: {
            productId,
            quantity,
            cartId: cart.id,
        },
    });
    return newItem;
});
const getCartItems = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch the cart for the customer with items
    const cart = yield prisma_1.prisma.cart.findFirst({
        where: { customerId },
        include: {
            cartItems: {
                include: { product: true },
            },
        },
    });
    if (!cart) {
        throw new Error("Cart not found");
    }
    return cart.cartItems;
});
const getCart = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch the cart for the customer with items
    const cart = yield prisma_1.prisma.cart.findMany({
        where: { customerId },
    });
    if (!cart) {
        throw new Error("Cart not found");
    }
    return cart;
});
const updateCartItem = (id, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    // Update the quantity of the item in the cart
    const updatedItem = yield prisma_1.prisma.cartItem.update({
        where: { id },
        data: { quantity },
    });
    return updatedItem;
});
const removeCartItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Delete the item from the cart
    yield prisma_1.prisma.cartItem.delete({
        where: { id },
    });
});
exports.CartService = {
    addItemToCart,
    getCartItems,
    updateCartItem,
    removeCartItem,
    getCart,
};
