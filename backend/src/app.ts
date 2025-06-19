import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgen from "morgan";
import cookieParser from "cookie-parser";
import config from "./config";
import router from "./router/router";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgen("dev"));
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: config.env === "development" ? err.stack : "",
  });
});

export default app;
