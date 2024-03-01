import * as express from 'express';
import { delPermanent, deleteAchievement, getAchievementsById, getAllAchievements, getDeletedData, postAchievement, restoreData, updateAchievement } from '../controller/achivement.controller';
import { upload } from '../utils/uploads';
import { achievementsvalidation } from '../utils/validation';
import { isAdminLogin } from '../middleware';
const router = express.Router();

router.route("/").get(getAllAchievements).post(isAdminLogin, upload.single("image"), achievementsvalidation, postAchievement);
router.route("/deletedData").get(isAdminLogin, getDeletedData).patch(isAdminLogin, restoreData).delete(isAdminLogin, delPermanent);
router.route("/deletemany").post(isAdminLogin, deleteAchievement)
router.route("/:id").get(isAdminLogin, getAchievementsById).patch(isAdminLogin, upload.single("image"), achievementsvalidation, updateAchievement);




export default router;