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
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../Shared/prisma");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const sendEmail_1 = __importDefault(require("./sendEmail"));
const ApiError_1 = __importDefault(require("../../Error/ApiError"));
const http_status_codes_1 = require("http-status-codes");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const userData = yield prisma_1.prisma.user.findUnique({
        where: {
            email: payload.email,
            status: client_1.UserStatus.ACTIVE,
        },
        include: {
            admin: true,
            vendor: true,
            customer: true,
        },
    });
    if (!userData) {
        throw new Error("User not found");
    }
    const isCorrectPassword = yield bcrypt_1.default.compare(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new Error("Password is incorrect!");
    }
    // Include userId based on role
    const userId = ((_a = userData.admin) === null || _a === void 0 ? void 0 : _a.id) ||
        ((_b = userData.vendor) === null || _b === void 0 ? void 0 : _b.id) ||
        ((_c = userData.customer) === null || _c === void 0 ? void 0 : _c.id) ||
        userData.id;
    // Structure the token payload
    const tokenPayload = {
        id: userData.id,
        email: userData.email,
        role: userData.role,
        userId, // Include userId for role-based access
        status: userData.status,
        needPasswordChange: userData.needPassowordChange,
        associatedData: {
            admin: userData.admin,
            vendor: userData.vendor,
            customer: userData.customer,
        },
    };
    const accessToken = (0, jwtHelpers_1.generateToken)(tokenPayload, config_1.default.jwt.secret, config_1.default.jwt.expiresIn);
    const refreshToken = (0, jwtHelpers_1.generateToken)({
        email: userData.email,
        role: userData.role,
    }, config_1.default.jwt.refreshTokenSecret, config_1.default.jwt.refreshTokenExpiresIn);
    console.log(accessToken);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        // decodedData = jwt.verify(token, "secreatekeysss") as JwtPayload;
        decodedData = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refreshTokenSecret);
        // console.log(decodedData);
    }
    catch (error) {
        throw new Error("You are not authorized!");
    }
    const decodedUserData = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData === null || decodedData === void 0 ? void 0 : decodedData.email,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    const accessToken = (0, jwtHelpers_1.generateToken)({
        email: decodedUserData.email,
        id: decodedUserData.id,
        role: decodedUserData.role,
    }, config_1.default.jwt.secret, // "secreatekeysss",
    config_1.default.jwt.expiresIn //     "15m"
    );
    return {
        // userData,
        accessToken,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    console.log(userData);
    const isCorrectPassword = yield bcrypt_1.default.compare(payload.oldPassword, userData.password);
    if (!isCorrectPassword) {
        throw new Error("password is incorrect!");
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.newPassword, 12);
    yield prisma_1.prisma.user.update({
        where: {
            email: userData.email,
        },
        data: {
            password: hashedPassword,
            needPassowordChange: false,
        },
    });
    return {
        message: "Password Change Success",
    };
});
const forgotPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    const resetPassToken = jwtHelpers_1.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role,
    }, config_1.default.jwt.resetPasswordTokenSecret, config_1.default.jwt.resetPasswordTokenExpiresIn);
    const resetPassLink = config_1.default.resetPasswordLink + `?userId=${userData.id}&token=${resetPassToken}`;
    yield (0, sendEmail_1.default)(userData.email, `
        <div>
            <p>Dear User,</p>
            <p>Your password reset link 
                <a href=${resetPassLink}>
                    <button>
                        Reset Password
                    </button>
                </a>
            </p>

        </div>
        `);
    console.log("resetPassLink", resetPassLink);
});
const resetPassword = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ token, payload });
    yield prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            id: payload.id,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    const isValidToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.resetPasswordTokenSecret);
    if (!isValidToken) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Forbidden!");
    }
    const password = yield bcrypt_1.default.hash(payload.password, 12);
    yield prisma_1.prisma.user.update({
        where: {
            id: payload.id,
        },
        data: {
            password,
        },
    });
});
exports.AuthServices = {
    loginUser,
    refreshToken,
    forgotPassword,
    resetPassword,
    changePassword,
};
