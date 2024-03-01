import { Router } from "express";
import { deleteForeverPartnerById, getAllPartner, getDeletedData, getPartnerById, patchPartnerById, postPartner, restorePartnerById, softRemovePartnerById } from "../controller/partner.controller";
import { upload } from "../utils/uploads";
import { isAdminLogin } from "../middleware";

const router = Router()

router.route("/").get(getAllPartner).post(isAdminLogin,upload.fields([
    { name: "logo" },
]), postPartner)


router.patch("/:id/restore", isAdminLogin,restorePartnerById);
router.delete("/:id/forever", isAdminLogin,deleteForeverPartnerById);
router.route("/deletedData").get(isAdminLogin,getDeletedData);
router.route("/:id").get(isAdminLogin,getPartnerById).patch(isAdminLogin,upload.fields([
    { name: "logo" },
]), patchPartnerById).delete(isAdminLogin,softRemovePartnerById)

export default router