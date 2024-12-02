import { Request, Response } from "express";
import { UserServices } from "./user.service";

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

export const UserController = {
  createAdmin,
};
