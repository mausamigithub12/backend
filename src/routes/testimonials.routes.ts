import * as express from 'express';
import { mapReviews } from '../controller/testimonical.controller';
import { isAdminLogin } from '../middleware';
const router = express.Router();

router.route("/").get(mapReviews)


export default router;