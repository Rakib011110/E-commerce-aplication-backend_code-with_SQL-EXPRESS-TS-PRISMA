import bcrypt from "bcrypt";
import { UserStatus } from "@prisma/client";
import { prisma } from "../../../Shared/prisma";
import { generateToken, jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  if (!userData) {
    throw new Error("User not found");
  }
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("password is incorrect!");
  }

  const accessToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.secret,
    config.jwt.expiresIn
  );

  const refreshToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refreshTokenSecret,
    config.jwt.refreshTokenExpiresIn
  );

  console.log(accessToken);
  return {
    // userData,
    accessToken,
    refreshToken,
  };
};
const refreshToken = async (token: string) => {
  let decodedData;
  try {
    // decodedData = jwt.verify(token, "secreatekeysss") as JwtPayload;
    decodedData = jwtHelpers.verifyToken(token, config.jwt.refreshTokenSecret);
    // console.log(decodedData);
  } catch (error) {
    throw new Error("You are not authorized!");
  }

  const decodedUserData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = generateToken(
    {
      email: decodedUserData.email,
      role: decodedUserData.role,
    },

    config.jwt.secret, // "secreatekeysss",
    config.jwt.expiresIn //     "15m"
  );

  return {
    // userData,
    accessToken,
  };
};
export const AuthServices = {
  loginUser,
  refreshToken,
};
