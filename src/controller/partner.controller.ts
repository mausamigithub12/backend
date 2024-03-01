import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Partner } from "../entity/partner";
import { Equal, IsNull, Not } from "typeorm";

const partnerRepo = AppDataSource.getRepository(Partner)

interface CustomRequest extends Request {
    files: any;
    file: any;
}

export const postPartner = async (req: CustomRequest, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Partner'] */

    try {

        if (req.files) {
            if (req?.files?.logo && req.files.logo.length > 0) {
                req.body.logo = req.files.logo[0].filename
            }

        }
        const result = await partnerRepo.save(req.body)
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

export const getAllPartner = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Partner'] */

    try {
        const result = await partnerRepo.find();
        if (!result) {
            return res.status(404).json({
                status: 404,
                message: "No partner records found",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Data fetched successfully",
            result,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
};

export const getPartnerById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Partner'] */

    try {

        const result = await partnerRepo.findOneBy({ id: Equal(req.params.id) })

        if (!result) {
            return res.status(400).json({
                status: 400,
                message: "Partner not exists"
            })
        }
        return res.status(200).json({
            status: 200,
            message: "Data fetched successfully",
            result
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}



export const patchPartnerById = async (req: CustomRequest, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Partner'] */

    console.log(req.body)
    try {
        if (!req.params.id) {
            return res.status(400).json({
                status: 400,
                message: "Partner Id is Missing",
            });
        }

        const existingResult = await partnerRepo.findOneBy({
            id: req.params.id
        })

        if (!existingResult) {
            return res.status(404).json({
                status: 404,
                message: "Partner doesn't exist",
            });
        }

        delete req.body.createdAt;
        delete req.body.updatedAt;
        delete req.body.deletedAt;
        delete req.body.deleteDate;

        if (req.files) {
            if (req?.files?.logo && req.files.logo.length > 0) {
                req.body.logo = req.files.logo[0].filename
            }

        }

        Object.assign(existingResult, req.body)

        const result = await partnerRepo.save(existingResult)


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


export const softRemovePartnerById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Partner'] */

    try {

        const existingResult = await partnerRepo.findOneBy({ id: req.params.id })

        if (!existingResult) return res.status(400).json({
            status: 400,
            message: 'No partner user'
        })

        const result = await partnerRepo.softRemove(existingResult)

        if (!result) {
            return res.status(400).json({
                status: 400,
                message: "Data cannot be deleted",
            })
        }
        return res.status(200).json({
            status: 400,
            message: "Data moved to trash",
            result
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

export const deleteForeverPartnerById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Partner'] */

    try {
        const removedData = await partnerRepo.find({
            where: {
                id: Equal(req.params.id)
            }, withDeleted: true
        })

        if (!removedData || removedData.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "No data available"
            })
        }



        const result = await partnerRepo.remove(removedData)

        if (!result) {
            return res.status(400).json({
                status: 400,
                message: "Data cannot be removed"
            })
        }
        return res.status(200).json({
            status: 200,
            message: "Data removed successfully",
            result
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

export const restorePartnerById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Partner'] */

    try {
        const existingResult = await partnerRepo.findOne({
            where: {
                id: Equal(req.params.id)
            }, withDeleted: true
        })
        if (!existingResult) {
            return res.status(400).json({
                status: 400,
                message: "Data cannot be deleted",
            })
        }
        existingResult.deletedAt = null
        const result = await partnerRepo.save(existingResult)

        if (result) {
            return res.status(200).json({
                status: 200,
                message: "Data recovered successfully",
                result
            })
        }

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

export const getDeletedData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await partnerRepo.find({ where: { deletedAt: Not(IsNull()) }, withDeleted: true });
        if (!result || result.length === 0) {
            return res.status(204).json({ status: 204, message: "no data found" })
        }
        res.json(result);
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}