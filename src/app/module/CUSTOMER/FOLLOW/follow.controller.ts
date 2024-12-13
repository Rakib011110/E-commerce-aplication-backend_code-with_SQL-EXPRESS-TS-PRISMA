import { catchAsynce } from "../../../../Shared/catchAsynce";
import sendResponse from "../../../../Shared/sendResponse";
import { ShopService } from "./follow.service";

const followShop = catchAsynce(async (req, res) => {
  const { id: shopId } = req.params; // Shop ID from route
  const userId = req.user?.id; // User ID from token

  if (!shopId || !userId) {
    throw new Error("Shop ID and User ID are required.");
  }

  const result = await ShopService.followShop(shopId, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully followed the shop.",
    data: result,
  });
});

const unfollowShop = catchAsynce(async (req, res) => {
  const { id: shopId } = req.params; // Shop ID from route
  const userId = req.user?.id; // User ID from token

  if (!shopId || !userId) {
    throw new Error("Shop ID and User ID are required.");
  }

  const result = await ShopService.unfollowShop(shopId, userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully unfollowed the shop.",
    data: result,
  });
});

export const ShopController = {
  followShop,
  unfollowShop,
};
