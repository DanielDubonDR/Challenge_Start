import { Router } from "express";
import { ping, pong } from "../controllers/test.controller.js";

const router = Router();

// Rutas de prueba
router.get("/ping", ping);
router.post("/pong", pong);


export default router;