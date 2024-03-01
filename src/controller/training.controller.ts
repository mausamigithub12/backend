import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Training } from "../entity/training";
import { Equal, In, IsNull, Not } from "typeorm";
import { instructor } from "../entity/instructor";
import { Partner } from "../entity/partner";
import { course } from "../entity/course";

const trainingRepo = AppDataSource.getRepository(Training)
const instructorRepo = AppDataSource.getRepository(instructor)
const partnerRepo = AppDataSource.getRepository(Partner)
const courseRepo = AppDataSource.getRepository(course)

interface CustomRequest extends Request {
    files: any;
    file: any;
}

export const postTraining = async (req: CustomRequest, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Training'] */

    try {

        if (req.files) {
            if (req?.files?.banner && req.files.banner.length > 0) {
                req.body.banner = req.files.banner[0].filename
            }

            if (req?.files?.featured_image && req.files.featured_image.length > 0) {
                req.body.featured_image = req.files.featured_image[0].filename
            }

            if (req?.files?.images && req.files.images.length > 0) {
                req.body.images = req.files.images.map((item: any) => {
                    return item.filename
                })
            }
        }

        let instructors: any;

        if (req.body?.instructorIds) {
            instructors = await instructorRepo.find({ where: { id: In([...JSON.parse(req.body.instructorIds)]) } })
        }

        let partners: any
        if (req.body?.partnerIds) {
            partners = await partnerRepo.findOneBy({ id: req.body.partnerIds })
        }

        let courses: any
        if (req.body?.partnerIds) {
            courses = await courseRepo.findOneBy({ id: req.body.courseIds })
        }

        req.body.instructors = instructors
        req.body.course = courses
        req.body.partner = partners
        const result = await trainingRepo.save(req.body)

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

export const getAllTraining = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Training'] */

    try {

        const result = await trainingRepo.find({
            relations: {
                course: true,
                partner: true,
                instructors: true
            }
        });
        if (!result) {
            return res.status(404).json({
                status: 404,
                message: "No training records found",
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

export const getTrainingById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Training'] */

    try {
        const result = await trainingRepo.findOne({
            where: {
                id: Equal(req.params.id),
            }, relations: {
                instructors: true,
                partner: true,
                course: true
            }
        },)

        if (!result) {
            return res.status(400).json({
                status: 400,
                message: "Training not exists"
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
export const patchTrainingById = async (req: CustomRequest, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Training'] */

    try {
        if (!req.params.id) {
            return res.status(400).json({
                status: 400,
                message: "Training Id is Missing",
            });
        }

        const existingResult = await trainingRepo.findOneBy({
            id: req.params.id
        })


        if (!existingResult) {
            return res.status(404).json({
                status: 404,
                message: "Training doesn't exist",
            });
        }



        if (req.files) {
            if (req?.files?.banner && req.files.banner.length > 0) {
                req.body.banner = req.files.banner[0].filename
            }
            if (req?.files?.featured_image && req.files.featured_image.length > 0) {
                req.body.featured_image = req.files.featured_image[0].filename
            }
            if (req?.files?.images && req.files.images.length > 0) {
                req.body.images = req.files.images.map((item: any) => {
                    return item.filename
                })
            }
        }

        let partners: any
        if (req.body?.partnerIds) {
            partners = await partnerRepo.findOneBy({ id: req.body.partnerIds })
        }

        let instructors: any;
        if (req.body?.instructorIds) {
            instructors = await instructorRepo.find({ where: { id: In([...JSON.parse(req.body.instructorIds)]) } })
        }

        let courses: any
        if (req.body?.partnerIds) {
            courses = await courseRepo.findOneBy({ id: req.body.courseIds })
        }

        req.body.instructors = instructors
        req.body.course = courses
        req.body.partner = partners

        delete req.body.createdAt;
        delete req.body.updatedAt;
        delete req.body.deletedAt;
        delete req.body.deleteDate;


        const result = await trainingRepo.save(req.body)


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
        const result = await trainingRepo.find({ where: { deletedAt: Not(IsNull()) }, withDeleted: true })
        if (!result || result.length === 0) {
            return res.status(204).json({ status: 204, message: "no such data found" })
        }
        res.status(200).json({ status: 204, data: result });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
export const softRemoveTrainingById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Training'] */

    try {

        const existingResult = await trainingRepo.findOneBy({ id: req.params.id })

        if (!existingResult) return res.status(400).json({
            status: 400,
            message: 'No training user'
        })

        const result = await trainingRepo.softRemove(existingResult)

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

export const deleteForeverTrainingById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Training'] */

    try {
        const removedData = await trainingRepo.find({
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
        const result = await trainingRepo.softRemove(removedData)

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

export const restoreTrainingById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Training'] */

    try {
        const existingResult = await trainingRepo.findOne({
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
        const result = await trainingRepo.save(existingResult)

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