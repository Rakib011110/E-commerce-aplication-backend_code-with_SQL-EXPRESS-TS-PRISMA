import { prisma } from "../../../Shared/prisma";

const getAllDBFormDB = async () => {
  const result = await prisma.admin.findMany();
  return result;
};

const getAdminById = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: { id },
  });
  return result;
};

const updateAdminById = async (id: string, updateData: any) => {
  const result = await prisma.admin.update({
    where: { id },
    data: updateData,
  });
  return result;
};

const softDeleteAdminById = async (id: string) => {
  const result = await prisma.admin.delete({
    where: { id },
  });
  return result;
};

export const AdminService = {
  getAllDBFormDB,
  getAdminById,
  updateAdminById,
  softDeleteAdminById,
};
