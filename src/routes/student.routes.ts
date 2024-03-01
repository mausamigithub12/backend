import { Router } from 'express';
const router = Router();
import { addnewstudent, deleteStudent, deletedStudent, getstudnet, updatestudent } from '../controller/student.controller';
import { studentValidation } from '../utils/validation';
import { isAdminLogin } from '../middleware';
import { upload } from '../utils/uploads';
import { filevalidation } from '../utils/validation';



//student
router.route("/").get(isAdminLogin,getstudnet).post(isAdminLogin,upload.fields([{ name: 'avatar' }, { name: 'payment' }]), studentValidation, addnewstudent);
router.route("/deltedStu").get(isAdminLogin,deletedStudent)
router.route("/deletestu/:id").delete(isAdminLogin,deleteStudent)
router.route("/updatestu/:id").patch(isAdminLogin,studentValidation, updatestudent);
export default router;