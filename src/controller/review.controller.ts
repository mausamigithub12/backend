import { Equal, IsNull, Not } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { review } from "../entity/review";
import { course } from '../entity/course';
import { AppDataSource } from '../data-source';
const Course = AppDataSource.getRepository(course);
const Review = AppDataSource.getRepository(review);


//add new review in course
export const newreview = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Review'] */

    try {

        let result = await Course.findOne({ where: { id: Equal(req.body.courseId) } })
        if (!result) {
            return res.status(400).json({ status: 400, messaage: 'cannot find course' });
        }
        req.body.course = result;
        await Review.save(req.body).then(result => {
            res.status(200).json({ status: 200, message: "save successfully" });
        }).catch(err => {
            res.status(400).json({ status: 400, message: 'cannot save review' });
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

//get all the review with courses
export const getAllReview = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Review'] */

    try {

        const result = await Review.find({ relations: { course: true } });
        if (!result || result.length == 0) {
            return res.status(204).json({ status: 204, message: "no data found" })
        }
        res.json(result);
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//soft remove review 
export const softRemove = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Review'] */

    try {

        const result = await Review.find({ where: { id: req.params.id } });
        if (!result || result.length == 0) {
            return res.status(204).json({ status: 204, message: "no data found" })
        }
        await Review.softRemove(result);
        res.status(200).json({ status: 200, message: "review remove" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//get all soft remove data
export const getDelData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Review'] */

    try {

        const result = await Review.find({
            withDeleted: true,
            where: {
                deleteDate: Not(IsNull())
            }
        });
        if (!result || result.length == 0) {
            return res.status(204).json({ status: 204, message: "no data found" })
        }
        res.status(200).json(result);
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//deleted permanent
export const delPer = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Review'] */

    try {
        const result = await Review.findOne({ where: { id: req.params.id }, withDeleted: true })
        if (!result) {
            return res.status(204).json({ status: 204, message: "no data found" })
        }
        await Review.remove(result);
        res.json({ message: "data deleted" });

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}