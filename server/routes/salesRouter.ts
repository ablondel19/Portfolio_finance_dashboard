import { getCategoryList } from "../controllers/orders.controller.ts";
import { Customers } from "../models/customerModel.ts";
import { Orders } from "../models/orderModel.ts";
import { Payments } from "../models/paymentModel.ts";
import { Products } from "../models/productModel.ts";
import { Reviews } from "../models/reviewModel.ts";
import { Sellers } from "../models/sellerModel.ts";
import { Router } from "express";

const salesRouter = Router();

salesRouter.get("/", (_req, res) => {
  res.status(200).json("http://localhost:1337/sales");
});

salesRouter.get("/customers", async (_req, res) => {
  try {
    const data = await Customers.find().limit(5);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(404).json("Ressource not found");
  }
});

salesRouter.get("/orders", async (_req, res) => {
  try {
    const data = await Orders.find().limit(5);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(404).json("Ressource not found");
  }
});

salesRouter.get("/orders/categories", getCategoryList);

salesRouter.get("/payments", async (_req, res) => {
  try {
    const data = await Payments.find().limit(5);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(404).json("Ressource not found");
  }
});

salesRouter.get("/products", async (_req, res) => {
  try {
    const data = await Products.find().limit(5);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(404).json("Ressource not found");
  }
});

salesRouter.get("/reviews", async (_req, res) => {
  try {
    const data = await Reviews.find().limit(5);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(404).json("Ressource not found");
  }
});

salesRouter.get("/sellers", async (_req, res) => {
  try {
    const data = await Sellers.find().limit(5);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(404).json("Ressource not found");
  }
});

export default salesRouter;
