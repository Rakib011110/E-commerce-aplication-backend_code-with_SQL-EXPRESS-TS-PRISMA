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
exports.ShopService = void 0;
const prisma_1 = require("../../../../Shared/prisma");
const followShop = (shopId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate if the shop exists
        const shopExists = yield prisma_1.prisma.shop.findUnique({
            where: { id: shopId },
        });
        if (!shopExists) {
            throw new Error(`Shop with ID: ${shopId} does not exist.`);
        }
        // Validate if the user is a customer
        const customer = yield prisma_1.prisma.customer.findUnique({
            where: { userId },
        });
        if (!customer) {
            throw new Error(`User with ID: ${userId} is not a customer.`);
        }
        // Prevent duplicate follow
        const alreadyFollowing = yield prisma_1.prisma.shopFollowers.findUnique({
            where: {
                customerId_shopId: {
                    customerId: customer.id,
                    shopId: shopId,
                },
            },
        });
        if (alreadyFollowing) {
            throw new Error(`You are already following this shop.`);
        }
        // Create a new shop follow entry
        return yield prisma_1.prisma.shopFollowers.create({
            data: {
                customerId: customer.id,
                shopId: shopId,
            },
        });
    }
    catch (error) {
        throw error;
    }
});
const unfollowShop = (shopId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate if the shop exists
        const shopExists = yield prisma_1.prisma.shop.findUnique({
            where: { id: shopId },
        });
        if (!shopExists) {
            throw new Error(`Shop with ID: ${shopId} does not exist.`);
        }
        // Validate if the user is a customer
        const customer = yield prisma_1.prisma.customer.findUnique({
            where: { userId },
        });
        if (!customer) {
            throw new Error(`User with ID: ${userId} is not a customer.`);
        }
        // Remove the shop follow entry
        return yield prisma_1.prisma.shopFollowers.delete({
            where: {
                customerId_shopId: {
                    customerId: customer.id,
                    shopId: shopId,
                },
            },
        });
    }
    catch (error) {
        throw error;
    }
});
exports.ShopService = {
    followShop,
    unfollowShop,
};
