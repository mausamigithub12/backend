import * as express from 'express';
import { delPerProvide, deleteProvideInfo, editWhatWeProvideInfo, getDeletedProvideData, getWhatWeProvideById, getWhatWeProvideInfo, postWhatWeProvideInfo, restoreProvideData } from '../controller/provide.controller';
import { provideValidation } from '../utils/validation';
import { upload } from '../utils/uploads';
import { isAdminLogin } from '../middleware';
const router = express.Router()
router.route("/").get(getWhatWeProvideInfo).post(isAdminLogin,upload.single("image"),provideValidation,postWhatWeProvideInfo)
router.route("/:id").patch(isAdminLogin,upload.single("image"),provideValidation,editWhatWeProvideInfo).get(isAdminLogin,getWhatWeProvideById)
router.route("/deleteMany").post(isAdminLogin,deleteProvideInfo).get(isAdminLogin,getDeletedProvideData).patch(isAdminLogin,restoreProvideData).delete(isAdminLogin,delPerProvide)
export default router;