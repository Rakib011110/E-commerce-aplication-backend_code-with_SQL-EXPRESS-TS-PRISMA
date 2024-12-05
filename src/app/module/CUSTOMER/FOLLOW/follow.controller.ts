import { catchAsynce } from "../../../../Shared/catchAsynce";
import sendResponse from "../../../../Shared/sendResponse";
import { ShopService } from "./follow.service";

const followShop = catchAsynce(async (req, res) => {
  const { id: shopId } = req.params;
  const userId = req.user.id; // Assuming the user's ID is available in `req.user`
  const result = await ShopService.followShop(userId, shopId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Shop followed successfully",
    data: result,
  });
});

const unfollowShop = catchAsynce(async (req, res) => {
  const { id: shopId } = req.params;
  const userId = req.user.id; // Assuming the user's ID is available in `req.user`
  const result = await ShopService.unfollowShop(userId, shopId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result.message,
    data: result,
  });
});

export const ShopController = {
  followShop,
  unfollowShop,
};
