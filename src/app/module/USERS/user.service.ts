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
          userId: user.id,
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
          userId: user.id,
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
          userId: user.id,
        },
      });

      return createdCustomerData;
    });

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create customer");
  }
};

const getAllUsers = async () => {
  try {
    const admins = await prisma.admin.findMany({
      where: {
        isDeleted: false,
      },
      include: { user: true },
    });

    const vendors = await prisma.vendor.findMany({
      include: { user: true },
      where: {
        isDeleted: false,
      },
    });

    const customers = await prisma.customer.findMany({
      where: {
        isDeleted: false,
      },
      include: { user: true },
    });

    return {
      admins,
      vendors,
      customers,
    };
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch all users");
  }
};

const deleteUser = async (userId: string) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    if (existingUser.isDeleted) {
      throw new Error("User is already deleted");
    }

    const deletedUser = await prisma.user.update({
      where: { id: userId },
      data: { isDeleted: true },
    });

    return deletedUser;
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete user");
  }
};

const changeRole = async (userId: string, role: UserRole) => {
  try {
    // Validate role
    if (!Object.values(UserRole).includes(role)) {
      throw new Error("Invalid role provided");
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    if (existingUser.isDeleted) {
      throw new Error("Cannot change role of a deleted user");
    }

    // Update role
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    return updatedUser;
  } catch (error: any) {
    throw new Error(error.message || "Failed to change user role");
  }
};

export const UserServices = {
  createAdmin,
  createVendor,
  createCustomer,
  getAllUsers,
  deleteUser,
  changeRole,
};
