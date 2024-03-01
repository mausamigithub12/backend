import { enquiryValidation } from '../utils/validation';
import { Router } from 'express';
import { addNewEnquiry, deleteAllEnquiry, deleteEnquiry, getAllEnquiry } from '../controller/enquiry.controller';
import { isAdminLogin } from '../middleware';
const router = Router();



router.route("/").get(isAdminLogin,getAllEnquiry).post(enquiryValidation, addNewEnquiry);
router.route("/delallenquiry").delete(isAdminLogin,deleteAllEnquiry);
router.route("/delenquiry/:id").delete(isAdminLogin,deleteEnquiry);


export default router;