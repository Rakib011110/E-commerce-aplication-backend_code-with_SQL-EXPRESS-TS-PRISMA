import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../../Shared/prisma";
import ApiError from "../../../Error/ApiError";

const createReview = async (payload: {
  productId: string;
  userId: string;
  rating: number;
  email: string;

  comment: string;
}) => {
  const review = await prisma.review.create({
    data: {
      productId: payload.productId,
      userId: payload.userId,
      rating: payload.rating,
      //   comment: payload.comment,
      comment: payload.comment,
      email: payload.email,
    },
  });
  return review;
};

const getAllCustomerReviews = async () => {
  const reviews = await prisma.review.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      customer: true,
      product: true,
    },
  });

  return reviews;
};

const getReview = async (id: string) => {
  const review = await prisma.review.findUnique({
    where: { id },
  });
  if (!review) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Review not found");
  }
  return review;
};

const updateReview = async (
  id: string,
  payload: { rating?: number; comment?: string }
) => {
  const review = await prisma.review.update({
    where: { id },
    data: {
      ...payload,
    },
  });
  return review;
};

const deleteReview = async (id: string) => {
  await prisma.review.delete({
    where: { id },
  });
  return { message: "Review deleted successfully" };
};

const addVendorReply = async (id: string, vendorReply: string) => {
  const review = await prisma.review.update({
    where: { id },
    data: { vendorReply },
  });

  if (!review) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Review not found.");
  }

  return review;
};

const getVendorReviews = async (userId: string) => {
  const reviews = await prisma.review.findMany({
    where: {
      product: {
        shop: {
          userId: userId, // Match vendor ID
        },
      },
    },
    include: {
      customer: true,
      product: true,
    },
  });

  return reviews;
};

export const ReviewService = {
  createReview,
  getReview,
  updateReview,
  deleteReview,
  addVendorReply,
  getVendorReviews,
  getAllCustomerReviews,
};
