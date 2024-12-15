import { Request, Response } from "express";
import { ReviewService } from "./review.service";
import sendResponse from "../../../../Shared/sendResponse";
import { catchAsynce } from "../../../../Shared/catchAsynce";

export const createReview = catchAsynce(
  async (req: Request & { user?: any }, res: Response) => {
    const { productId, rating, comment } = req.body;
    const customerId = req.user?.userId;
    const email = req.user?.email;
    //   console.log(req.user);
    const review = await ReviewService.createReview({
      productId,
      customerId,
      rating,
      comment,
      email,
    });

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Review created successfully.",
      data: review,
    });
  }
);

export const getReview = catchAsynce(async (req: Request, res: Response) => {
  const { id } = req.params;
  const review = await ReviewService.getReview(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review fetched successfully.",
    data: review,
  });
});

export const updateReview = catchAsynce(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const review = await ReviewService.updateReview(id, { rating, comment });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review updated successfully.",
    data: review,
  });
});

export const deleteReview = catchAsynce(async (req: Request, res: Response) => {
  const { id } = req.params;
  await ReviewService.deleteReview(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review deleted successfully.",
    data: null,
  });
});
