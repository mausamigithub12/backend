import { NextFunction, Request, Response } from "express";
import { admission } from '../entity/admission';
import { AppDataSource } from "../data-source";
import { Equal } from "typeorm";
const student = AppDataSource.getRepository(admission);

export const checkCertificate = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Certificate'] */

    try {
        const result = await student.findOne({ where: { regNo: Equal(req.params.id) } });
        if (!result) {
            return res.status(400).json({ status: 400, message: `invalid registration no:- ${req.body.regNO}` });
        }
        if (result.certificateStatus == false) {
            return res.status(403).json({ status: 403, message: "you are not eligible for the certificate" })
        }
        res.status(200).json({ status: 200, message: "sucess", result });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}