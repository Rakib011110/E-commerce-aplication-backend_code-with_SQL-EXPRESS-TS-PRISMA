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
exports.ShopController = void 0;
const catchAsynce_1 = require("../../../../Shared/catchAsynce");
const sendResponse_1 = __importDefault(require("../../../../Shared/sendResponse"));
const follow_service_1 = require("./follow.service");
const followShop = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id: shopId } = req.params; // Shop ID from route
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // User ID from token
    if (!shopId || !userId) {
        throw new Error("Shop ID and User ID are required.");
    }
    const result = yield follow_service_1.ShopService.followShop(shopId, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Successfully followed the shop.",
        data: result,
    });
}));
const unfollowShop = (0, catchAsynce_1.catchAsynce)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id: shopId } = req.params; // Shop ID from route
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // User ID from token
    if (!shopId || !userId) {
        throw new Error("Shop ID and User ID are required.");
    }
    const result = yield follow_service_1.ShopService.unfollowShop(shopId, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Successfully unfollowed the shop.",
        data: result,
    });
}));
exports.ShopController = {
    followShop,
    unfollowShop,
};
