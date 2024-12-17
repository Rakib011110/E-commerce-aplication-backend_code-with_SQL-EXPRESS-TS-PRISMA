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
exports.AdminService = void 0;
const prisma_1 = require("../../../Shared/prisma");
const getAllDBFormDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.admin.findMany();
    return result;
});
const getAdminById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.admin.findUnique({
        where: { id },
    });
    return result;
});
const updateAdminById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.admin.update({
        where: { id },
        data: updateData,
    });
    return result;
});
const softDeleteAdminById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.admin.delete({
        where: { id },
    });
    return result;
});
exports.AdminService = {
    getAllDBFormDB,
    getAdminById,
    updateAdminById,
    softDeleteAdminById,
};
