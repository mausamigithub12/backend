import { Router } from "express";
import { delPermanently, deleteContactInfo, getContactInfo, getDeletedData, patchContactInfo, postContactInfo, restoreData } from "../controller/contact.controller";
import { upload } from "../utils/uploads";
import { isAdminLogin } from "../middleware";

const router = Router()
router.route("/").post(isAdminLogin,upload.fields([{ name: "icons", maxCount: 10 }]), postContactInfo).get(getContactInfo).patch(isAdminLogin,upload.fields([{ name: "icons" }]), patchContactInfo)
router.route("/deletedContact").get(isAdminLogin,getDeletedData).delete(isAdminLogin,deleteContactInfo).post(isAdminLogin,restoreData)
router.route("/delPer/:id").delete(isAdminLogin,delPermanently)

export default router