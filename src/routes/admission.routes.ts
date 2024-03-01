import { Router } from 'express';


import { upload } from '../utils/uploads';
import { addOnlineStudent, deleteData, getAdmissionById, getAllDelData, getNonVerified, getOnlineStudentData, getVerifiedData, patchStudentById, restore, verify } from '../controller/admission.controller';
import { delPer } from '../controller/course.controller';
import { isAdminLogin } from '../middleware';
const router = Router();

router.route("/").post(isAdminLogin,upload.fields([{ name: 'avatar' }, { name: 'payment' }]), addOnlineStudent).get(isAdminLogin,getOnlineStudentData)
router.route("/deleteMany").post(isAdminLogin,deleteData)
router.route("/tNonVerified").get(isAdminLogin,getNonVerified);
router.route("/Verified").get(isAdminLogin,getVerifiedData);
router.route("/del").get(isAdminLogin,getAllDelData).post(isAdminLogin,restore)
router.route('/delPar').delete(isAdminLogin,delPer);


router.route("/:id/verify").patch(isAdminLogin,verify)
router.route("/:id").get(isAdminLogin,getAdmissionById).patch(isAdminLogin,upload.fields([{ name: 'avatar' }, { name: 'payment' }]), patchStudentById)

export default router;