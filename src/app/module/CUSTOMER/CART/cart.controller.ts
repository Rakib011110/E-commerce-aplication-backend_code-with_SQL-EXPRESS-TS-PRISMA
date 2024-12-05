import { Request, Response } from "express";
import { CartService } from "./cart.service";
import sendResponse from "../../../../Shared/sendResponse";
import { catchAsynce } from "../../../../Shared/catchAsynce";

const addItemToCart = catchAsynce(async (req: Request, res: Response) => {
  const { productId, quantity, customerId } = req.body;

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
  const { customerId } = req.query;

  const result = await CartService.getCartItems(customerId as string);

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

  const result = await CartService.removeCartItem(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Cart item removed successfully",
    data: result,
  });
});

export const CartController = {
  addItemToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
};
