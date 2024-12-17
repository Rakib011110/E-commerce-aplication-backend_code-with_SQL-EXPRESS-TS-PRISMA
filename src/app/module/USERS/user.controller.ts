import { Request, Response } from "express";
import { UserServices } from "./user.service";

// Create Admin Controller
const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.createAdmin(req.body);
    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (err: any) {
    console.error("Error creating admin:", err);
    res.status(500).json({
      success: false,
      message: err?.message || "Something went wrong",
      error: err,
    });
  }
};

// Create Vendor Controller
const createVendor = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const result = await UserServices.createVendor(req.body);
    res.status(200).json({
      success: true,
      message: "Vendor created successfully",
      data: result,
    });
  } catch (err: any) {
    console.error("Error creating vendor:", err);
    res.status(500).json({
      success: false,
      message: err?.message || "Something went wrong",
      error: err,
    });
  }
};

// Create Customer Controller
const createCustomer = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.createCustomer(req.body);
    res.status(200).json({
      success: true,
      message: "Customer created successfully",
      data: result,
    });
  } catch (err: any) {
    console.error("Error creating customer:", err);
    res.status(500).json({
      success: false,
      message: err?.message || "Something went wrong",
      error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: result,
    });
  } catch (err: any) {
    console.error("Error fetching all users:", err);
    res.status(500).json({
      success: false,
      message: err?.message || "Something went wrong",
      error: err,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await UserServices.deleteUser(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (err: any) {
    console.error("Error deleting user:", err);
    res.status(500).json({
      success: false,
      message: err?.message || "Something went wrong",
      error: err,
    });
  }
};
const changeRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const result = await UserServices.changeRole(id, role);
    res.status(200).json({
      success: true,
      message: `User role updated to ${role} successfully`,
      data: result,
    });
  } catch (err: any) {
    console.error("Error changing user role:", err);
    res.status(500).json({
      success: false,
      message: err?.message || "Something went wrong",
      error: err,
    });
  }
};

export const UserController = {
  createAdmin,
  createVendor,
  createCustomer,
  getAllUsers,
  deleteUser,
  changeRole,
};
