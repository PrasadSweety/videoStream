import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRouter.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: ".env",
});

databaseConnection();

const app = express();
// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "https://video-stream-gray.vercel.app" || "http://localhost:3000",
  // "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`Request to ${req.url} took ${duration}ms`);
  });
  next();
});

app.use("/api/v1/user", userRoute);

app.get("*", (req, resp) => {
  console.log(__dirname);
  app.use(express.static(path.resolve(__dirname, "netflix", "build")));
  resp.sendFile(path.resolve(__dirname, "netflix", "build", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server listen at PORT: ${process.env.PORT}`);
});
