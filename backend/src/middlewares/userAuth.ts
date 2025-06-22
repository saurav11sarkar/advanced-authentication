import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/appError";
import config from "../config";

const userAuth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.cookies.token || req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new AppError(401, "Token not found");
      }

      const decoded = jwt.verify(
        token,
        config.jwt_secret as string
      ) as JwtPayload;

      if (!decoded || typeof decoded !== "object" || !decoded.id) {
        throw new AppError(401, "Invalid token");
      }

      req.userId = decoded.id;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default userAuth;
