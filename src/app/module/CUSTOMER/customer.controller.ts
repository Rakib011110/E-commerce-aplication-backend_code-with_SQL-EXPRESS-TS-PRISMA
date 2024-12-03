import { catchAsynce } from "../../../Shared/catchAsynce";
import { CustomerServices } from "./customer.service";
import sendResponse from "../../../Shared/sendResponse";

// Get all customers
const getAllCustomers = catchAsynce(async (req, res) => {
  const result = await CustomerServices.getAllCustomers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All customers retrieved successfully",
    data: result,
  });
});

// Get customer by ID
const getCustomerById = catchAsynce(async (req, res) => {
  const { id } = req.params;
  const result = await CustomerServices.getCustomerById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Customer retrieved successfully",
    data: result,
  });
});

// Create a new customer
const createCustomer = catchAsynce(async (req, res) => {
  const customerData = req.body;
  const result = await CustomerServices.createCustomer(customerData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Customer created successfully",
    data: result,
  });
});

// Update customer by ID
const updateCustomer = catchAsynce(async (req, res) => {
  const { id } = req.params;
  const customerData = req.body;
  const result = await CustomerServices.updateCustomer(id, customerData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Customer updated successfully",
    data: result,
  });
});

// Soft delete customer by ID
const softDeleteCustomer = catchAsynce(async (req, res) => {
  const { id } = req.params;
  const result = await CustomerServices.softDeleteCustomer(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Customer deleted successfully",
    data: result,
  });
});

export const CustomerController = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  softDeleteCustomer,
};
