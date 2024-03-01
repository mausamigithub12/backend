import * as express from "express"; 
import { delPer, deletePost, getAllHackathon, getDeletedData, patchHackathon, postHackathon, restoreData } from "../controller/hackathon.controller";
import { hackathonValidation } from "../utils/validation";
import { upload } from "../utils/uploads";
import { isAdminLogin } from "../middleware";
const router = express.Router();

router.route("/").get(getAllHackathon).post(isAdminLogin,upload.single("image"),hackathonValidation,postHackathon)
router.route("/delete").get(isAdminLogin,getDeletedData)
router.route("/:id").post(isAdminLogin,restoreData).delete(isAdminLogin,deletePost).patch(isAdminLogin,upload.single("image"),hackathonValidation,patchHackathon)
router.route("/delPer/:id").delete(isAdminLogin,delPer)

export default router;