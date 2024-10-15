import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import DBconnect from "./config/DBconnect.js";
import authRoute from "./routers/authRoute.js";
import productRoute from "./routers/productRoute.js";
import buyingRouter from "./routers/buyingRoute.js";

dotenv.config({});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [process.env.CLIENT_URL, process.env.CLIENT_URL_2];

app.use(
  cors({
    origin:[process.env.CLIENT_URL,"http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1", buyingRouter);

app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "the app is working 😆",
  });
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "An internal server error occurred!",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  DBconnect();
  console.log(`App is running on port ${PORT} 😁`);
});
