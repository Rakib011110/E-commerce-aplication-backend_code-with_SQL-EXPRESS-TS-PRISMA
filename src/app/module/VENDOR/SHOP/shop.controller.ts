import { Request, Response } from "express";
import { ShopService } from "./shop.service";
import sendResponse from "../../../../Shared/sendResponse";
import { catchAsynce } from "../../../../Shared/catchAsynce";

// Create a shop
const createShop = catchAsynce(async (req: Request, res: Response) => {
  const shopData = req.body;
  const result = await ShopService.createShop(shopData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Shop created successfully",
    data: result,
  });
});
const getAllShop = catchAsynce(async (req: Request, res: Response) => {
  const shopData = req.body;
  const result = await ShopService.getAllShop();

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Shop created successfully",
    data: result,
  });
});

// Get shop by ID
const getShopById = catchAsynce(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ShopService.getShopById(id);

  if (!result) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Shop not found",
      data: result,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Shop retrieved successfully",
    data: result,
  });
});

// Update shop by ID
const updateShop = catchAsynce(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  const shop = await ShopService.getShopById(id);
  if (!shop) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Shop not found",
      data: shop,
    });
  }

  const result = await ShopService.updateShop(id, updatedData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Shop updated successfully",
    data: result,
  });
});

// Soft delete shop by ID
const softDeleteShop = catchAsynce(async (req: Request, res: Response) => {
  const { id } = req.params;

  const shop = await ShopService.getShopById(id);
  if (!shop) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Shop not found",
      data: shop,
    });
  }

  const result = await ShopService.softDeleteShop(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Shop soft deleted successfully",
    data: result,
  });
});

export const ShopController = {
  createShop,
  getShopById,
  updateShop,
  softDeleteShop,
  getAllShop,
};
