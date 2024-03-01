import { Router } from "express";
import { deleteForeverTrainingById, getAllTraining, getTrainingById, patchTrainingById, postTraining, restoreTrainingById, softRemoveTrainingById } from "../controller/training.controller";
import { upload } from "../utils/uploads";
import { isAdminLogin } from "../middleware";

const router = Router()

router.route("/").get(getAllTraining).post(isAdminLogin,upload.fields([{ name: 'banner', maxCount: 1 },{ name: 'featured_image', maxCount: 1 },{ name: 'images', maxCount: 12 }]), postTraining)

router.patch("/:id/restore",isAdminLogin, restoreTrainingById);
router.delete("/:id/forever",isAdminLogin ,deleteForeverTrainingById);

router.route("/:id").get(getTrainingById).patch(upload.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'featured_image', maxCount: 1 },
    { name: 'images', maxCount: 12 }
]),isAdminLogin, patchTrainingById).delete(isAdminLogin,softRemoveTrainingById)

export default router