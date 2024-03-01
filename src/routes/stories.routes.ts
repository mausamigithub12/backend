import * as express from 'express';
import { delPer, deleteStories, editStories, getAllStories, postStories, restoreData } from '../controller/stories.controller';
const router = express.Router();

router.route("/").get(getAllStories).post(postStories).patch(editStories)
router.route("/deleteMany").post(deleteStories).patch(restoreData).delete(delPer)



export default router;