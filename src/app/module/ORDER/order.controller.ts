import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { catchAsynce } from "../../../Shared/catchAsynce";
import sendResponse from "../../../Shared/sendResponse";

const createOrder = catchAsynce(async (req, res) => {
  const { cartId, totalAmount } = req.body;
  const customerId = req.user?.userId;

  const order = await OrderService.createOrder({
    cartId,
    customerId,
    totalAmount,
  });
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Order created successfully.",
    data: order,
  });
});

const createPaymentIntent = catchAsynce(async (req, res) => {
  const { id: orderId } = req.params;

  const paymentIntent = await OrderService.createPaymentIntent(orderId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment intent created successfully.",
    data: paymentIntent,
  });
});

const getAllOrders = catchAsynce(
  async (req: Request & { user?: any }, res: Response) => {
    const { page = 1, limit = 10, status, customerId, shopId } = req.query;
    const role = req.user?.role;
    const userId = req.user?.userId;

    const orders = await OrderService.getAllOrders({
      role,
      userId,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
      status: status as string,
      customerId: customerId as string,
      shopId: shopId as string,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Orders fetched successfully.",
      data: orders,
    });
  }
);

const updateOrderStatus = catchAsynce(async (req, res) => {
  const { id: orderId } = req.params;
  const { status } = req.body;

  const order = await OrderService.updateOrderStatus(orderId, status);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `Order status updated to ${status}.`,
    data: order,
  });
});

const getOrderDetails = catchAsynce(async (req, res) => {
  const { id: orderId } = req.params;

  const order = await OrderService.getOrderDetails(orderId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order details fetched successfully.",
    data: order,
  });
});

const getOrderHistory = catchAsynce(
  async (req: Request & { user?: any }, res) => {
    const userId = req.user?.userId;
    const role = req.user?.role;
    const { page = 1, limit = 10 } = req.query;

    const orders = await OrderService.getOrderHistory({
      userId,
      role,
      page: parseInt(page as string, 10),
      limit: parseInt(limit as string, 10),
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order history fetched successfully.",
      data: orders,
    });
  }
);

export const OrderController = {
  createOrder,
  createPaymentIntent,
  updateOrderStatus,
  getOrderDetails,
  getOrderHistory,
  getAllOrders,
};
