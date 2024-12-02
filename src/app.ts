import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routers from "./app/routes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/", routers);

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "SERVER IS OK",
  });
});

export default app;
