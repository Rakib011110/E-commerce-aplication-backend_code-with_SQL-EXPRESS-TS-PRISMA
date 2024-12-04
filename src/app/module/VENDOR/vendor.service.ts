import { prisma } from "../../../Shared/prisma";

const getAllVendors = async () => {
  const vendors = await prisma.vendor.findMany({
    where: { isDeleted: false },
  });
  return vendors;
};

const getVendorById = async (id: string) => {
  const vendor = await prisma.vendor.findUnique({
    where: { id },
  });
  return vendor;
};

const updateVendor = async (id: string, data: any) => {
  const vendor = await prisma.vendor.update({
    where: { id },
    data,
  });
  return vendor;
};

const softDeleteVendor = async (id: string) => {
  const vendor = await prisma.vendor.update({
    where: { id },
    data: { isDeleted: true },
  });
  return vendor;
};

export const VendorServices = {
  getAllVendors,
  getVendorById,
  updateVendor,
  softDeleteVendor,
};
