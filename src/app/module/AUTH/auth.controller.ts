import { Request, Response } from "express";
import { catchAsynce } from "../../../Shared/catchAsynce";
import { AuthServices } from "./auth.service";
import sendResponse from "../../../Shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const loginUser = catchAsynce(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken } = result;

  res.cookie("res.cookie", refreshToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "LOGIN SUCCESSFULL",
    data: {
      accessToken: result.accessToken,
    },
  });
});

const refreshToken = catchAsynce(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Refresh Token Genarated SUCCESSFULL",
    data: result,
  });
});

const changePassword = catchAsynce(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = AuthServices.changePassword(user, req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Password Change Success",
      data: result,
    });
  }
);
const resetPassword = catchAsynce(async (req: Request, res: Response) => {
  const token = req.headers.authorization || "";

  await AuthServices.resetPassword(token, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Password Reset!",
    data: null,
  });
});

const forgotPassword = catchAsynce(async (req: Request, res: Response) => {
  const result = await AuthServices.forgotPassword(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "forgot passowrd Success",
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  resetPassword,
  changePassword,
  forgotPassword,
};
