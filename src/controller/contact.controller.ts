import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Contact } from "../entity/contact";
import { IsNull, Not } from "typeorm";

const contactRepo = AppDataSource.getRepository(Contact)

interface CustomRequest extends Request {
    files: any;
    file: any;
}

export const postContactInfo = async (req: CustomRequest, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Contact'] */

    try {
        // const social_links = JSON.parse(req.body.socialLinks)
        const existingResult = await contactRepo.find()
        // if (existingResult.length > 0) {
        //     return res.status(400).json({
        //         status: "error",
        //         message: "Contact data cannot be more than one"
        //     })
        // }

        if (req.body?.socialLinks) {
            console.log(req.body?.socialLinks)
            req.body.socialLinks = JSON.parse(req?.body?.socialLinks)
        }
        console.log("req muni")
        if (req.files) {
            console.log(req.files)
            if (req?.files?.icons && req.files.icons.length > 0) {
                req.files.icons?.map((item: any, index: number) => {
                    req.body.socialLinks[index].icon = item.filename
                })
            }
        }


        req.body.socialLinks = JSON.stringify(req.body.socialLinks)

        const result = await contactRepo.save(req.body)
        if (!result) {
            return res.status(400).json({
                status: 400,
                message: "Data cannot be added",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Data added successfully",
            result,
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
}
//get contact information
export const getContactInfo = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Contact'] */

    try {
        const result = await contactRepo.find();
        if(!result || result.length == 0){
            return res.status(404).json({message:"no data found"})
        }
        return res.status(200).json({
            status: 200,
            message: "Data fetched successfully",
            result
        });
    } catch (e) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
};
//pudate contact information
export const patchContactInfo = async (req: CustomRequest, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Contact'] */

    try {
        // const social_links = JSON.parse(req.body.socialLinks)
        const existingResult = await contactRepo.find()
        if (!existingResult.length) {
            return res.status(400).json({
                status: 400,
                message: "No data exists"
            })
        }


        if (req.body?.socialLinks) {
            req.body.socialLinks = JSON.parse(req?.body?.socialLinks)
        }
        if (req.files) {
            if (req?.files?.icons && req.files.icons.length > 0) {
                req.files.icons?.map((item: any, index: number) => {
                    req.body.socialLinks[index].icon = item.filename
                })
            }
        }

        delete req.body.updatedAt
        delete req.body.createdAt
        delete req.body.deletedAt


        Object.assign(existingResult, req.body)
        const result = await contactRepo.save(existingResult)
        if (!result) {
            return res.status(400).json({
                status: 400,
                message: "Data cannot be added",
            });
        }
        return res.status(200).json({
            status: 200,
            message: "Data added successfully",
            result,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//soft delete contact
export const deleteContactInfo = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Contact'] */

    try {
        const result = await contactRepo.findOne({ where: { id: req.params.id } });
        if (!result) {
            return res.status(404).json({ status: 404, message: "no data found" })
        }
        await contactRepo.softRemove(result).then(result => {
            res.json({ message: "deleted sucessfully" })
        }).catch(err => {
            res.status(403).json({ status: 403, message: err.message || "cannot remove data" })
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
export const restoreData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Contact'] */

    try {
        const result = await contactRepo.findOne({ where: { id: req.params.id, deletedAt: Not(IsNull()) }, withDeleted: true });
        if (!result) {
            return res.status(404).json({ status: 404, message: "no data found" })
        }
        await contactRepo.save(result).then(result => {
            res.status(200).json({ status: 200, message: "data restored" })
        }).catch(err => {
            res.status(500).json({ status: 500, message: err.message || "cannot restore data" })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//delete permanently
export const delPermanently = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Contact'] */

    try {
        const result = await contactRepo.findOne({ where: { id: req.params.id, deletedAt: Not(IsNull()) }, withDeleted: true });
        if (!result) {
            return res.status(404).json({ status: 404, message: "no data found" })
        }
        await contactRepo.remove(result).then(result => {
            res.json({ message: "deleted permanently" })
        }).catch(err => {
            res.status(500).json({ status: 500, message: err.message || "cannot delete data" })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//get deleted data
export const getDeletedData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Contact'] */

    try {
        const result = await contactRepo.find({ where: { deletedAt: Not(IsNull()) }, withDeleted: true });
        if (!result) {
            return res.status(400).json({ status: 400, message: "no such data found" })
        }
        res.json(result);
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}