import { Router } from 'express';
const router = Router();
import { addnewsyllabus, deletesyllabus, deletedsyllabus, updatesyllabus, restoreData, delper } from '../controller/syllabus.controller';
import { syllabusVaidation } from '../utils/validation';
import { isAdminLogin } from '../middleware';

//syllabus
router.route("/").post(isAdminLogin, syllabusVaidation, addnewsyllabus).patch(isAdminLogin, updatesyllabus);
router.route("/deleteMany").post(isAdminLogin, deletesyllabus)
router.route("/delete").delete(isAdminLogin, delper).patch(isAdminLogin, restoreData).get(isAdminLogin, deletedsyllabus);
router.route("/:id").patch(isAdminLogin, syllabusVaidation, updatesyllabus);
export default router;
