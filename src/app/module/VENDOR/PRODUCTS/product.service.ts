import { prisma } from "../../../../Shared/prisma";

const createProduct = async (payload: any) => {
  const product = await prisma.product.create({
    data: payload,
  });
  return product;
};

const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      isDeleted: false,
    },
  });
  return products;
};

const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  return product;
};

const updateProduct = async (id: string, payload: any) => {
  const product = await prisma.product.update({
    where: { id },
    data: payload,
  });
  return product;
};

const deleteProduct = async (id: string) => {
  const product = await prisma.product.update({
    where: { id },
    data: { isDeleted: true },
  });
  return product;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
