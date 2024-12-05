import { prisma } from "../../../../Shared/prisma";

const followShop = async (userId: string, shopId: string) => {
  const follow = await prisma.shopFollow.create({
    data: {
      userId,
      shopId,
    },
  });
  return follow;
};

const unfollowShop = async (userId: string, shopId: string) => {
  await prisma.shopFollow.deleteMany({
    where: {
      userId,
      shopId,
    },
  });
  return { message: "Unfollowed shop successfully" };
};

export const ShopService = {
  followShop,
  unfollowShop,
};
