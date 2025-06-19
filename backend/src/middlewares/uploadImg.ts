import streamifier from "streamifier";
import cloudinary from "../config/clodanary";

const updateImg = (file: Express.Multer.File): Promise<{ secure_url: string } | null> => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      {
        folder: "profile",
        resource_type: "auto",
        transformation: {
          width: 500,
          height: 500,
          crop: "limit",
        },
        public_id: `${Date.now()}-${file.originalname}`,
      },
      (err, result) => {
        if (err || !result) {
          return reject(err || new Error("Upload failed"));
        }
        return resolve(result);
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};


export default updateImg;
