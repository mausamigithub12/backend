import * as express from 'express';
import { editHome, getHome, postHome } from '../controller/home.controller';
import { homeValidation } from '../utils/validation';
import { isAdminLogin } from '../middleware';
import { upload } from '../utils/uploads';
const router = express.Router();

router.route("/").get(getHome).post(upload.fields([{name:"featuredimage"},{name:"portalimage"}]),homeValidation,postHome).patch(upload.fields([{name:"featuredimage"},{name:"portalimage"}]),homeValidation,editHome)


export default router