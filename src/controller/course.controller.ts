
import { NextFunction, Response, Request } from 'express';
import { category } from '../entity/category';
import { course } from '../entity/course';
import { AppDataSource } from '../data-source';
import { Equal, In, IsNull, Not } from 'typeorm';
import { instructor } from '../entity/instructor';
import { Syllabus } from '../entity/syllabus';
const Instructor = AppDataSource.getRepository(instructor);
const Course = AppDataSource.getRepository(course);
const Category = AppDataSource.getRepository(category);
const syllabus = AppDataSource.getRepository(Syllabus);
//get all course
export const getCourses = async (req: Request, res: Response, next: NextFunction) => {
    /*#swagger.tags = ['Courses'] */
    try {
        await Course.find({
           order:{
            createdAt:'ASC'
           }
        }).then(result => {
            res.status(200).json({ status: 200, data:[...result] })
        }).catch(err => {
            res.status(400).json({ status: 400, message: err.message });

        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}

//get all the courses of a given category
export const getrealtedcourse = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Courses'] */

    try {
        let result = await Category.findOne({ where: { id: Equal(req.params.id) }, relations: { course: true } });
        if (!result) {
            return res.status(400).json({ status: 400, message: "cannot find course in database" });
        }
        res.json(result.course);
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }

}

//get details of particular courses 
export const getcoursedetails = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Courses'] */

    try {
        let result = await Course.findOne({
            where: { id: Equal(req.params.id) }, 
            relations: { student:true }, 
            order: {
                createdAt: 'ASC',

            }
        })
        if (!result) {
            return res.status(400).json({ status: 400, message: "cannot find courses" });
        }

        res.status(200).json({
            result
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }

}

//get a list of student of particular course
export const courseStudent = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Courses'] */

    try {
        let result = await Course.findOne({ where: { id: Equal(req.params.id), student: true } })
        if (!result) {
            return res.status(400).json({ status: 400, message: "studnet data could not found" });
        }
        res.json(result.student);
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }

}


//get a list of instructor of particular course
export const getcourseinstructor = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Courses'] */

    try {
        let result = await Course.find({ where: { id: Equal(req.params.id) }, relations: {} })
        if (!result) {
            return res.status(400).json({ status: 400, message: 'cannot find instructor' });
        }
        res.json(result);
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }

}

//add new course
export const addnewcourse = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Courses'] */

    try {
        let result: any;
    console.log('hrer',req.body,req.file)

        // if (req.body.categoryId) {
        //     result = await Category.findOne({ where: { id: Equal(req.body.categoryId) } });
        // }

        // let instructor: any;
        // if (req.body.instructorIds) {
        //     instructor = await Instructor.find({ where: { id: In([...JSON.parse(req.body.instructorIds)]) } })
        // }

        // req.body.category = result;
        // if (instructor) {
        //     req.body.instructor = instructor;
        // } else {
            // }


        req.body.review = [];
        req.body.student = [];
        req.body.syllabus = [];
        req.body.admission = [];
        if (req.file) {
            req.body.image = req.file.filename;
        }
        console.log(req.body)
        await Course.save(req.body).then(result => {
            res.status(200).json({ status: 200, message: "save successfully", data: result });
        }).catch(err => {
            res.status(400).json({ status: 400, message: err.message });
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}

//update a course 
export const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Courses'] */

    try {
        // const courseentity = new course();
        // console.log(req.body);
        let courseToUpdate = await Course.findOne({ where: { id: Equal(req.params.id) },
    }
        );
        if (!courseToUpdate) {
            return res.status(400).json({ status: 400, message: 'course not found to update' });
        }

     
        if (req.file) {
            req.body.image = req.file.filename;
        }
        Object.assign(courseToUpdate,req.body);
        console.log(courseToUpdate)
        await Course.save(courseToUpdate).then(result => {
            res.status(200).json(result);
        }).catch(err => {
            res.status(400).json({ status: 400, message: err.message });
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

//get all the review of particular couerses
export const getRevOfCourse = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Courses'] */

    try {
        let result = await Course.findOne({ where: { id: Equal(req.params.id) }, relations: { review: true } })
        if (!result) {
            return res.status(400).json({ statusL: 400, message: "cannot found reviews" });

        }
        res.json(result.review);
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }

}

//get all syllabus list of a course
export const getsyllabus = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Courses'] */

    try {

        const { id } = req.params;
        if (!id) return res.status(400).json({ status: 400, message: 'Course id required as param' })

        let result = await syllabus.find({
            where: { course: Equal(id) }, order: {
                createdAt: "ASC"
            }
        })
        if (!result) {
            return res.status(400).json({ status: 400, message: "cannot find data" });
        }
        res.status(200).json({ result });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

// soft delete of course
export const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Courses'] */
    try {
        const result = await Course.find({ where: { id: In([...JSON.parse(req.body.ids)]) } });
        if (!result || result.length == 0) {
            return res.status(204).json({ status: 204, message: "empty ids" })
        }
        for (let data of result) {
            await Course.softRemove(data)
        }
        res.status(200).json({ status: 200, message: 'course deleted' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }


}
//restore deleted data
export const restoreData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Courses'] */

    try {
        if (!req.body.courseIds || req.body.courseIds.length === 0) {
            return res.status(204).json({ status: 204, message: "empty array" })
        }
        for (let id of req.body.courseIds) {
            const result = await Course.findOne({ where: { id: Equal(id), deleteDate: Not(IsNull()) }, withDeleted: true });
            if (!result) {
                return res.status(404).json({ status: 404, message: "no data found" });
            }
            result.deleteDate = null;
            await Course.save(result);
        }
        res.status(200).json({ status: 404, message: "restore data stucessfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }

}

//get all deleted data
export const deletedData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Courses'] */

    try {
        const result = await Course.find({
            withDeleted: true,
            where: {
                deleteDate: Not(IsNull())
            }
        });
        if (result.length == 0) {
            return res.status(404).json({ status: 404, message: "no data found" });
        }
        res.json(result);
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }

}
//delete permanently
export const delPer = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Courses'] */

    try {
        const result = await Course.find({where:{id:req.params.id}});
        if (!result ) {
            return res.status(404).json({ status: 404, message: "no data found" })
        }
        result.map(async data => await Course.remove(data));
        // for (let id of req.body.cousreIds) {
        //     const result = await Course.findOne({ where: { id: Equal(id) }, withDeleted: true });
        //     if (!result) {
        //         return res.status(403).json({ status: 403, message: `no data found For id= ${id}` });
        //     }
        //     await Course.remove(result);
        // }
        res.json({ message: "deleted permament" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }

}