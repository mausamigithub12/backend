import { achievements } from './../entity/achivement';
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Equal, In, IsNull, Not } from "typeorm";

const AchievementsRepo = AppDataSource.getRepository(achievements);

interface customeRequest extends Request {
    file: any,
    files: any
}

//get all the notices
export const getAllAchievements = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Achievements'] */

    try {
        const result = await AchievementsRepo.find();

        res.status(200).json({ status: 200, message: "successful", result })

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

//post notice in database
export const postAchievement = async (req: customeRequest, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Achievements'] */

    try {
        if (req.file) {
            req.body.image = req.file.filename;
        }
        await AchievementsRepo.save(req.body).then(result => {
            res.status(200).json({ status: 200, message: "save successfully" })
        }).catch(err => {
            res.status(500).json({ status: 500, message: "cannot save data" });
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}

//update notice
export const updateAchievement = async (req: customeRequest, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Achievements'] */

    try {
        const result = await AchievementsRepo.findOne({ where: { id: Equal(req.params.id) } });
        if (!result) {
            return res.status(404).json({ status: 404, message: 'no data found' });
        }
        if (req.file) {
            req.body.image = req.file.filename
        }
        Object.assign(result, req.body);
        AchievementsRepo.save(result).then(result => {
            res.status(200).json({ status: 200, message: "updated successfully" });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ status: 500, message: "cannot save data" });
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}

//delete notice
export const deleteAchievement = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Achievements'] */

    try {
        const result = await AchievementsRepo.find({ where: { id: In([...JSON.parse(req.body.ids)]) } });
        if (!result || result.length == 0) {
            return res.status(200).json({ status: 200, message: "not such data found" });
        }
        result.forEach(async data => {
            await AchievementsRepo.softRemove(data);
        })
        res.status(200).json({ message: 'delete data successfully' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}

//get all soft deleted data
export const getDeletedData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Achievements'] */

    try {
        const result = await AchievementsRepo.find({
            withDeleted: true,
            where: {
                deletedAt: Not(IsNull())
            }
        });
        if (!result || result.length == 0) {
            return res.status(404).json({ status: 404, message: "no such data found" });
        }
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}

//restore deleted data
export const restoreData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Achievements'] */

    try {
        const result = await AchievementsRepo.find({ where: { id: Equal(In([...JSON.parse(req.body.ids)])) }, withDeleted: true })
        if (!result || result.length == 0) {
            return res.status(200).json({ status: 200, message: "nothing to restore" });
        }
        result.forEach(async data => {
            data.deletedAt = null;
            await AchievementsRepo.save(data);
        });
        res.status(200).json({ status: 200, message: "restore successfully" })

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}

//delete permanently
export const delPermanent = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Achievements'] */

    try {
        const result = await AchievementsRepo.find({ where: { id: Equal(In([...JSON.parse(req.body.ids)])) }, withDeleted: true });
        if (!result || result.length == 0) {
            return res.status(200).json({ status: 200, message: "nothing to delete" })
        }
        // const finalResult = result.map(data => data.deletedAt = new Date());
        // await AchievementsRepo.save(result);

        result.forEach(async data => {
            await AchievementsRepo.remove(data);
        })
        res.status(200).json({ status: 200, message: "remove successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}

export const getAchievementsById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await AchievementsRepo.findOne({ where: { id: Equal(req.params.id) } });
        if (!result) {
            return res.status(404).json({ status: 404, message: "Record Not found" })
        }
        res.status(200).json({ status: 200, result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}