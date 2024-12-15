import { prisma } from "../../../../Shared/prisma";

const createShop = async (data: {
  name: string;
  logo: string;
  description: string;
  contactNumber: string;
  userId: string;
}) => {
  const shop = await prisma.shop.create({
    data: {
      name: data.name,
      logo: data.logo,
      description: data.description,
      contactNumber: data.contactNumber,
      userId: data.userId,
    },
  });

  return shop;
};
const getAllShop = async () => {
  const shop = await prisma.shop.findMany({
    where: {
      isBlacklisted: false,
    },
    include: {
      products: true,
      followers: true,
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
    include: {
      products: true,
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
