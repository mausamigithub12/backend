import { Equal, In, IsNull, Not } from 'typeorm';
import { course } from '../entity/course';
import { Request, Response, NextFunction } from 'express';
import { instructor } from '../entity/instructor';
import { AppDataSource } from '../data-source';
import { Skill } from '../entity/skill';
const Instructor = AppDataSource.getRepository(instructor);
const Course = AppDataSource.getRepository(course);
const SkillRepo = AppDataSource.getRepository(Skill)
interface RequeestCustome extends Request {
    files: any;
    file: any;
}
//get all course of particular instructor
export const getallinstructor = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Instructor'] */

    try {
        await Instructor.find({
            relations: {
                skills: true,
            }, order: { createdAt: 'ASC' }
        }).then(result => {
            res.status(200).json({ status: 200, message: 'success', result });

        }).catch(err => {
            res.status(400).json({ status: 400, message: err.message || "no data found" });

        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//add new instructor in particular course
export const addnewinstructor = async (req: RequeestCustome, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Instructor'] */

    console.log(req.body)
    try {
        let codid = JSON.parse(req.body.courseIds);
        console.log(codid, "here")
        let result = await Course.find({
            where:
            {
                id: In([...codid])
            }
        })

        req.body.courses = result;
        if (req.files) {
            if (req.files.avatar && req.files.avatar.length > 0) {
                req.body.avatar = req.files.avatar[0].filename;
            }
            if (req.files.citizenshipFront && req.files.citizenshipFront.length > 0) {
                req.body.citizenshipFront = req.files.citizenshipFront[0].filename;
            }
            if (req.files.citizenshipBack && req.files.citizenshipBack.length > 0) {
                req.body.citizenshipBack = req.files.citizenshipBack[0].filename;
            }
            if (req.files.cv && req.files.cv.length > 0) {
                req.body.cv = req.files.cv[0].filename;
            }
            if (req.files.pancard && req.files.pancard.length > 0) {
                req.body.pancard = req.files.pancard[0].filename;
            }
        }
        if (req.body.skillIds) {
            req.body.skills = await SkillRepo.find({ where: { id: In([...JSON.parse(req.body.skillIds)]) } })
        } else {
            req.body.skills = []
        }

        await Instructor.save(req.body).then(result => {
            res.status(200).json({ status: 200, message: "save successfully", result });
        }).catch(err => {
            console.log(err)
            res.status(400).json({ status: 400, message: err.message || "cannot save data" });
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}

//update info of instructor
export const updateInstructor = async (req: RequeestCustome, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Instructor'] */


    try {
        if (!req?.params?.id) return res.status(400).json({ status: 400, message: 'instructor id required' })
        let updateinstructors = await Instructor.findOneBy({ id: Equal(req.params.id) });
        if (!updateinstructors) return res.status(400).json({ status: 400, message: 'cannot find instructor to update' });

        if (req.files) {
            if (req.files.avatar && req.files.avatar.length > 0) {
                req.body.avatar = req.files.avatar[0].filename;
            }
            if (req.files.citizenshipFront && req.files.citizenshipFront.length > 0) {
                req.body.citizenshipFront = req.files.citizenshipFront[0].filename;
            }
            if (req.files.citizenshipBack && req.files.citizenshipBack.length > 0) {
                req.body.citizenshipBack = req.files.citizenshipBack[0].filename;
            }
            if (req.files.cv && req.files.cv.length > 0) {
                req.body.cv = req.files.cv[0].filename;
            }
            if (req.files.pancard && req.files.pancard.length > 0) {
                req.body.pancard = req.files.pancard[0].filename;
            }
        }

        let skills = await SkillRepo.find({
            where: {
                id: In([...JSON.parse(req.body.skillIds)])
            }
        })
        let codid = JSON.parse(req.body.courseIds);

        let result = await Course.find({
            where:
            {
                id: In([...codid])
            }
        })

        req.body.courses = result;
        req.body.skills = skills
        delete req.body.createdAt;
        delete req.body.updatedAt;
        delete req.body.deletedAt;
        delete req.body.deleteDate;


        Object.assign(updateinstructors, req.body);

        await Instructor.save(updateinstructors).then(result => {
            res.status(200).json({ status: 200, message: "instructor save successfully" });
        }).catch(err => {
            console.log(err)
            res.status(400).json({ status: 400, message: "cannot save instructor data in database" });
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

//soft delete a instructor
export const deleteInst = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Instructor'] */

    try {

        // if (req.body.ids.length == 0) {
        //     return res.status(203).json({ staus: 203, message: "empty array" })
        // }
        const result = await Instructor.find({where:{id:In([...JSON.parse(req.body.ids)])}});
        if(!result || result.length == 0){
            return res.status(404).json({message:"no data found"})
        }
        result.map(async data=>await Instructor.softRemove(data));
        // for (let id of req.body.ids) {
        //     let result = await Instructor.findOne({ where: { id: Equal(id) } });
        //     if (!result) {
        //         return res.status(404).json({ status: 404, message: "no data found" })
        //     }
        //     await Instructor.softRemove(result)
        // }
        res.status(200).json({ status: 200, message: "data deleted" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

//get all deleted data
export const deletedInst = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Instructor'] */

    try {
        let result = await Instructor.find({
            withDeleted: true,
            where: {
                deleteDate: Not(IsNull())
            }
        })
        if (!result) {
            return res.status(404).json({ status: 404, message: "no data found" })
        }
        res.status(200).json(result);
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

//delete instructor permanent
export const delpermanent = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Instructor'] */

    try {
        if (req.body.ids.length == 0) {
            return res.json({ message: "empty array" })
        }
        for (let id of req.body.ids) {
            let result = await Instructor.find({ where: { id: Equal(id) }, withDeleted: true })
            if (!result) {
                return res.status(404).json({ status: 404, message: `no record found for id= ${id}` });
            }
            await Instructor.remove(result);
        }
        res.status(200).json({ status: 200, message: "deleted permanently" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//restore deleted data
export const restoreData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Instructor'] */

    try {

        if (req.body.instructorIds.length) {
            return res.status(204).json({ status: 204, message: "empty array" })
        }
        for (let id of req.body.instructorIds) {
            const result = await Instructor.findOne({ where: { id: Equal(id) }, withDeleted: true });
            if (!result) {
                return res.status(403).json({ status: 403, message: `no data found for id= ${id}` });
            }
            result.deleteDate = null;
            await Instructor.save(result);
        }
        res.status(200).json({ status: 200, message: "restored data " });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

export const getInstructorById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Instructor'] */

    try {
        if (!req.params?.id) return res.status(400).json({ message: 'instructor is required' })
        console.log(req.params?.id)
        const result = await Instructor.findOne({ where: { id: Equal(req.params.id) }, relations: { courses: true, skills: true } })
        if (!result) return res.status(400).json({ status: 400, message: 'No instructor found with this id' })
        return res.status(200).json({ result })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

