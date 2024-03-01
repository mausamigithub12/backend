import * as express from 'express';
const router = express.Router();
import {  editAboutInfo, getAboutInfo, postAboutInfo } from '../controller/about.controller';
import { aboutValidation, filevalidation, workValidation } from '../utils/validation';
import { upload } from '../utils/uploads';
import { isAdminLogin } from '../middleware';

router.route("/").get(getAboutInfo).post(isAdminLogin,upload.single("image"),aboutValidation,postAboutInfo).patch(isAdminLogin,upload.single("image"),aboutValidation,editAboutInfo)
// router.route("/work").get(getWorkInfo).post(upload.single("image"),filevalidation,workValidation,postWorkInfo).patch(upload.single("image"),filevalidation,workValidation,editWorkInfo)

export default router;