import { Router } from 'express';
import { delmsg, getmsg, postMessage } from '../controller/message.controller';
import { messageValidation } from '../utils/validation';
import { isAdminLogin } from '../middleware';
const router = Router();


router.route("/").get(isAdminLogin,getmsg).post(messageValidation, postMessage).delete(isAdminLogin,delmsg);

export default router;