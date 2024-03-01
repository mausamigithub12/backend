import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Provide } from "../entity/aboutus";
const provide = AppDataSource.getRepository(Provide);
import { Equal, In, IsNull, Not } from "typeorm";

//what we provide
//get
export const getWhatWeProvideInfo = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['provide'] */

    try {
        const result = await provide.find({});
        res.status(200).json({ status: 200, result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went rong" })
    }
}
//get by id
export const getWhatWeProvideById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['provide'] */

    try {
        const result = await provide.findOne({ where: { id: Equal(req.params.id) } });
        if (!result) {
            return res.status(204).json({ status: 204, message: "no data found" })
        }
        res.status(200).json({ status: 200, result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went rong" })
    }
}
//post
export const postWhatWeProvideInfo = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['provide'] */

    try {
        if(req.file){
            req.body.image = req.file.filename;
        }
        await provide.save(req.body).then(() => {
            return res.status(200).json({ status: 200, message: "save sucessfully" })
        }).catch(err => {
            console.log(err)
            return res.status(500).json({ status: 500, message: err.message || "cannot save data" })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" })
    }
}
//patch
export const editWhatWeProvideInfo = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['provide'] */

    try {
        const result = await provide.findOne({ where: { id: Equal(req.params.id) } })
        if (!result) {
            return res.status(404).json({ status: 404, message: "cannot get data" })
        }
        if(req.file){
            req.body.image = req.file.filename;
        }
        Object.assign(result, req.body);
        await provide.save(result).then(() => {
            return res.status(200).json({ status: 200, message: "save sucessfully" })
        }).catch(err => {
            return res.status(500).json({ status: 500, message: err.message || "something went wrong" })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//delete
export const deleteProvideInfo = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['provide'] */

    try {
        const result = await provide.find({ where: { id: Equal(In([...JSON.parse(req.body.ids)])) } })
        if (!result || result.length == 0) {
            return res.status(404).json({ status: 404, message: "empty array" })
        }
        result.map(async data => await provide.softRemove(data));
        res.status(200).json({ status: 200, message: "deleted sucessfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went worng" })
    }
}
//get All Deleted Data
export const getDeletedProvideData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['provide'] */

    try {
        const result = await provide.find({ where: { deletedAt: Not(IsNull()) }, withDeleted: true })
        if (!result || result.length == 0) {
            return res.status(404).json({ status: 404, message: "can't get data" })
        }
        res.status(200).json({ status: 200,result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" })
    }
}
//restore
export const restoreProvideData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['provide'] */


    try {
        const result = await provide.find({ where: { id: In([...JSON.parse(req.body.ids)]) }, withDeleted: true })
        if (!result || result.length == 0) {
            return res.status(200).json({ status: 200, message: "nothing to restore" });
        }
        result.forEach(async data => {
            data.deletedAt = null;
            await provide.save(data);
        });
        res.status(200).json({ status: 200, message: "restore successfully" })

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}
//delete permanentyl
export const delPerProvide = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['provide'] */


    try {
        const result = await provide.find({ where: { id: Equal(In([...JSON.parse(req.body.ids)])) }, withDeleted: true });
        if (!result || result.length == 0) {
            return res.status(200).json({ status: 200, message: "nothing to delete" })
        }

        result.forEach(async data => {
            await provide.remove(data);
        })
        res.status(200).json({ status: 200, message: "remove successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}