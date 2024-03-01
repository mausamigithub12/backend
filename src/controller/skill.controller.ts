import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';

import { Equal, In } from 'typeorm';

const Instructor = AppDataSource.getRepository('instructor')
const Skills = AppDataSource.getRepository('Skill')


export const getAllss = async (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Skill'] */

    try {
        const skills = await Skills.find({
            relations: {
                instructor: true
            }
        });
        if (!skills || skills.length == 0) {
            return res.status(404).json({ status: 404, message: "no data found" })
        }
        res.status(200).json({
            status: 200,
            result: skills
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

export const postSkills = async (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Skill'] */

    try {
        let skillsold = await Skills.findOneBy({
            name: Equal(req.body.name.toLowerCase()),
            deletedAt: null
        })
        if (skillsold) {
            return res.status(403).json({ status: 403, message: 'Record already exists' })
        }

        let instructordata = await Instructor.find({
            where: {
                id: In([req.body.instructor])
            }
        })

        req.body.instructor = instructordata

        req.body.name = req.body.name.toLowerCase()
        const newSkill = await Skills.save(req.body);

        return res.status(200).json({ status: 200, data: newSkill })

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

export const updateSkill = async (req: Request, res: Response) => {
    /* 	#swagger.tags = ['Skill'] */

    try {
        const skill = await Skills.findOneBy({ id: req.params.id })
        if (!skill) {
            return res.status(400).json({
                status: 400,
                message: "Invalid Skill Id"
            })
        }
        Object.assign(skill, req.body)
        const result = await Skills.save(skill)
        return res.status(200).json({
            status: 200,
            message: "sucess",
            result
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

export const deleteSkill = async (req: Request, res: Response) => {
    try {

        const skill = await Skills.find({ where: { id: In([...JSON.parse(req.body.ids)]) }, relations: { instructor: true } });
        if (!skill || skill.length == 0) return res.status(400).json({ message: 'Invalid skill id' })
        for (let item of skill) {
            if (item.instructor.length > 0) {
                throw new Error('Skills is linked with existing teacher');
            }
            await Skills.softRemove(item);
        }
        return res.status(200).json({ status: 200, message: 'success' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}