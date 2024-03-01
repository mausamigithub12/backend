import { NextFunction, Request, Response } from "express";
import { hackathon } from "../entity/hackathon";
import { AppDataSource } from "../data-source";
import { Equal, IsNull, Not } from "typeorm";
const hack = AppDataSource.getRepository(hackathon);
//get all the hackathon 
export const getAllHackathon = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Hackathon'] */

    try {
        const result = await hack.find({});
        if (!result || result.length === 0) {
            return res.json({ message: "no data found" })
        }
        res.json(result);
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//post hackathon
export const postHackathon = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Hackathon'] */

    try {
        if (req.file) {
            req.body.image = req.file.filename
        }
        await hack.save(req.body).then(result => {
            res.json({ message: "save successully" })
        }).catch(err => {
            res.json({ message: err.message || "cannot save data" })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//update in hackathon
export const patchHackathon = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Hackathon'] */

    try {
        const result = await hack.findOne({ where: { id: Equal(req.params.id) } })
        if (!result) {
            return res.json({ message: "no data found" })
        }
        if (req.file) {
            req.body.image = req.file.filename
        }
        Object.assign(result, req.body);
        await hack.save(result).then(result => {
            res.json({ message: "save sucessfully" })
        }).catch(err => {
            res.json({ message: err.message })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//delete route
export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Hackathon'] */

    try {
        const result = await hack.findOne({ where: { id: Equal(req.params.id) } });
        if (!result) {
            return res.json({ message: 'no such data found' })
        }
        await hack.softRemove(result).then(result => {
            res.json({ message: "delete sucessfully" })
        }).catch(err => {
            res.json({ message: err.message })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//resotore data 
export const restoreData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Hackathon'] */

    try {
        const result = await hack.findOne({ where: { id: Equal(req.params.id), deletedAt: Not(IsNull()) }, withDeleted: true });
        if (!result) {
            return res.json({ message: "no such data found" })
        }
        result.deletedAt = null
        // const hacks = await AppDataSource.getRepository(hackathon).createQueryBuilder().restore().where("id =:id",{id:result.id}).execute();
        await hack.save(result).then(result => {
            res.json({ message: "restore sucessfully" })
        }).catch(err => {
            res.json({ message: err.message || "cannot restore data" })
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//get deleted data
export const getDeletedData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Hackathon'] */

    try {
        const result = await hack.find({ where: { deletedAt: Not(IsNull()) }, withDeleted: true })
        if (!result || result.length === 0) {
            return res.json({ message: "no such data found" });
        }
        res.json(result);
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//delete pernmanent
export const delPer = async (req: Request, res: Response, nexy: NextFunction) => {
    /* 	#swagger.tags = ['Hackathon'] */

    try {
        const result = await hack.findOne({ where: { id: req.params.id, deletedAt: Not(IsNull()) }, withDeleted: true });
        if (!result) {
            return res.json({ message: "no such data found" })
        }
        await hack.remove(result).then(result => {
            res.status(200).json({ status: 200, message: "remove permanently" })
        }).catch(err => {
            res.status(500).json({ status: 500, message: err.message || "cannot delete" })
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}