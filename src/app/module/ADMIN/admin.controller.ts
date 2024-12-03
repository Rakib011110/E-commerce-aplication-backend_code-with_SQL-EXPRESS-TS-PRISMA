import { NextFunction, Request, Response } from "express";
import { catchAsynce } from "../../../Shared/catchAsynce";
import sendResponse from "../../../Shared/sendResponse";
import { AdminService } from "./addmin.service";

const getAllAdminFromDB = catchAsynce(async (req: Request, res: Response) => {
  const result = await AdminService.getAllDBFormDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admins retrieved successfully",
    data: result,
  });
});

const getAdminById = catchAsynce(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.getAdminById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin retrieved successfully",
    data: result,
  });
});

const updateAdminById = catchAsynce(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await AdminService.updateAdminById(id, updateData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin updated successfully",
    data: result,
  });
});

const softDeleteAdminById = catchAsynce(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.softDeleteAdminById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});

export const AdminController = {
  getAllAdminFromDB,
  getAdminById,
  updateAdminById,
  softDeleteAdminById,
};
