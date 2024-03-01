import { Router } from 'express';
const router = Router();
import { delPer, getAllReview, getDelData, newreview, softRemove } from '../controller/review.controller'
import { reviewValidation } from '../utils/validation';
import { isAdminLogin } from '../middleware';



//review
router.route("/").get(isAdminLogin,getAllReview).post(reviewValidation, newreview).delete(isAdminLogin,softRemove);
router.route("/delete").delete(isAdminLogin,delPer).get(isAdminLogin,getDelData);
export default router;
