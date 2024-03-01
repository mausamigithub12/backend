import { Router } from 'express';
import { getNewLetterEmail, sendNewsLetter, subscribeNewLetter } from '../controller/newsletter.controller';
import { isAdminLogin } from '../middleware';
const router = Router();

router.route("/").post(subscribeNewLetter).get(isAdminLogin,getNewLetterEmail);
router.route("/sendmail").post(isAdminLogin,sendNewsLetter);
export default router;