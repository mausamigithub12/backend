import * as express from 'express';
import { chooseValidation } from '../utils/validation';
import { delPerWhyToChoose, deleteWhyToChoose, editWhyToChoose, getChooseById, getDeletedData, getWhyToChoose, postWhytoChoose, restoreData } from '../controller/whyus.controller';
import { upload } from '../utils/uploads';
import { isAdminLogin } from '../middleware';
const router = express.Router();

router.route("/").get(getWhyToChoose).post(isAdminLogin,upload.single("image"),chooseValidation,postWhytoChoose)
router.route("/deleteMany").post(isAdminLogin,deleteWhyToChoose).patch(isAdminLogin,restoreData).get(isAdminLogin,getDeletedData).delete(isAdminLogin,delPerWhyToChoose);
router.route("/:id").get(isAdminLogin,getChooseById).patch(isAdminLogin,upload.single("image"),chooseValidation,editWhyToChoose)

export default router