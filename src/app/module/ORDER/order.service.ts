import Stripe from "stripe";
import { prisma } from "../../../Shared/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20.acacia", // Use the expected version
});

const createOrder = async (payload: {
  cartId: string;
  totalAmount: number;
  customerId: string;
}) => {
  try {
    // Retrieve the cart and its items
    const cart = await prisma.cart.findUnique({
      where: { id: payload.cartId },
      include: { cartItems: { include: { product: true } } },
    });

    if (!cart || cart.customerId !== payload.customerId) {
      throw new Error("Unauthorized access to the cart.");
    }

    // Extract the shopId from the first product in the cart
    const shopId = cart.cartItems[0]?.product.shopId;
    if (!shopId) {
      throw new Error("Shop ID could not be determined from the cart items.");
    }

    // Create an order and its items
    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}`,
        totalAmount: payload.totalAmount,
        customerId: payload.customerId,
        shopId, // Ensure shopId is included
        status: "PENDING",
        paymentStatus: "PENDING",
        orderItems: {
          create: cart.cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
    });

    // Optionally, clear the cart after order creation
    await prisma.cart.update({
      where: { id: payload.cartId },
      data: { cartItems: { deleteMany: {} } },
    });

    return order;
  } catch (error: any) {
    throw new Error(error.message || "Failed to create order.");
  }
};
const createPaymentIntent = async (orderId: string) => {
  // Fetch order details
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) throw new Error("Order not found.");

  // Create a Stripe PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.totalAmount * 100),
    currency: "usd",
    metadata: { orderId },
  });

  return { clientSecret: paymentIntent.client_secret };
};

const updateOrderStatus = async (
  orderId: string,
  status: "COMPLETED" | "CANCELED"
) => {
  return await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

const getOrderDetails = async (orderId: string) => {
  return await prisma.order.findUnique({
    where: { id: orderId },
    include: { orderItems: { include: { product: true } } },
  });
};

export const OrderService = {
  createOrder,
  createPaymentIntent,
  updateOrderStatus,
  getOrderDetails,
};
