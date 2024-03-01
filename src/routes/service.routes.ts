import { Router } from "express";
import { deleteForeverServiceById, getAllService, getDeletedData, getServiceById, patchServiceById, postService, restoreServiceById, softRemoveServiceById } from "../controller/service.controller";
import { upload } from "../utils/uploads";
import { isAdminLogin } from "../middleware";

const router = Router()

router.route("/").get(getAllService).post(isAdminLogin,upload.fields([{ name: "banner" },{ name: "featured_image" }]), postService)
router.patch("/:id/restore",isAdminLogin, restoreServiceById);
router.delete("/:id/forever",isAdminLogin, deleteForeverServiceById);
router.route("/deletedData").get(isAdminLogin,getDeletedData);
router.route("/:id").get(getServiceById).patch(isAdminLogin,upload.fields([{ name: "banner" },{ name: "featured_image" }]), patchServiceById)
router.route("/deleteMany").post(isAdminLogin,softRemoveServiceById);

export default router