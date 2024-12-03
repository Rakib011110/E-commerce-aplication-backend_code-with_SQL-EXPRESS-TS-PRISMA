import { prisma } from "../../../Shared/prisma";

// Get all customers
const getAllCustomers = async () => {
  const customers = await prisma.customer.findMany({
    where: { isDeleted: false }, // Optional: Add a filter for non-deleted customers
  });
  return customers;
};

// Get customer by ID
const getCustomerById = async (id: string) => {
  const customer = await prisma.customer.findUnique({
    where: { id },
  });
  return customer;
};

// Create a new customer
const createCustomer = async (data: any) => {
  const customer = await prisma.customer.create({
    data,
  });
  return customer;
};

// Update customer by ID
const updateCustomer = async (id: string, data: any) => {
  const customer = await prisma.customer.update({
    where: { id },
    data,
  });
  return customer;
};

// Soft delete customer by ID
const softDeleteCustomer = async (id: string) => {
  const customer = await prisma.customer.update({
    where: { id },
    data: { isDeleted: true },
  });
  return customer;
};

export const CustomerServices = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  softDeleteCustomer,
};
