import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategory = async (name: string) => {
  return await prisma.category.create({
    data: { name },
  });
};

export const getAllCategories = async () => {
  return await prisma.category.findMany();
};

export const getCategoryById = async (id: string) => {
  return await prisma.category.findUnique({
    where: { id },
  });
};

export const updateCategory = async (id: string, name: string) => {
  return await prisma.category.update({
    where: { id },
    data: { name },
  });
};

export const deleteCategory = async (id: string) => {
  return await prisma.category.delete({
    where: { id },
  });
};
