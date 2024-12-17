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
exports.ReviewService = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = require("../../../../Shared/prisma");
const ApiError_1 = __importDefault(require("../../../Error/ApiError"));
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield prisma_1.prisma.review.create({
        data: {
            productId: payload.productId,
            userId: payload.userId,
            rating: payload.rating,
            //   comment: payload.comment,
            comment: payload.comment,
            email: payload.email,
        },
    });
    return review;
});
const getAllCustomerReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield prisma_1.prisma.review.findMany({
        where: {
            isDeleted: false,
        },
        include: {
            customer: true,
            product: true,
        },
    });
    return reviews;
});
const getReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield prisma_1.prisma.review.findUnique({
        where: { id },
    });
    if (!review) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Review not found");
    }
    return review;
});
const updateReview = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield prisma_1.prisma.review.update({
        where: { id },
        data: Object.assign({}, payload),
    });
    return review;
});
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.review.delete({
        where: { id },
    });
    return { message: "Review deleted successfully" };
});
const addVendorReply = (id, vendorReply) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield prisma_1.prisma.review.update({
        where: { id },
        data: { vendorReply },
    });
    if (!review) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Review not found.");
    }
    return review;
});
const getVendorReviews = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield prisma_1.prisma.review.findMany({
        where: {
            product: {
                shop: {
                    userId: userId, // Match vendor ID
                },
            },
        },
        include: {
            customer: true,
            product: true,
        },
    });
    return reviews;
});
exports.ReviewService = {
    createReview,
    getReview,
    updateReview,
    deleteReview,
    addVendorReply,
    getVendorReviews,
    getAllCustomerReviews,
};
