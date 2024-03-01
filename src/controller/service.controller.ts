import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Service } from "../entity/service";
import { Equal, In, IsNull, Not } from "typeorm";

const serviceRepo = AppDataSource.getRepository(Service)

interface CustomRequest extends Request {
    files: any;
    file: any;
}

export const postService = async (req: CustomRequest, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Service'] */

    try {

        if (req.files) {
            if (req?.files?.banner && req.files.banner.length > 0) {
                req.body.banner = req.files.banner[0].filename
            }
            if (req?.files?.featured_image && req.files.featured_image.length > 0) {
                req.body.featured_image = req.files.featured_image[0].filename
            }
        }
        const result = await serviceRepo.save(req.body)
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

export const getAllService = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Service'] */

    try {
        const result = await serviceRepo.find();
        if (!result) {
            return res.status(404).json({
                status: 404,
                message: "No service records found",
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

export const getServiceById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Service'] */

    try {

        const result = await serviceRepo.findOneBy({ id: Equal(req.params.id) })

        if (!result) {
            return res.status(400).json({
                status: 400,
                message: "Service not exists"
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



export const patchServiceById = async (req: CustomRequest, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Service'] */

    try {
        if (!req.params.id) {
            return res.status(400).json({
                status: 400,
                message: "Service Id is Missing",
            });
        }

        const existingResult = await serviceRepo.findOneBy({
            id: req.params.id
        })

        if (!existingResult) {
            return res.status(404).json({
                status: 404,
                message: "Service doesn't exist",
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

        Object.assign(existingResult, req.body)

        const result = await serviceRepo.save(existingResult)


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

export const getDeletedData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await serviceRepo.find({ where: { deletedAt: Not(IsNull()) }, withDeleted: true })
        if (!result || result.length === 0) {
            return res.status(200).json({ status: 200, message: "no such data found" })
        }
        res.status(200).json(result);
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

export const softRemoveServiceById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Service'] */

    try {
        const servies = await serviceRepo.find({ where: { id: In([...JSON.parse(req.body.ids)]) } });
        // const existingResult = await serviceRepo.findOneBy({ id: req.body.ids })

        if (!servies || servies.length == 0) return res.status(400).json({ status: 400, message: 'No service user' })
        servies.map(async data => await serviceRepo.softRemove(data));
        return res.status(200).json({ status: 200, message: "Data moved to trash", })

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

export const deleteForeverServiceById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Service'] */

    try {
        const removedData = await serviceRepo.find({
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



        const result = await serviceRepo.remove(removedData)

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

export const restoreServiceById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Service'] */

    try {
        const existingResult = await serviceRepo.findOne({
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
        const result = await serviceRepo.save(existingResult)

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