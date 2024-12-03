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

export const AuthController = {
  loginUser,
  refreshToken,
};
