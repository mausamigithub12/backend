import { Equal } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { message } from '../entity/message';
import { AppDataSource } from '../data-source';
import expressError from '../utils/expressError';
const messages = AppDataSource.getRepository(message);
//post message in database
export const postMessage = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Message'] */

    try {

        await messages.save(req.body).then(result => {
            res.status(200).json({ status: 200, message: "sent successfully" });
        }).catch(err => {
            res.status(400).json({ status: 400, message: "cannot save" });
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//get all the messages
export const getmsg = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Message'] */

    try {

        let result = await messages.find({})
        if (!result) {
            return res.status(400).json({ status: 400, message: "data not found" });
        }
        res.status(200).json(result);
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//delete message permanent
export const delmsg = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Message'] */

    try {
        let messagesToDel = await messages.findOne({ where: { id: Equal(req.params.id) } })
        if (!messagesToDel) {
            res.status(400).json({ status: 400, message: 'message not found' })
        }
        await messages.softRemove(messagesToDel);
        res.status(200).json({ status: 200, message: "delete success" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}