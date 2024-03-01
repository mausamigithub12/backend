import { NextFunction, Request, Response } from "express";
import { Choose } from '../entity/home';
import { AppDataSource } from "../data-source";
import { Equal, In, IsNull, Not } from "typeorm";
const choose = AppDataSource.getRepository(Choose);
//get all Why to choose data
export const getWhyToChoose = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['chooose'] */

    try {
        const result = await choose.find({})
        // console.log(result)
        // if(!result || result.length == 0){
        //     return res.status(204).json({status:204,message:"no such data found"})
        // }
        res.status(200).json({ status: 200, result })
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" })
    }
}
//post why to choose
export const postWhytoChoose = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['chooose'] */

    try {
        if (req.file) {
            req.body.image = req.file.filename;
        }
        await choose.save(req.body).then(() => {
            res.status(200).json({ status: 200, message: "data save sucessfully" })
        }).catch(err => {
            res.status(500).json({ status: 500, message: err.message || "cannot save data in database" });
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" })
    }
}
//get why to choose by id
export const getChooseById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['chooose'] */

    try {
        const result = await choose.findOneBy({ id: Equal(req.params.id) });
        if (!result) {
            return res.status(404).json({ status: 404, message: "no such data found" })
        }
        res.status(200).json({ status: 200, result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" })
    }
}
//edit why to choose
export const editWhyToChoose = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['chooose'] */

    try {
        const result = await choose.findOne({ where: { id: Equal(req.params.id) } })
        if (!result) {
            return res.status(404).json({ status: 404, message: "cannot get data" })
        }
        if (req.file) {
            req.body.image = req.file.filename
        }
        Object.assign(result, req.body);
        await choose.save(result).then(() => {
            return res.status(200).json({ status: 200, message: "save sucessfully" })
        }).catch(err => {
            return res.status(500).json({ status: 500, message: err.message || "something went wrong" })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" })
    }
}
//delete why to choose it take data req.body.ids 
export const deleteWhyToChoose = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await choose.find({ where: { id: Equal(In([...JSON.parse(req.body.ids)])) } })
        if (!result || result.length == 0) {
            return res.status(404).json({ status: 404, message: "empty array" })
        }
        result.map(async data => await choose.softRemove(data));
        res.status(200).json({ status: 200, message: "deleted sucessfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" })
    }
}
//get all deleted data
export const getDeletedData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['chooose'] */

    try {
        const result = await choose.find({ where: { deletedAt: Not(IsNull()) }, withDeleted: true })
        if (!result || result.length == 0) {
            return res.status(404).json({ status: 404, message: "can't get data" })
        }
        res.status(200).json({ status: 200, data: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" })
    }
}
//restore deleted data
export const restoreData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['choose'] */


    try {
        const result = await choose.find({ where: { id: Equal(In([...JSON.parse(req.body.ids)])) }, withDeleted: true })
        if (!result || result.length == 0) {
            return res.status(200).json({ status: 200, message: "nothing to restore" });
        }
        result.forEach(async data => {
            data.deletedAt = null;
            await choose.save(data);
        });
        res.status(200).json({ status: 200, message: "restore successfully" })

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}
//delete permanently
export const delPerWhyToChoose = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['choose'] */


    try {
        const result = await choose.find({ where: { id: Equal(In([...JSON.parse(req.body.ids)])) }, withDeleted: true });
        if (!result || result.length == 0) {
            return res.status(200).json({ status: 200, message: "nothing to delete" })
        }

        result.forEach(async data => {
            await choose.remove(data);
        })
        res.status(200).json({ status: 200, message: "remove successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}
