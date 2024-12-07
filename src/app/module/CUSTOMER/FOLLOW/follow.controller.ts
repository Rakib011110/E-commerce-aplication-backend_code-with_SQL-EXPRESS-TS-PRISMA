import { catchAsynce } from "../../../../Shared/catchAsynce";
import sendResponse from "../../../../Shared/sendResponse";
import { ShopService } from "./follow.service";

const followShop = catchAsynce(async (req, res) => {
  const { id: shopId } = req.params; // Shop ID
  const customerId = req.user?.id; // Extracted from authenticated user context

  if (!shopId || !customerId) {
    throw new Error("Shop ID and Customer ID are required.");
  }

  console.log("Follow Shop - Shop ID:", shopId, "Customer ID:", customerId);

  const result = await ShopService.followShop(shopId, customerId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully followed the shop",
    data: result,
  });
});

const unfollowShop = catchAsynce(async (req, res) => {
  const { id: shopId } = req.params; // Shop ID
  const customerId = req.user?.id; // Extracted from authenticated user context

  if (!shopId || !customerId) {
    throw new Error("Shop ID and Customer ID are required.");
  }

  console.log("Unfollow Shop - Shop ID:", shopId, "Customer ID:", customerId);

  const result = await ShopService.unfollowShop(shopId, customerId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Successfully unfollowed the shop",
    data: result,
  });
});

export const ShopController = {
  followShop,
  unfollowShop,
};
