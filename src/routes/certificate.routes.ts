import * as express from 'express';
import { checkCertificate } from '../controller/certificate.controller';
const router = express.Router();

router.route("/").get(checkCertificate)



export default router;