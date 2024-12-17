import { Request, Response } from "express";
import { ReviewService } from "./review.service";
import sendResponse from "../../../../Shared/sendResponse";
import { catchAsynce } from "../../../../Shared/catchAsynce";
import ApiError from "../../../Error/ApiError";
import { StatusCodes } from "http-status-codes";

export const createReview = catchAsynce(
  async (req: Request & { user?: any }, res: Response) => {
    const { productId, rating, comment } = req.body;
    const userId = req.user?.userId;
    const email = req.user?.email;
    //   console.log(req.user);
    const review = await ReviewService.createReview({
      productId,
      userId,
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

export const getAllCustomerReviews = catchAsynce(
  async (req: Request, res: Response) => {
    const reviews = await ReviewService.getAllCustomerReviews();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All customer reviews fetched successfully.",
      data: reviews,
    });
  }
);

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

//  reply start

export const addVendorReply = catchAsynce(
  async (req: Request, res: Response) => {
    const { id } = req.params; // Review ID
    const { vendorReply } = req.body;

    if (!vendorReply) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Vendor reply is required.");
    }

    const review = await ReviewService.addVendorReply(id, vendorReply);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Vendor reply added successfully.",
      data: review,
    });
  }
);
export const getVendorReviews = catchAsynce(
  async (req: Request & { user?: any }, res: Response) => {
    const vendorId = req.user?.userId;

    const reviews = await ReviewService.getVendorReviews(vendorId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Vendor reviews fetched successfully.",
      data: reviews,
    });
  }
);
