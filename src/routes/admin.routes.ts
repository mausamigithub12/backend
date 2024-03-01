import { login, signup } from '../controller/admin.controller';
import { isAdminLogin } from '../middleware';
import { Router } from 'express';
const router = Router();
router.route("/login").post(login);
router.route("/signup").post(signup);

export default router;