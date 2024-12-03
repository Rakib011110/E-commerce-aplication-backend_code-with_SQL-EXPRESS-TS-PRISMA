import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../../../Shared/prisma";

// Create Admin Service
const createAdmin = async (payload: { password: string; admin: any }) => {
  try {
    const hashedPassword: string = await bcrypt.hash(payload.password, 12);

    const userData = {
      email: payload.admin.email,
      password: hashedPassword,
      role: UserRole.ADMIN,
    };

    const adminData = {
      ...payload.admin,
    };

    const result = await prisma.$transaction(async (transactionClient) => {
      await transactionClient.user.create({
        data: userData,
      });

      const createdAdminData = await transactionClient.admin.create({
        data: adminData,
      });

      return createdAdminData;
    });

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create admin");
  }
};

// Create Vendor Service
const createVendor = async (payload: { password: string; vendor: any }) => {
  console.log(payload);
  try {
    const hashedPassword: string = await bcrypt.hash(payload.password, 12);

    const userData = {
      email: payload.vendor.email,
      password: hashedPassword,
      role: UserRole.VENDOR,
    };

    const vendorData = {
      ...payload.vendor,
    };

    const result = await prisma.$transaction(async (transactionClient) => {
      await transactionClient.user.create({
        data: userData,
      });

      const createdVendorData = await transactionClient.vendor.create({
        data: vendorData,
      });

      return createdVendorData;
    });

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create vendor");
  }
};

// Create Customer Service
const createCustomer = async (payload: { password: string; customer: any }) => {
  try {
    const hashedPassword: string = await bcrypt.hash(payload.password, 12);

    const userData = {
      email: payload.customer.email,
      password: hashedPassword,
      role: UserRole.CUSTOMER,
    };

    const customerData = {
      ...payload.customer,
    };

    const result = await prisma.$transaction(async (transactionClient) => {
      await transactionClient.user.create({
        data: userData,
      });

      const createdCustomerData = await transactionClient.customer.create({
        data: customerData,
      });

      return createdCustomerData;
    });

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create customer");
  }
};

export const UserServices = {
  createAdmin,
  createVendor,
  createCustomer,
};
