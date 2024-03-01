
import * as express from 'express';
import { delPermanent, deleteNoties, getAllnotice, getDeletedData, getNoticeById, postNotice, restoreData, updateNotice } from '../controller/notice.controller';
import { upload } from '../utils/uploads';
import { noticevalidation } from '../utils/validation';
import { isAdminLogin } from '../middleware';

const router = express.Router();
//notices route
router.route("/").get(getAllnotice).post(isAdminLogin,upload.single("image"), noticevalidation, postNotice)
router.route("/deletemany").post(isAdminLogin,deleteNoties)
router.route("/deletedData").get(isAdminLogin,getDeletedData).patch(isAdminLogin,restoreData).delete(isAdminLogin,delPermanent)
router.route("/:id").patch(isAdminLogin,upload.single("image"), noticevalidation, updateNotice).get(isAdminLogin,getNoticeById)


export default router;