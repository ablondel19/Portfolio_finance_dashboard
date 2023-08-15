import { Router } from "express";
import { getTransactions } from "../controllers/transactions.ts";

const router = Router();

router.get("/transactions", getTransactions);

export default router;
