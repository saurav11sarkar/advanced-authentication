export interface IUser {
  name?: string;
  email: string;
  password: string;
  verifyOtp?: string;
  verifyOtpExpiresAt?: Number;
  isVerified?: boolean;
  resetOtp?: string;
  resetOtpExpiresAt?: Number;
  profileImage?: string;
}
