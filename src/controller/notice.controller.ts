import { NextFunction, Request, Response } from "express";
import { Notice } from '../entity/notice';
import { AppDataSource } from "../data-source";
import { Equal, In, IsNull, Not } from "typeorm";

const notice = AppDataSource.getRepository(Notice);

interface customeRequest extends Request {
    file: any,
    files: any
}

//get all the notices
export const getAllnotice = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Notices'] */

    try {
        const result = await notice.find();
        res.status(200).json({ status: 200, result })

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

//post notice in database
export const postNotice = async (req: customeRequest, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Notices'] */

    try {
        if (req.file) {
            req.body.image = req.file.filename;
        }
        await notice.save(req.body).then(result => {
            res.status(200).json({ status: 200, message: "save successfully" })
        }).catch(err => {
            res.status(404).json({ status: 404, message: "cannot save data" });
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

//update notice
export const updateNotice = async (req: customeRequest, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Notices'] */
    try {
        const Notices = await notice.findOne({ where: { id: req.params.id } });
        if (!Notices) {
            return res.status(404).json({ status: 404, message: 'no data found' });
        }
        if (req.file) {
            req.body.image = req.file.filename
        }
        Object.assign(Notices, req.body);
        notice.save(Notices).then(result => {
            res.status(200).json({ status: 200, message: "updated successfully" });
        }).catch(err => {
            console.log(err);
            res.status(400).json({ status: 400, message: "cannot save data" });
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

//delete notice
export const deleteNoties = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Notices'] */

    try {
        console.log(req.body);
        // if(!req.body.noticeIds||req.body.noticeIds.length === 0){
        //     return res.status(204).json({status:204,message:"empty array"})
        // }
        const result = await notice.find({ where: { id: In([...JSON.parse(req.body.ids)]) } });
        if (!result || result.length === 0) {
            return res.status(204).json({ status: 204, message: "not such data found" });
        }
        result.forEach(async data => {
            await notice.softRemove(data);

        })
        res.status(200).json({ status: 200, message: 'delete data successfully' });

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

//get all soft deleted data
export const getDeletedData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Notices'] */

    try {
        const result = await notice.find({
            withDeleted: true,
            where: {
                deletedAt: Not(IsNull())
            }
        });
        if (result.length == 0) {
            return res.status(400).json({ status: 400, message: "no such data found" });
        }
        res.json({ status: 200, result })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

//restore deleted data
export const restoreData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Notices'] */

    try {
        const result = await notice.find({ where: { id: In([...JSON.parse(req.body.noticesIds)]) } })
        if (result.length == 0 || !result) {
            return res.status(204).json({ status: 204, message: "no such data found" });
        }
        result.forEach(async data => {
            data.deletedAt = null;
            await notice.save(data);
        });
        res.status(200).json({ status: 200, message: "restore successfully" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

//delete permanently
export const delPermanent = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Notices'] */

    try {
        const result = await notice.find({ where: { id: In([...JSON.parse(req.body.noticeIds)]) } });
        if (result.length == 0 || !result) {
            return res.json({ message: "no data found" })
        }
        result.forEach(async data => {
            await notice.remove(data);
        })
        res.status(200).json({ status: 200, message: "remove successfully" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
export const getNoticeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await notice.findOneBy({
            id: Equal(req.params.id)
        })
        if (!result) {
            return res.status(404).json({ message: "No record found" });
        }

        res.json({ status: 200, result })


    }
    catch (err) {
        res.status(500).json({ status: 500, message: err.message || "something went wrong" })
    }
}