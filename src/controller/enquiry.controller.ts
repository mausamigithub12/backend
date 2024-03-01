import { Equal } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { enquiry } from '../entity/enquiry';
import { AppDataSource } from '../data-source';
const Enquiry = AppDataSource.getRepository(enquiry);

//get all enquirys
export const getAllEnquiry = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Enquiry'] */

    try {
        let result = await Enquiry.find()
        if(!result || result.length == 0){
            return res.status(404).json({message:"no data found"})
        }
        res.json({result});
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }

}

//delete particular enquiry
export const deleteEnquiry = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Enquiry'] */

    try {
        let enquiryToDel = await Enquiry.findOne({ where: { id: Equal(req.params.id) } });
        if (!enquiryToDel) {
            return res.status(400).json({ status: 400, message: "data not found or already deleted" });
        }
        await Enquiry.remove(enquiryToDel);
        res.status(200).json({ status: 200, message: "deleted successfully" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }


}

//delete all enquiry
export const deleteAllEnquiry = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Enquiry'] */

    try {
        let numOfEffect = await Enquiry.delete({});
        if (numOfEffect.raw == 0) {
            return res.status(400).json({ status: 400, message: "nothing deleted" });
        }
        res.json({ message: "all data deleted" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }

}

//post enquiry
export const addNewEnquiry = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Enquiry'] */

    try {
        await Enquiry.save(req.body).then(result => {
            res.status(200).json({ status: 200, message: "data saved" });
        }).catch(err => {
            res.status(400).json({ status: 400, message: "cannot save data" });
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }


}