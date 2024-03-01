import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { workflow } from "../entity/aboutus";
import { Equal, In, IsNull, Not } from "typeorm";
const card = AppDataSource.getRepository(workflow);
//About section Cards
//get
export const getCardInfo = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['card'] */

    try {
        const result = await card.find({});
        if (!result || result.length == 0) {
            return res.status(404).json({ status: 404, message: "no data found" })
        }
        res.status(200).json({ status: 200, result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went rong" })
    }
}
//patch
export const editCard = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['card'] */

    try {
        const result = await card.findOneBy({ id: Equal(req.params.id) })
        console.log(result)
        if (!result) {
            return res.status(404).json({ status: 404, message: "cannot get data" })
        }
        if (req.file) {
            req.body.image = req.file.filename
        }
        Object.assign(result, req.body);
        await card.save(result).then(() => {
            return res.status(200).json({ status: 200, message: "save sucessfully" })
        }).catch(err => {
            return res.status(500).json({ status: 500, message: err.message || "something went wrong" })
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//post
export const postCardInfo = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['card'] */

    try {
        if (req.file) {
            req.body.image = req.file.filename;
        }

        await card.save(req.body).then(() => {
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
//delete
export const deleteCardInfo = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['card'] */

    try {
        const result = await card.find({ where: { id: Equal(In([...JSON.parse(req.body.ids)])) } })
        if (!result || result.length == 0) {
            return res.status(404).json({ status: 404, message: "empty array" })
        }
        result.map(async data => await card.softRemove(data));
        res.status(200).json({ status: 200, message: "deleted sucessfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went worng" })
    }
}
//get All Deleted Data
export const getDeletedCardData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['card'] */

    try {
        const result = await card.find({ where: { deletedAt: Not(IsNull()) }, withDeleted: true })
        if (!result || result.length == 0) {
            return res.status(404).json({ status: 404, message: "can't get data" })
        }
        res.status(200).json({ status: 200, result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" })
    }
}
//get by id
export const getCardById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['card'] */

    try {
        const result = await card.findOneBy({ id: Equal(req.params.id) })
        if (!result) {
            return res.status(404).json({ status: 404, message: "can't get data" })
        }
        res.status(200).json({ status: 200, result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" })
    }
}
//restore
export const restoreCardData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['card'] */

    try {
        const result = await card.find({ where: { id: Equal(In([...JSON.parse(req.body.ids)])) }, withDeleted: true })
        if (!result || result.length == 0) {
            return res.status(200).json({ status: 200, message: "nothing to restore" });
        }
        result.forEach(async data => {
            data.deletedAt = null;
            await card.save(data);
        });
        res.status(200).json({ status: 200, message: "restore successfully" })

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}
//delete permanentyl
export const delPercard = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['card'] */

    try {
        const result = await card.find({ where: { id: Equal(In([...JSON.parse(req.body.ids)])) }, withDeleted: true });
        if (!result || result.length == 0) {
            return res.status(200).json({ status: 200, message: "nothing to delete" })
        }

        result.forEach(async data => {
            await card.remove(data);
        })
        res.status(200).json({ status: 200, message: "remove successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}