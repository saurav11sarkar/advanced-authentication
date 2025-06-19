import multer from "multer";
const uploadImgName = (filename: string) => {
  return multer({ storage: multer.memoryStorage() }).single(filename);
};
export default uploadImgName;
