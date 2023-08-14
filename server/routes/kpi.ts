import { Router } from "express";
import { getKpis } from "../controllers/kpi.ts";

const router = Router();

router.get("/kpi", getKpis);

export default router;
