import Stripe from "stripe";
import { prisma } from "../../../Shared/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20.acacia",
});

const createOrder = async (payload: {
  cartId: string;
  totalAmount: number;
  customerId: string;
}) => {
  const cart = await prisma.cart.findUnique({
    where: { id: payload.cartId },
    include: { cartItems: { include: { product: true } } },
  });

  if (!cart || cart.customerId !== payload.customerId) {
    throw new Error("Unauthorized access to the cart.");
  }

  const shopId = cart.cartItems[0]?.product.shopId;
  if (!shopId) {
    throw new Error("Shop ID could not be determined from the cart items.");
  }

  const order = await prisma.order.create({
    data: {
      orderNumber: `ORD-${Date.now()}`,
      totalAmount: payload.totalAmount,
      customerId: payload.customerId,
      shopId,
      status: "PENDING",
      paymentStatus: "PAID",
      orderItems: {
        create: cart.cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
  });

  await prisma.cart.update({
    where: { id: payload.cartId },
    data: { cartItems: { deleteMany: {} } },
  });

  return order;
};

const createPaymentIntent = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) throw new Error("Order not found.");

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(order.totalAmount * 100),
    currency: "usd",
    payment_method_types: ["card"],
    metadata: { orderId },
  });

  return { clientSecret: paymentIntent.client_secret };
};

const getAllOrders = async ({
  role,
  userId,
  page,
  limit,
  status,
  customerId,
  shopId,
}: {
  role: "ADMIN" | "VENDOR";
  userId: string;
  page: number;
  limit: number;
  status?: string;
  customerId?: string;
  shopId?: string;
}) => {
  const offset = (page - 1) * limit;
  const whereClause: any = {};

  if (status) {
    whereClause.status = status;
  }

  if (customerId) {
    whereClause.customerId = customerId;
  }

  if (shopId) {
    whereClause.shopId = shopId;
  }

  if (role === "VENDOR") {
    const shop = await prisma.shop.findUnique({ where: { userId } });
    if (!shop) throw new Error("Shop not found for this vendor.");
    whereClause.shopId = shop.id;
  }

  const orders = await prisma.order.findMany({
    where: whereClause,
    include: { orderItems: { include: { product: true } } },
    skip: offset,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const totalOrders = await prisma.order.count({ where: whereClause });

  return {
    orders,
    totalOrders,
    currentPage: page,
    totalPages: Math.ceil(totalOrders / limit),
  };
};

const updateOrderStatus = async (
  orderId: string,
  status: "COMPLETED" | "CANCELED"
) => {
  return prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

const getOrderDetails = async (orderId: string) => {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: { orderItems: { include: { product: true } } },
  });
};

const getOrderHistory = async ({
  id,
  role,
  page,
  limit,
}: {
  id: any;
  role: any;
  page: any;
  limit: any;
}) => {
  const customer = await prisma.customer.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!customer) {
    throw new Error("Customer not found for this user.");
  }

  const orders = await prisma.order.findMany({
    where: { customerId: customer.id },
    include: {
      orderItems: {
        include: { product: true },
      },
    },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  return orders;
};

export const OrderService = {
  createOrder,
  createPaymentIntent,
  updateOrderStatus,
  getOrderDetails,
  getOrderHistory,
  getAllOrders,
};
