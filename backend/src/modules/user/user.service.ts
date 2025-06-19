import config from "../../config";
import AppError from "../../errors/appError";
import { IUser } from "./user.interface";
import User from "./user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import transporter from "../../config/nodeMailer";
import updateImg from "../../middlewares/uploadImg";

// --------------------------------------------------auth------------------------------------------

const register = async (payload: Partial<IUser>) => {
  if (!payload.name || !payload.email || !payload.password) {
    throw new AppError(404, "Name email and password are required");
  }
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(404, "User already exists");
  }
  const newUser = await User.create(payload);
  const token = jwt.sign({ id: newUser._id }, config.jwt_secret as string, {
    expiresIn: "1d",
  });

  const mailOption = {
    from: config.sender_email,
    to: payload.email,
    subject: "Wellcome to our app",
    text: `You have successfully logged in to your account with email id: ${payload.email}`,
  };
  await transporter.sendMail(mailOption);

  return {
    token,
    user: newUser,
  };
};

const login = async (payload: Partial<IUser>) => {
  if (!payload.email || !payload.password) {
    throw new AppError(404, "Email and password are required");
  }
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new AppError(404, "Invalid password");
  }
  const token = jwt.sign({ id: user._id }, config.jwt_secret as string, {
    expiresIn: "1d",
  });

  return {
    token,
    user,
  };
};

const verifyOTP = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (user.isVerified) {
    throw new AppError(400, "User already verified");
  }

  const otp = String(Math.floor(100000 + Math.random() * 900000));
  user.verifyOtp = otp;
  user.verifyOtpExpiresAt = Date.now() + 10 * 60 * 1000;

  await user.save();

  const mailOption = {
    from: config.sender_email,
    to: user.email,
    subject: "Verify your account",
    text: `Your OTP is ${otp}. Please enter this OTP to verify your account.`,
  };

  await transporter.sendMail(mailOption);
};

const verifieEmail = async (userId: string, otp: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (user.isVerified) {
    throw new AppError(400, "User already verified");
  }

  if (user.verifyOtp !== otp) {
    throw new AppError(400, "Invalid OTP");
  }

  if (Date.now() > Number(user.verifyOtpExpiresAt)) {
    throw new AppError(400, "OTP expired");
  }

  user.isVerified = true;
  user.verifyOtp = "";
  user.verifyOtpExpiresAt = 0;

  await user.save();
};

const isAuthenticated = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  return user;
};

const resetOtp = async (email: string) => {
  if (!email) {
    throw new AppError(404, "Email is required");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new AppError(404, "User not found");
  }
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  user.resetOtp = otp;
  user.resetOtpExpiresAt = Date.now() + 10 * 60 * 1000;
  await user.save();

  const mailOption = {
    from: config.sender_email,
    to: user.email,
    subject: "Reset your password",
    text: `Your OTP is ${otp}. Please enter this OTP to reset your password.`,
  };

  await transporter.sendMail(mailOption);
};

const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string
) => {
  if (!email || !otp || !newPassword) {
    throw new AppError(400, "Email, OTP and new password are required");
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (!user.resetOtp || user.resetOtp !== otp) {
    throw new AppError(400, "Invalid OTP");
  }

  if (!user.resetOtpExpiresAt || Date.now() > Number(user.resetOtpExpiresAt)) {
    throw new AppError(400, "OTP expired");
  }

  // const hashedPassword = await bcrypt.hash(newPassword, Number(config.rounds));
  // user.password = hashedPassword;

  user.password = newPassword;

  // Clear OTP
  user.resetOtp = "";
  user.resetOtpExpiresAt = 0;

  await user.save();
};


// --------------------------------------user -----------------------------------

// get user profile

const profile = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  return user;
};


// update profile with image
const updateProfile = async (
  userId: string,
  payload: Partial<IUser>,
  file?: Express.Multer.File
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, "User not found");
  }

  let imageUrl: string | undefined;

  // Upload image only if a file is provided
  if (file) {
    const imgResult = await updateImg(file);

    if (
      !imgResult ||
      typeof imgResult !== "object" ||
      !("secure_url" in imgResult)
    ) {
      throw new AppError(500, "Image upload failed");
    }

    // ✅ Set value to outer variable
    imageUrl = (imgResult as { secure_url: string }).secure_url;
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      ...payload,
      ...(imageUrl && { profileImage: imageUrl }),
    },
    { new: true }
  );

  return updatedUser;
};

export const userService = {
  register,
  login,
  verifyOTP,
  verifieEmail,
  isAuthenticated,
  resetOtp,
  resetPassword,
  profile,
  updateProfile,
};
