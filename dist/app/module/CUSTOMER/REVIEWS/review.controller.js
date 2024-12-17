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
exports.getVendorReviews = exports.addVendorReply = exports.deleteReview = exports.updateReview = exports.getAllCustomerReviews = exports.getReview = exports.createReview = void 0;
const review_service_1 = require("./review.service");
const sendResponse_1 = __importDefault(require("../../../../Shared/sendResponse"));
const catchAsynce_1 = require("../../../../Shared/catchAsynce");
const ApiError_1 = __importDefault(require("../../../Error/ApiError"));
const http_status_codes_1 = require("http-status-codes");
exports.createReview = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { productId, rating, comment } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const email = (_b = req.user) === null || _b === void 0 ? void 0 : _b.email;
    //   console.log(req.user);
    const review = yield review_service_1.ReviewService.createReview({
        productId,
        userId,
        rating,
        comment,
        email,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Review created successfully.",
        data: review,
    });
}));
exports.getReview = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const review = yield review_service_1.ReviewService.getReview(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Review fetched successfully.",
        data: review,
    });
}));
exports.getAllCustomerReviews = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_service_1.ReviewService.getAllCustomerReviews();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "All customer reviews fetched successfully.",
        data: reviews,
    });
}));
exports.updateReview = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const review = yield review_service_1.ReviewService.updateReview(id, { rating, comment });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Review updated successfully.",
        data: review,
    });
}));
exports.deleteReview = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield review_service_1.ReviewService.deleteReview(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Review deleted successfully.",
        data: null,
    });
}));
//  reply start
exports.addVendorReply = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Review ID
    const { vendorReply } = req.body;
    if (!vendorReply) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Vendor reply is required.");
    }
    const review = yield review_service_1.ReviewService.addVendorReply(id, vendorReply);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Vendor reply added successfully.",
        data: review,
    });
}));
exports.getVendorReviews = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const vendorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const reviews = yield review_service_1.ReviewService.getVendorReviews(vendorId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Vendor reviews fetched successfully.",
        data: reviews,
    });
}));
