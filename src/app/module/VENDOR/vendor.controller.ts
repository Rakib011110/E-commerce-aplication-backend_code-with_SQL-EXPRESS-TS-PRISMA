import { Request, Response } from "express";
import { VendorServices } from "./vendor.service";
import sendResponse from "../../../Shared/sendResponse";
import { catchAsynce } from "../../../Shared/catchAsynce";

// Get all vendors
const getAllVendors = catchAsynce(async (req: Request, res: Response) => {
  const result = await VendorServices.getAllVendors();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Vendors retrieved successfully",
    data: result,
  });
});

// Get vendor by ID
const getVendorById = catchAsynce(async (req: Request, res: Response) => {
  const { id } = req.params;
  const vendor = await VendorServices.getVendorById(id);

  if (!vendor) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Vendor not found",
      data: vendor,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Vendor retrieved successfully",
    data: vendor,
  });
});

// Update vendor by ID
const updateVendor = catchAsynce(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const vendor = await VendorServices.getVendorById(id);
  if (!vendor) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Vendor not found",
      data: vendor,
    });
  }

  const updatedVendor = await VendorServices.updateVendor(id, updatedData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Vendor updated successfully",
    data: updatedVendor,
  });
});

// Soft delete vendor by ID
const softDeleteVendor = catchAsynce(async (req: Request, res: Response) => {
  const { id } = req.params;

  const vendor = await VendorServices.getVendorById(id);
  if (!vendor) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Vendor not found",
      data: vendor,
    });
  }

  const deletedVendor = await VendorServices.softDeleteVendor(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Vendor soft deleted successfully",
    data: deletedVendor,
  });
});

export const VendorController = {
  getAllVendors,
  getVendorById,
  updateVendor,
  softDeleteVendor,
};
