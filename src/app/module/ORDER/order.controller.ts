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

export const OrderController = {
  createOrder,
  createPaymentIntent,
  updateOrderStatus,
  getOrderDetails,
};
