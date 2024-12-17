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
exports.VendorServices = void 0;
const prisma_1 = require("../../../Shared/prisma");
const getAllVendors = () => __awaiter(void 0, void 0, void 0, function* () {
    const vendors = yield prisma_1.prisma.vendor.findMany({
        where: { isDeleted: false },
    });
    return vendors;
});
const getVendorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield prisma_1.prisma.vendor.findUnique({
        where: { id },
    });
    return vendor;
});
const updateVendor = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield prisma_1.prisma.vendor.update({
        where: { id },
        data,
    });
    return vendor;
});
const softDeleteVendor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield prisma_1.prisma.vendor.update({
        where: { id },
        data: { isDeleted: true },
    });
    return vendor;
});
exports.VendorServices = {
    getAllVendors,
    getVendorById,
    updateVendor,
    softDeleteVendor,
};
