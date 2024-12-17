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
exports.auth = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../Error/ApiError"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../config"));
const auth = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized!");
            }
            // Verify and decode the token
            const verifytoken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
            if (!verifytoken) {
                throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "Invalid or expired token!");
            }
            req.user = verifytoken; // Attach decoded token to req.user
            // console.log("Decoded User:", req.user);
            // Role-based authorization
            if (roles.length && !roles.includes(verifytoken.role)) {
                throw new ApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Access denied!");
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.auth = auth;
