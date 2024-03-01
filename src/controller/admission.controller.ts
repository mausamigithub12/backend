import { Request, Response, NextFunction } from 'express';
import { queue, sendEmail } from '../utils/onlineFormSuccessEmail'
import { admission } from '../entity/admission';
import { course } from '../entity/course';
import { AppDataSource } from '../data-source';
import { Equal, In, IsNull, Not } from 'typeorm';
import * as grn from 'generate-password'

const onlineStu = AppDataSource.getRepository(admission);
const Course = AppDataSource.getRepository(course)

interface RequeestCustome extends Request {
    files: any;
    file: any;
}
//add new online admission 
export const addOnlineStudent = async (req: RequeestCustome, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Admission'] */

    try {
        if (!req.body.regNo) {
            let gen = grn.generate({
                length: 5,
                numbers: true,
                exclude: 'string',
                lowercase: false,
                uppercase: false
            })
            let datatwo = await onlineStu.findOneBy({ regNo: Equal(req.body.regNo) });
            if (datatwo) {
                return res.status(400).json({ status: 400, message: "student with this regNo already Exist" });
            }
            let date = new Date().toLocaleString('default', {
                year: '2-digit'
            })
            let datetwo = date + 1;
            req.body.regNo = date + "/" + datetwo + "-" + gen;
        }
        if (req.files) {
            if (req.files.avatar && req.files.avatar.length > 0) {
                req.body.avatar = req.files.avatar[0].filename;
            }
            if (req.files.payment && req.files.payment.length > 0) {
                req.body.payment = req.files.payment[0].filename;
            }
        }
        let courseid = req.body.courseIds;

        let result = await Course.findOne({ where: { id: Equal(courseid as string) } });
        if (!result) {
            return res.status(400).json({ status: 400, message: "no course found" });
        }
        req.body.course = result;

        await onlineStu.save(req.body).then((result) => {
            // queue.push({email:req.body.email,name:req.body.fullname});
            res.json({ message: "registration complete" });

        }).catch(err => {
            res.status(400).json({ status: 400, message: err.message });
        })
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}
//get all record of student who get admission from online
export const getOnlineStudentData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Admission'] */

    try {
        let result = await onlineStu.find({ relations: { course: true } })

        if (!result) {
            return res.status(400).json({ status: 400, message: "cannot find data" });
        }
        res.status(200).json({ result });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}
// //get one online admission student data by id
export const getAdmissionById = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Admission'] */

    try {
        let result = await onlineStu.findOne({ where: { id: Equal(req.params.id) }, relations: { course: true } });

        if (!result) {
            return res.status(404).json({ status: 404, message: "No record found" });
        }
        return res.status(200).json({result});
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}
//update student data
export const patchStudentById = async (req: RequeestCustome, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Admission'] */

    try {

        if (!req?.params?.id) return res.status(400).json({ message: 'Student id required' })

        let updateStudent = await onlineStu.findOneBy({ id: Equal(req.params.id) });
        if (!updateStudent) return res.status(400).json({ status: 400, message: 'cannot find Student to update' });

        if (req.files) {
            if (req.files.avatar && req.files.avatar.length > 0) {
                req.body.avatar = req.files.avatar[0].filename;
            }
            if (req.files.payment && req.files.payment.length > 0) {
                req.body.payment = req.files.payment[0].filename;
            }
        }




        // let courses = await Course.find({
        //     where: {
        //         id: In([...JSON.parse(req.body.courseIds)])
        //     }
        // })



        let courseid = req.body.courseIds;

        let courses = await Course.findOne({ where: { id: Equal(courseid as string) } });

        req.body.course = courses

        delete req.body.createdAt;
        delete req.body.updatedAt;
        delete req.body.deletedAt;
        delete req.body.deleteDate;

        Object.assign(updateStudent, req.body)
        await onlineStu.save(updateStudent).then(result => {
            res.status(200).json({ status: 200, message: "instructor save successfully" });
        }).catch(err => {
            console.log(err)
            res.status(400).json({ status: 400, message: "cannot save instructor data in database" });
        });

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }

}
//verify online student
export const verify = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Admission'] */

    try {
        let result = await onlineStu.findOne({ where: { id: Equal(req.params.id) } });
        if (!result) {
            return res.status(404).json({ status: 404, message: "no data found" });
        }
        result.verified = !result.verified;
        await onlineStu.save(result);
        res.status(200).json({ status: 200, message: "verified success" });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}
//get all non verified student 
export const getNonVerified = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Admission'] */

    try {
        let result = await onlineStu.findOne({ where: { verified: false } });
        if (!result) {
            return res.status(404).json({ status: 404, message: "no data found" });
        }
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}
//get all verified data
export const getVerifiedData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Admission'] */

    try {
        let result = await onlineStu.findOne({ where: { verified: true } });
        if (!result) {
            return res.status(404).json({ status: 404, message: "no data found" });
        }
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}
//delete data of online admission
export const deleteData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Admission'] */

    try {
        // if (req.body.ids.length == 0) {
        //     return res.json("empty array")
        // }
        const result = await onlineStu.find({where:{id:In([...JSON.parse(req.body.ids)])}});
        if(!result || result.length == 0){
            return res.status(404).json({message:"no data found"})
        }
        result.map(async data=>await onlineStu.softRemove(data));
        // for (let id of req.body.ids) {
        //     const result = await onlineStu.findOne({ where: { id: Equal(id), deleteDate: null } });
        //     if (!result) {
        //         return res.status(404).json({ status: 404, message: `no data found for id= ${id}` })
        //     }
        //     await onlineStu.softRemove(result);
        // }
        res.status(200).json({ status: 200, message: "data deleted" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}
//get all deleted data
export const getAllDelData = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Admission'] */

    try {
        let result = await onlineStu.find({
            withDeleted: true,
            where: {
                deleteDate: Not(IsNull())
            }
        });
        if (!result) {
            return res.status(404).json({ status: 404, message: "no data found" })
        }
        res.status(200).json({ status: 200, message: "ssuccess", result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
}
//restore arry of id data 
export const restore = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Admission'] */

    try {
        if (req.body.ids.length == 0) {
            return res.status(204).json({ status: 204, message: "empty array" })
        }
        for (let id of req.body.ids) {
            let result = await onlineStu.findOne({ where: { id: Equal(id) } });
            if (!result) {
                return res.status(404).json({ status: 404, message: `not data found for id= ${id}` })
            }
            result.deleteDate = null;
            await onlineStu.save(result);
        }
        res.status(200).json({ status: 200, message: "restore success" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }

}
//delete permanent 
export const delPer = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Admission'] */

    try {
        if (req.body.ids == 0) {
            return res.status(204).json({ status: 204, message: "empty array" })
        }
        for (let id of req.body.ids) {
            const result = await onlineStu.findOne({ where: { id: Equal(id) } })
            await onlineStu.softRemove(result);
        }
        res.status(200).json({ status: 200, message: "deleted permanently" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }

}