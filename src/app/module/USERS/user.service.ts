import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../../../Shared/prisma";

const createAdmin = async (payload: { password: string; admin: any }) => {
  try {
    // Hash the admin's password
    const hashedPassword: string = await bcrypt.hash(payload.password, 12);

    // Prepare data for User and Admin
    const userData = {
      email: payload.admin.email,
      password: hashedPassword,
      role: UserRole.ADMIN,
    };

    const adminData = {
      ...payload.admin,
    };

    // Use a transaction to ensure atomicity
    const result = await prisma.$transaction(async (transactionClient) => {
      // Create the User entry
      await transactionClient.user.create({
        data: userData,
      });

      // Create the Admin entry
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

export const UserServices = {
  createAdmin,
};
