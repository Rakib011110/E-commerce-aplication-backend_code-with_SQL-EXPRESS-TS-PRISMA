import bcrypt from "bcrypt";
import { UserStatus } from "@prisma/client";
import { prisma } from "../../../Shared/prisma";
import { generateToken, jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import emailSender from "./sendEmail";
import ApiError from "../../Error/ApiError";
import { StatusCodes } from "http-status-codes";
import { Secret } from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
    include: {
      admin: true,
      vendor: true,
      customer: true,
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
    throw new Error("Password is incorrect!");
  }

  // Include userId based on role
  const userId =
    userData.admin?.id ||
    userData.vendor?.id ||
    userData.customer?.id ||
    userData.id;

  // Structure the token payload
  const tokenPayload = {
    id: userData.id,
    email: userData.email,
    role: userData.role,
    userId, // Include userId for role-based access
    status: userData.status,
    needPasswordChange: userData.needPassowordChange,
    associatedData: {
      admin: userData.admin,
      vendor: userData.vendor,
      customer: userData.customer,
    },
  };

  const accessToken = generateToken(
    tokenPayload,
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
      id: decodedUserData.id,
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

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });
  console.log(userData);
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("password is incorrect!");
  }
  const hashedPassword = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPassowordChange: false,
    },
  });
  return {
    message: "Password Change Success",
  };
};
const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPassToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.resetPasswordTokenSecret,
    config.jwt.resetPasswordTokenExpiresIn
  );

  const resetPassLink =
    config.resetPasswordLink + `?userId=${userData.id}&token=${resetPassToken}`;

  await emailSender(
    userData.email,
    `
        <div>
            <p>Dear User,</p>
            <p>Your password reset link 
                <a href=${resetPassLink}>
                    <button>
                        Reset Password
                    </button>
                </a>
            </p>

        </div>
        `
  );

  console.log("resetPassLink", resetPassLink);
};
const resetPassword = async (
  token: string,
  payload: { id: string; password: string }
) => {
  console.log({ token, payload });

  await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });

  const isValidToken = jwtHelpers.verifyToken(
    token,
    config.jwt.resetPasswordTokenSecret as Secret
  );

  if (!isValidToken) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Forbidden!");
  }

  const password = await bcrypt.hash(payload.password, 12);

  await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      password,
    },
  });
};
export const AuthServices = {
  loginUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
};
