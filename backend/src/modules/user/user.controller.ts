import { Request, Response } from "express";
import config from "../../config";
import catchAsycn from "../../utils/catchAsycn";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";
import AppError from "../../errors/appError";

const register = catchAsycn(async (req: Request, res: Response) => {
  const result = await userService.register(req.body);
  res.cookie("token", result.token, {
    httpOnly: true,
    secure: config.env === "production",
    sameSite: config.env === "production" ? "none" : "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  sendResponse(res, 201, "User registered successfully", result);
});

const login = catchAsycn(async (req: Request, res: Response) => {
  const result = await userService.login(req.body);
  res.cookie("token", result.token, {
    httpOnly: true,
    secure: config.env === "production",
    sameSite: config.env === "production" ? "none" : "strict",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
  sendResponse(res, 201, "User login successfully", result);
});

const logout = catchAsycn(async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: config.env === "production",
    sameSite: config.env === "production" ? "none" : "strict",
  });
  sendResponse(res, 200, "User logout successfully");
});

const verifyOTP = catchAsycn(async (req: Request, res: Response) => {
  if (!req.userId) {
    throw new AppError(400, "User not authenticated");
  }

  await userService.verifyOTP(req.userId);
  sendResponse(res, 200, "OTP sent successfully, check your email");
});

const verifieEmail = catchAsycn(async (req: Request, res: Response) => {
  const { otp } = req.body;
  if (!req.userId) {
    throw new AppError(400, "User not authenticated");
  }

  await userService.verifieEmail(req.userId, otp);
  sendResponse(res, 200, "Email verified successfully");
});

const isAuthenticated = catchAsycn(async (req: Request, res: Response) => {
  if (!req.userId) {
    throw new AppError(400, "User not authenticated");
  }
  await userService.isAuthenticated(req.userId);

  sendResponse(res, 200, "User authenticated successfully");
});

const resetOtp = catchAsycn(async (req, res) => {
  const { email } = req.body;
  await userService.resetOtp(email);
  sendResponse(res, 200, "OTP sent successfully, check your email");
});

const resetPassword = catchAsycn(async (req, res) => {
  const { email, otp, newPassword } = req.body;
  await userService.resetPassword(email, otp, newPassword);
  sendResponse(res, 200, "Password reset successfully");
});

const profile = catchAsycn(async (req, res) => {
  if (!req.userId) {
    throw new AppError(400, "User not authenticated");
  }
  const user = await userService.profile(req.userId);
  sendResponse(res, 200, "User profile", user);
});

const updateProfile = catchAsycn(async (req, res) => {
  if (!req.userId) {
    throw new AppError(400, "User not authenticated");
  }
  if (!req.file) {
    throw new AppError(400, "Please upload a profile picture");
  }
  const fromdate = JSON.parse(req.body.data);
  const user = await userService.updateProfile(req.userId, fromdate, req.file);
  sendResponse(res, 200, "User profile updated", user);
});

export const userController = {
  register,
  login,
  logout,
  verifyOTP,
  verifieEmail,
  isAuthenticated,
  resetOtp,
  resetPassword,
  profile,
  updateProfile,
};
