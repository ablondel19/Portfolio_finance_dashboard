import { Router } from "express";
import { getKpis } from "../controllers/kpi.ts";

const router = Router();

router.get("/kpis", getKpis);

export default router;
