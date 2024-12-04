import { prisma } from "../../../../Shared/prisma";

const createShop = async (data: any) => {
  const shop = await prisma.shop.create({
    data,
  });
  return shop;
};
const getAllShop = async () => {
  const shop = await prisma.shop.findMany({
    where: {
      isBlacklisted: false,
    },
  });
  return shop;
};

const updateShop = async (id: string, data: any) => {
  const shop = await prisma.shop.update({
    where: { id },
    data,
  });
  return shop;
};

const getShopById = async (id: string) => {
  const shop = await prisma.shop.findUnique({
    where: {
      id,

      isDeleted: false,
    },
  });
  return shop;
};

const softDeleteShop = async (id: string) => {
  const shop = await prisma.shop.update({
    where: { id },
    data: { isDeleted: true },
  });
  return shop;
};

export const ShopService = {
  createShop,
  getAllShop,
  getShopById,
  updateShop,
  softDeleteShop,
};
