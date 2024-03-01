import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Corporate } from "../entity/corporate";
import { Equal } from "typeorm";

const corporateRepo = AppDataSource.getRepository(Corporate)

interface CustomRequest extends Request {
    files: any
    file: any;
}

export const postCorporate = async (req: CustomRequest, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Corporate'] */

    try {
        const existingResult = await corporateRepo.find()
        if (existingResult.length > 0) {
            return res.status(400).json({
                status: 400,
                message: "Corporate data cannot be more than one"
            })
        }
        if (req.files) {
            if (req?.files?.banner && req.files.banner.length > 0) {
                req.body.banner = req.files.banner[0].filename
            }
            if (req?.files?.featured_image && req.files.featured_image.length > 0) {
                req.body.featured_image = req.files.featured_image[0].filename
            }
        }
        const result = await corporateRepo.save(req.body)
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

export const getAllCorporate = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Corporate'] */

    try {
        const result = await corporateRepo.find();
        if (!result.length) {
            return res.status(404).json({
                status: 404,
                message: "No corporate records found",
            });
        }

        return res.status(200).json({
            status: 200,
            message: "Data fetched successfully",
            result: result[0]
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
};

export const getCorporateById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Corporate'] */

    try {

        const result = await corporateRepo.findOneBy({ id: Equal(req.params.id) })

        if (!result) {
            return res.status(400).json({
                status: 400,
                message: "Corporate not exists"
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
export const patchCorporateById = async (req: CustomRequest, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Corporate'] */

    try {

        const existingResult = await corporateRepo.find()

        if (!existingResult.length) {
            return res.status(404).json({
                status: 404,
                message: "Corporate doesn't exist",
            });
        }

        if (req.files) {
            if (req?.files?.banner && req.files.banner.length > 0) {
                req.body.banner = req.files.banner[0].filename
            }
            if (req?.files?.featured_image && req.files.featured_image.length > 0) {
                req.body.featured_image = req.files.featured_image[0].filename
            }
        }

        Object.assign(existingResult[0], req.body)

        const result = await corporateRepo.save(existingResult[0])


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


export const softRemoveCorporateById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Corporate'] */

    try {

        const existingResult = await corporateRepo.findOneBy({ id: req.params.id })

        if (!existingResult) return res.status(400).json({
            status: 400,
            message: 'No corporate user'
        })

        const result = await corporateRepo.softRemove(existingResult)

        if (!result) {
            return res.status(400).json({
                status: 400,
                message: "Data cannot be deleted",
            })
        }
        return res.status(200).json({
            status: 200,
            message: "Data moved to trash",
            result
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

export const deleteForeverCorporateById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Corporate'] */

    try {
        const removedData = await corporateRepo.find({
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



        const result = await corporateRepo.remove(removedData)

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

export const restoreCorporateById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Corporate'] */

    try {
        const existingResult = await corporateRepo.findOne({
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
        const result = await corporateRepo.save(existingResult)

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