import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../../Shared/prisma";
import ApiError from "../../../Error/ApiError";

const createReview = async (payload: {
  productId: string;
  customerId: string;
  rating: number;
  email: string;

  comment: string;
}) => {
  const review = await prisma.review.create({
    data: {
      productId: payload.productId,
      customerId: payload.customerId,
      rating: payload.rating,
      //   comment: payload.comment,
      comment: payload.comment,
      email: payload.email,
    },
  });
  return review;
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

export const ReviewService = {
  createReview,
  getReview,
  updateReview,
  deleteReview,
};
