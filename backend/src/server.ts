import mongoose from "mongoose";
import config from "./config";
import app from "./app";

const port = config.port;
const server = async () => {
  try {
    await mongoose.connect(config.dbUri as string);
    console.log("database connected");
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

server();
