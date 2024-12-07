import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prisma } from "../../../../Shared/prisma";
import { UserRole } from "@prisma/client";

const followShop = async (shopId: string, customerId: string) => {
  try {
    // Update customer to follow the shop
    return await prisma.customer.update({
      where: { id: customerId },
      data: {
        followedShops: {
          connect: { id: shopId },
        },
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new Error(
          `Operation failed: ${error.meta?.cause || "Record not found."}`
        );
      }
    }
    throw error; // Re-throw other errors
  }
};

const unfollowShop = async (shopId: string, customerId: string) => {
  try {
    // Validate if the shop exists
    const shopExists = await prisma.shop.findUnique({
      where: { id: shopId },
    });
    if (!shopExists) {
      throw new Error(`Shop with ID: ${shopId} does not exist.`);
    }

    // Validate if the customer exists
    const customerExists = await prisma.user.findUnique({
      where: {
        id: customerId,
        role: UserRole.CUSTOMER,
      },
    });
    if (!customerExists) {
      throw new Error(`Customer with ID: ${customerId} does not exist.`);
    }

    // Update customer to unfollow the shop
    return await prisma.customer.update({
      where: { id: customerId },
      data: {
        followedShops: {
          disconnect: { id: shopId },
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

export const ShopService = {
  followShop,
  unfollowShop,
};
