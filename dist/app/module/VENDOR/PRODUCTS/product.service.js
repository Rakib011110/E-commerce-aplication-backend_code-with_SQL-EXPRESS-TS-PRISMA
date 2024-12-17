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
exports.ProductService = void 0;
const prisma_1 = require("../../../../Shared/prisma");
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma_1.prisma.product.create({
        data: payload,
    });
    return product;
});
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma_1.prisma.product.findMany({
        where: {
            isDeleted: false,
        },
    });
    return products;
});
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma_1.prisma.product.findUnique({
        where: {
            id,
        },
        include: { reviews: true },
    });
    return product;
});
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma_1.prisma.product.update({
        where: { id },
        data: payload,
    });
    return product;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma_1.prisma.product.delete({
        where: { id },
    });
    return product;
});
exports.ProductService = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
