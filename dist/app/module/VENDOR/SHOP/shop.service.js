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
const createShop = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield prisma_1.prisma.shop.create({
        data: {
            name: data.name,
            logo: data.logo,
            description: data.description,
            contactNumber: data.contactNumber,
            userId: data.userId,
        },
    });
    return shop;
});
const getAllShop = () => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield prisma_1.prisma.shop.findMany({
        where: {
            isBlacklisted: false,
            isDeleted: false,
        },
        include: {
            products: true,
            followers: true,
        },
    });
    return shop;
});
const updateShop = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield prisma_1.prisma.shop.update({
        where: { id },
        data,
    });
    return shop;
});
const getVendorShop = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield prisma_1.prisma.shop.findUnique({
        where: { userId, isDeleted: false },
        include: {
            products: true,
            followers: true,
        },
    });
    return shop;
});
const getShopById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield prisma_1.prisma.shop.findUnique({
        where: {
            id,
            isDeleted: false,
        },
        include: {
            products: true,
        },
    });
    return shop;
});
const softDeleteShop = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const shop = yield prisma_1.prisma.shop.update({
        where: { id },
        data: { isDeleted: true },
    });
    return shop;
});
exports.ShopService = {
    createShop,
    getAllShop,
    getShopById,
    updateShop,
    softDeleteShop,
    getVendorShop,
};
