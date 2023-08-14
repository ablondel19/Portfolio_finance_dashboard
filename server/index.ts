import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import kpiRoutes from "./routes/kpi.ts";
import kpiModel from "./models/kpiModel.ts";
import { kpis } from "./data/data.ts";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:5173/" }));

/* ROUTES */
app.use("/kpi", kpiRoutes);

/* MONGOOSE SETUP + SERVER START + MOCK DATA INSERT */
const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL || "";
mongoose
  .connect(MONGO_URL)
  .then(async () => {
    app.listen(PORT, () => console.log(`🚀 ~ App: Ready on port ${PORT}`));
    // USE ONCE ONLY
    // await kpiModel.insertMany(kpis);
  })
  .catch((error) => {
    console.log("~ Mongoose ~ error :", error);
  });
