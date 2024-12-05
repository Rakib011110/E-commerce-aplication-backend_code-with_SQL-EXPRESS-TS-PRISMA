import { catchAsynce } from "../../../../Shared/catchAsynce";
import sendResponse from "../../../../Shared/sendResponse";
import { ProductService } from "./product.service";

const createProduct = catchAsynce(async (req, res) => {
  const result = await ProductService.createProduct(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

const getAllProducts = catchAsynce(async (req, res) => {
  const result = await ProductService.getAllProducts();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products retrieved successfully",
    data: result,
  });
});

const getProductById = catchAsynce(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.getProductById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

const updateProduct = catchAsynce(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.updateProduct(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsynce(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.deleteProduct(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product deleted successfully",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
