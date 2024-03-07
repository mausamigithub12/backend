import { Router } from 'express';
import { addnewcourse, courseStudent, delPer, getCourses, getcoursedetails, getsyllabus, getrealtedcourse, updateCourse, getRevOfCourse, getcourseinstructor, deleteCourse, restoreData, deletedData } from '../controller/course.controller';
import { courseValidation, syllabusVaidation } from '../utils/validation';
import { upload } from '../utils/uploads';
import { isAdminLogin } from '../middleware';

const router = Router();

//course
router.route("/").get(getCourses).post(upload.single("image"), addnewcourse);
router.route("/deleteMany").post(isAdminLogin, deleteCourse).patch(isAdminLogin, restoreData).get(isAdminLogin, deletedData)
router.route("/getinstructor/:id").get(isAdminLogin, getcourseinstructor);
router.route("/delPermanent/:id").delete(delPer);
router.route("/coursereview/:id").get(isAdminLogin, getRevOfCourse);
router.route("/relatedcourse/:id").get(isAdminLogin, getrealtedcourse);
router.route("/getcurstu/:id").get(isAdminLogin, courseStudent);

router.route("/:id/syllabus").get(getsyllabus);
router.route("/:id").get(getcoursedetails).patch(upload.single("image"), updateCourse).delete(delPer);


export default router;