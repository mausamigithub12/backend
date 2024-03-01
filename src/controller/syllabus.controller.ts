import { Equal, In, IsNull, Not } from 'typeorm';

import { Request, Response, NextFunction } from 'express';
import { course } from '../entity/course';
import { AppDataSource } from '../data-source';
import { Syllabus } from '../entity/syllabus';
const syllabus = AppDataSource.getRepository(Syllabus);
const Course = AppDataSource.getRepository(course);


//add new syllabus in particular courses
export const addnewsyllabus = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Syllabus'] */

    try {

        if (req.body.courseId) {
            const result = await Course.findOneBy({ id: Equal(req.body.courseId) });
            if (!result) {
                return res.status(400).json({ status: 400, message: "Cannot find course" });
            }
            req.body.course = result;
        }
        await syllabus.save(req.body).then(result => {
            res.status(200).json({ status: 200, message: "data save sucessfully" });
        }).catch(err => {
            res.status(400).json({ status: 400, message: "cannot save" })
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//soft delete syllabus
export const deletesyllabus = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Syllabus'] */

    try {
        const result = await syllabus.find({ where: { id: Equal(In(req.body.ids)) } })
        if (result.length == 0 || !result) {
            return res.status(204).json({ status: 204, message: "empty array" })
        }
        for (let data of result) {
            await syllabus.softRemove(data);
        }
        res.status(200).json({ status: 200, message: "data deleted" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }

}
//restore deleted data
export const restoreData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Syllabus'] */

    try {
        const result = await syllabus.find({ where: { id: Equal(In([...JSON.parse(req.body.syllabusIds)])) } })

        if (result.length == 0 || !result) {
            return res.status(204).json({ status: 204, message: "empty array" })
        }
        for (let data of result) {
            data.deleteDate = null;
            await syllabus.save(result);
        }
        res.status(200).json({ status: 200, message: "restored data" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//get all the deleted syllabus only
export const deletedsyllabus = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Syllabus'] */

    try {
        let result = await syllabus.find({
            withDeleted: true,
            where: {
                deleteDate: Not(IsNull())
            }
        })
        if (!result) {
            return res.status(400).json({ status: 400, message: "data not found" })
        }
        res.status(200).json(result);

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//delete permament
export const delper = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Syllabus'] */

    try {
        const result = await syllabus.find({ where: { id: Equal(In([...JSON.parse(req.body.syllabusIds)])) }, withDeleted: true })
        if (result.length == 0 || !result) {
            return res.status(204).json({ status: 203, message: "empty array" })
        }
        for (let data of result) {
            await syllabus.remove(data);
        }
        res.status(200).json({ status: 200, message: "deleted permanently" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

//update particular syllabus
export const updatesyllabus = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Syllabus'] */

    try {
        let Syllabus = await syllabus.findOne({ where: { id: req.params.id } })
        if (!Syllabus) {
            return res.status(400).json({ status: 400, message: "data not found" });
        }
        Object.assign(Syllabus, req.body);
        await syllabus.save(Syllabus).then(result => {
            res.status(200).json({ status: 200, message: "data updated sucessfully" });
        }).catch(err => {
            res.status(400).json({ status: 400, message: "cannot save data" });
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}