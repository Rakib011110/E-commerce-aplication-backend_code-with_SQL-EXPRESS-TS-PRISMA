"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtHelpers = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload, secreate, expiresIn) => {
    const token = jsonwebtoken_1.default.sign(payload, secreate, {
        algorithm: "HS256",
        expiresIn: expiresIn,
    });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (token, secreate) => {
    return jsonwebtoken_1.default.verify(token, secreate);
};
exports.verifyToken = verifyToken;
exports.jwtHelpers = {
    generateToken: exports.generateToken,
    verifyToken: exports.verifyToken,
};
