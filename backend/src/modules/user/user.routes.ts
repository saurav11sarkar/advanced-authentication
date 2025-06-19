import express from "express";
import { userController } from "./user.controller";
import userAuth from "../../middlewares/userAuth";
import uploadImgName from "../../config/multer";
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/verifyotp", userAuth(), userController.verifyOTP);
router.post("/verifyemail", userAuth(), userController.verifieEmail);
router.post("/is-auth", userAuth(), userController.isAuthenticated);
router.post("/resetotp", userController.resetOtp);
router.post("/resetpassword", userController.resetPassword);
router.get("/profile", userAuth(), userController.profile);
router.put("/update", userAuth(),uploadImgName('image'), userController.updateProfile);

export const userRoutes = router;
