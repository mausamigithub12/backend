import { Router } from 'express';
const router = Router();
import { addnewinstructor,restoreData, deleteInst, deletedInst, getInstructorById, getallinstructor, updateInstructor, delpermanent } from '../controller/instructor.controller'
import { filevalidation, instructorValidation, multipleFileValidate } from '../utils/validation';
import { isAdminLogin } from '../middleware';
import { upload } from '../utils/uploads';




//instructor
router.route("/").get(getallinstructor).post(isAdminLogin,upload.fields([{ name: 'avatar' }, { name: 'citizenshipFront' }, { name: "citizenshipBack" }, { name: "cv" }, { name: "pancard" }]),addnewinstructor);

// delete many instructors
router.route('/deleteMany').post(isAdminLogin,deleteInst).get(isAdminLogin,deletedInst).patch(isAdminLogin,restoreData).delete(isAdminLogin,delpermanent)

router.route("/:id").patch(isAdminLogin,upload.fields([{ name: 'avatar' }, { name: 'citizenshipFront' }, { name: "citizenshipBack" }, { name: "cv" }, { name: "pancard" }]), updateInstructor)
    .get(isAdminLogin,getInstructorById)


export default router;