import { catchAsynce } from "../../../../Shared/catchAsynce";
import sendResponse from "../../../../Shared/sendResponse";
import { ProductService } from "./product.service";

const createProduct = catchAsynce(async (req, res) => {
  const product = req.body;
  const result = await ProductService.createProduct(product);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product create successfully",
    data: result,
  });
});

const getallProduct = catchAsynce(async (req, res) => {
  const product = req.body;
  const result = await ProductService.createProduct(product);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product create successfully",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getallProduct,
};
