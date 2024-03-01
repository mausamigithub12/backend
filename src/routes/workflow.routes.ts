import * as express from 'express';
const router = express.Router();
import { getDeletedCardData, deleteCardInfo, getCardInfo, postCardInfo, restoreCardData, delPercard, editCard, getCardById } from '../controller/workflow.comtroller';
import { workflowValidation,filevalidation } from '../utils/validation';
import { upload } from '../utils/uploads';
import { isAdminLogin } from '../middleware';

router.route("/").get(getCardInfo).post(isAdminLogin,upload.single("image"),filevalidation,workflowValidation,postCardInfo)
router.route("/deleteMany").post(isAdminLogin,deleteCardInfo).get(isAdminLogin,getDeletedCardData).patch(isAdminLogin,restoreCardData).delete(isAdminLogin,delPercard)
router.route("/:id").patch(isAdminLogin,upload.single("image"),filevalidation,workflowValidation,editCard).get(isAdminLogin,getCardById);
export default router;