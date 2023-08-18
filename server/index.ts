import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import kpiRoutes from "./routes/kpi.ts";
import productsRoutes from "./routes/products.ts";
import transactionsRoutes from "./routes/transactions.ts";
import kpiModel from "./models/kpiModel.ts";
import productModel from "./models/productModel.ts";
import transactionModel from "./models/transactionModel.ts";
import { products, transactions } from "./data/data.ts";
import kpis from "./datagen.ts";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:5173" }));

/* ROUTES */
app.use("/kpi", kpiRoutes);
app.use("/products", productsRoutes);
app.use("/transactions", transactionsRoutes);

/* MONGOOSE SETUP + SERVER START */
const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL || "";
mongoose
  .connect(MONGO_URL)
  .then(async () => {
    app.listen(PORT, () => console.log(`🚀 ~ App: Ready on port ${PORT}`));
    // MOCK DATA INSERT => USE ONCE ONLY
    // await kpiModel.insertMany(kpis);
    // await productModel.insertMany(products);
    // await transactionModel.insertMany(transactions);
  })
  .catch((error) => {
    console.log("~ Mongoose ~ error :", error);
  });
