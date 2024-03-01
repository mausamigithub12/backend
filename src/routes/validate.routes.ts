import { Router } from "express";
import { validateUser } from "../middleware";

const router = Router()
router.post("/", validateUser)

export default router