import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../../../Shared/prisma";

const createAdmin = async (payload: {
  password: string;
  admin: any;
  userId: any;
}) => {
  try {
    const hashedPassword: string = await bcrypt.hash(payload.password, 12);

    const userData = {
      email: payload.admin.email,
      password: hashedPassword,
      role: UserRole.ADMIN,
    };

    const result = await prisma.$transaction(async (transactionClient) => {
      const user = await transactionClient.user.create({ data: userData });

      const createdAdminData = await transactionClient.admin.create({
        data: {
          name: payload.admin.name,
          profilePhoto: payload.admin.profilePhoto,
          userId: user.id, // Link to User
        },
      });

      return createdAdminData;
    });

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create admin");
  }
};

const createVendor = async (payload: { password: string; vendor: any }) => {
  try {
    const hashedPassword: string = await bcrypt.hash(payload.password, 12);

    const userData = {
      email: payload.vendor.email,
      password: hashedPassword,
      role: UserRole.VENDOR,
    };

    const result = await prisma.$transaction(async (transactionClient) => {
      const user = await transactionClient.user.create({ data: userData });

      const createdVendorData = await transactionClient.vendor.create({
        data: {
          contactNumber: payload.vendor.contactNumber,
          profilePhoto: payload.vendor.profilePhoto,
          userId: user.id, // Link to User
        },
      });

      return createdVendorData;
    });

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create vendor");
  }
};

const createCustomer = async (payload: { password: string; customer: any }) => {
  try {
    const hashedPassword: string = await bcrypt.hash(payload.password, 12);

    const userData = {
      email: payload.customer.email,
      password: hashedPassword,
      role: UserRole.CUSTOMER,
    };

    const result = await prisma.$transaction(async (transactionClient) => {
      const user = await transactionClient.user.create({ data: userData });

      const createdCustomerData = await transactionClient.customer.create({
        data: {
          name: payload.customer.name,
          contactNumber: payload.customer.contactNumber,
          profilePhoto: payload.customer.profilePhoto,
          address: payload.customer.address,
          userId: user.id, // Link to User
        },
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
