import { prisma } from "../../../../Shared/prisma";

const createProduct = async (payload: any) => {
  console.log(payload);
  const product = await prisma.product.create({
    data: payload,
  });

  return product;
};
const getAllProduct = async (payload: any) => {
  console.log(payload);
  const product = await prisma.product.findMany({
    where: {
      isDeleted: false,
    },
  });

  return product;
};
const getAllProductById = async (id: string, payload: any) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  return product;
};

export const ProductService = {
  createProduct,
  getAllProduct,
  getAllProductById,
};
