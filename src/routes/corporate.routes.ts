import { Router } from "express";
import { deleteForeverCorporateById, getAllCorporate, getCorporateById, patchCorporateById, postCorporate, restoreCorporateById, softRemoveCorporateById } from "../controller/corporate.controller";
import { upload } from "../utils/uploads";
import { isAdminLogin } from "../middleware";

const router = Router()

router.route("/").get(getAllCorporate).post(isAdminLogin,upload.fields([{ name: "banner" },{ name: "featured_image" }]), postCorporate).patch(isAdminLogin,upload.fields([{ name: "banner" },{ name: "featured_image" }]), patchCorporateById)

router.patch("/:id/restore",isAdminLogin, restoreCorporateById);
router.delete("/:id/forever", isAdminLogin,deleteForeverCorporateById);

router.route("/:id").get(isAdminLogin,getCorporateById).delete(isAdminLogin,softRemoveCorporateById)

export default router