import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ApiError from "../Error/ApiError";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";

export const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
      }

      // Verify and decode the token
      const verifytoken = jwtHelpers.verifyToken(
        token,
        config.jwt.secret as Secret
      );

      if (!verifytoken) {
        throw new ApiError(
          StatusCodes.UNAUTHORIZED,
          "Invalid or expired token!"
        );
      }

      req.user = verifytoken; // Attach decoded token to req.user
      // console.log("Decoded User:", req.user);

      // Role-based authorization
      if (roles.length && !roles.includes(verifytoken.role)) {
        throw new ApiError(StatusCodes.FORBIDDEN, "Access denied!");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
