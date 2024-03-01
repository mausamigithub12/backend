import { Router } from 'express';
import { deleteSkill, getAllss, postSkills, updateSkill } from '../controller/skill.controller';
import { isAdminLogin } from '../middleware';
const router = Router();

router.route("/").get(getAllss).post(isAdminLogin,postSkills);
router.route("/deletemany").post(isAdminLogin,deleteSkill)

router.route('/:id').patch(isAdminLogin,updateSkill)

export default router;
