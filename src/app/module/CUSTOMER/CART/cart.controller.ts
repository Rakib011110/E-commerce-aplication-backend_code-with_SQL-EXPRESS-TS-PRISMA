import { Request, Response } from "express";
import { CartService } from "./cart.service";
import sendResponse from "../../../../Shared/sendResponse";
import { catchAsynce } from "../../../../Shared/catchAsynce";
import { JwtPayload } from "jsonwebtoken";

const addItemToCart = catchAsynce(async (req, res) => {
  const { productId, quantity } = req.body;
  const customerId = req.user?.userId;
  const result = await CartService.addItemToCart({
    productId,
    quantity,
    customerId,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Item added to cart successfully",
    data: result,
  });
});

const getCartItems = catchAsynce(async (req: Request, res: Response) => {
  const customerId = req.user?.userId; // Extract user ID from token (middleware)

  const result = await CartService.getCartItems(customerId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Cart items retrieved successfully",
    data: result,
  });
});

const updateCartItem = catchAsynce(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const result = await CartService.updateCartItem(id, quantity);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Cart item updated successfully",
    data: result,
  });
});

const removeCartItem = catchAsynce(async (req: Request, res: Response) => {
  const { id } = req.params;

  await CartService.removeCartItem(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Cart item removed successfully",
    data: null,
  });
});

export const CartController = {
  addItemToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
};
