import express from "express";
import { userRoutes } from "../modules/user/user.routes";
const router = express.Router();

router.use("/user", userRoutes);

export default router;
