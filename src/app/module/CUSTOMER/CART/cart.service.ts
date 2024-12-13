import { prisma } from "../../../../Shared/prisma";

const addItemToCart = async ({
  productId,
  quantity,
  customerId,
}: {
  productId: string;
  quantity: number;
  customerId: string;
}) => {
  // Check if the customer exists
  const customerExists = await prisma.customer.findUnique({
    where: { id: customerId },
  });

  if (!customerExists) {
    throw new Error("Customer does not exist");
  }

  // Fetch the cart for the customer
  let cart = await prisma.cart.findUnique({
    where: { customerId },
  });

  // If cart doesn't exist, create it
  if (!cart) {
    cart = await prisma.cart.create({
      data: { customerId },
    });
  }

  // Add item to the cart
  const newItem = await prisma.cartItem.create({
    data: {
      productId,
      quantity,
      cartId: cart.id,
    },
  });

  return newItem;
};

const getCartItems = async (customerId: string) => {
  // Fetch the cart for the customer with items
  const cart = await prisma.cart.findFirst({
    where: { customerId },
    include: {
      cartItems: {
        include: { product: true },
      },
    },
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  return cart.cartItems;
};

const updateCartItem = async (id: string, quantity: number) => {
  // Update the quantity of the item in the cart
  const updatedItem = await prisma.cartItem.update({
    where: { id },
    data: { quantity },
  });

  return updatedItem;
};

const removeCartItem = async (id: string) => {
  // Delete the item from the cart
  await prisma.cartItem.delete({
    where: { id },
  });
};

export const CartService = {
  addItemToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
};
