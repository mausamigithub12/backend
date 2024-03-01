import { Equal, In, IsNull, Not } from 'typeorm';
import { NextFunction, Response, Request } from "express";
import { AppDataSource } from "../data-source";
import { student } from "../entity/student";
import { course } from "../entity/course";
import { sendEmail } from '../utils/onlineFormSuccessEmail';
const Course = AppDataSource.getRepository(course);
const Student = AppDataSource.getRepository(student);

interface RequeestCustome extends Request {
    files: any;
    file: any;
}

//get all student data
export const getstudnet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Student.find({}).then(result => {
            res.status(200).json({ status: 200, message: 'success', data: result });

        }).catch(err => {
            res.status(400).json({ status: 400, message: err.message });

        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });

    }
};


//add new student in particular course
export const addnewstudent = async (req: RequeestCustome, res: Response, next: NextFunction) => {
    try {
        if (req.body.course) {
            let result = await Course.findOne({ where: { id: req.body.course } })
            if (!result) {
                return res.status(400).json({ status: 400, message: "cannot find course" });
            }
            req.body.course = [result];
        }

        if (req.files) {
            if (req.files.avatar && req.files.avatar.length > 0) {
                req.body.avatar = req.files.avatar[0].filename;
            }
            if (req.files.payment && req.files.payment.length > 0) {
                req.body.payment = req.files.payment[0].filename;
            }
        }
        await Student.save(req.body).then((result) => {
            // sendEmail(req.body.email);
            res.status(200).json({ status: 200, message: "save successfully" });
        }).catch((err) => {
            res.status(400).json({ status: 400, message: err.message + "cannot save student" });
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
};

//update data of exist student
export const updatestudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let stuToUpdate = await Student.findOne({ where: { id: req.params.id } });
        if (!stuToUpdate) {
            return res.status(400).json({ status: 400, message: "student not found to update" });
        }
        Object.assign(stuToUpdate, req.body);
        await Student.save(stuToUpdate).then((result) => {
            res.status(200).json({ status: 200, message: "student updated successfully" });
        }).catch((err) => {
            res.status(400).json({ status: 400, message: "student cannot save" });
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
};

//soft remove one student
export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.ids.length == 0) {
            return res.status(204).json({ status: 204, message: "empty array" })
        }
        for (let id of req.body.ids) {
            let result = await Student.findOne({ where: { id: Equal(id) } });
            if (!result) {
                return res.status(400).json({ status: 400, message: `no data found in database for id = ${id}` });
            }
            await Student.softRemove(result);
        }
        res.status(200).json({ status: 200, message: "deleted" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
};
//restore deleted data from soft remove
export const restoreData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.ids.length == 0) {
            return res.status(204).json({ status: 204, message: "empty data" })
        }
        for (let id of req.body.ids) {
            let result = await Student.findOne({ where: { id: In(req.body.ids) } });
            if (!result) {
                return res.status(204).json({ status: 204, message: "no data found" })
            }
            result.deleteDate = null;
            await Student.save(result);
        }
        res.status(200).json({ status: 200, message: "restore" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//delete permanent from soft remove
export const deleteper = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.ids.length == 0) {
            return res.status(204).json({ status: 204, message: "empty array" })
        }
        const result = await Student.findOne({ where: { id: In(req.body.ids) }, withDeleted: true });
        if (!result) {
            return res.status(404).json({ status: 404, message: "data not found" })
        }
        await Student.remove(result);
        res.status(200).json({ status: 200, message: "restored data" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

//get all soft remove student data
export const deletedStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let result = await Student.find({
            withDeleted: true,
            where: {
                deleteDate: Not(IsNull())
            }
        })
        if (result.length == 0) {
            return res.status(400).json({ status: 400, message: "no data found" })
        }
        res.status(200).json(result)

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
};
