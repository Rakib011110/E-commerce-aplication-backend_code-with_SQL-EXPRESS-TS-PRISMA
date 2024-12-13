import { prisma } from "../../../../Shared/prisma";

const followShop = async (shopId: string, userId: string) => {
  try {
    // Validate if the shop exists
    const shopExists = await prisma.shop.findUnique({
      where: { id: shopId },
    });

    if (!shopExists) {
      throw new Error(`Shop with ID: ${shopId} does not exist.`);
    }

    // Validate if the user is a customer
    const customer = await prisma.customer.findUnique({
      where: { userId },
    });
    if (!customer) {
      throw new Error(`User with ID: ${userId} is not a customer.`);
    }

    // Prevent duplicate follow
    const alreadyFollowing = await prisma.shopFollowers.findUnique({
      where: {
        customerId_shopId: {
          customerId: customer.id,
          shopId: shopId,
        },
      },
    });
    if (alreadyFollowing) {
      throw new Error(`You are already following this shop.`);
    }

    // Create a new shop follow entry
    return await prisma.shopFollowers.create({
      data: {
        customerId: customer.id,
        shopId: shopId,
      },
    });
  } catch (error) {
    throw error;
  }
};

const unfollowShop = async (shopId: string, userId: string) => {
  try {
    // Validate if the shop exists
    const shopExists = await prisma.shop.findUnique({
      where: { id: shopId },
    });
    if (!shopExists) {
      throw new Error(`Shop with ID: ${shopId} does not exist.`);
    }

    // Validate if the user is a customer
    const customer = await prisma.customer.findUnique({
      where: { userId },
    });
    if (!customer) {
      throw new Error(`User with ID: ${userId} is not a customer.`);
    }

    // Remove the shop follow entry
    return await prisma.shopFollowers.delete({
      where: {
        customerId_shopId: {
          customerId: customer.id,
          shopId: shopId,
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
