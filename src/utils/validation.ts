import { Request, Response, NextFunction } from 'express';
import { aboutSchema, achievementsSchema, admissionSchema, arrayFileValidate, workflowSchema, categorySchema, chooseSchema, courseSchema, enquirySchema, filevalidate, hackathonSchema, homeSchema, instructorSchema, msgSchema, noticeschema, provideSchema, reviewSchema, skillSchema, studentSchema, syllabusSchema, workSchema } from '../schemavalidation';
import Joi = require('joi');
//validation of online admission
export const addmissionValidation = (req: Request, res: Response, next: NextFunction) => {
    let { error } = admissionSchema.validate(req.body, { stripUnknown: true });
    if (error) {
        return res.status(422).json({ status: 422, message: error.message })
    } else {
        next();
    }
}
//validation for category
export const categoryValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = categorySchema.validate(req.body, { stripUnknown: true });
    if (error) {
        return res.status(422).json({ status: 422, message: error.message })
    } else {
        next();
    }
}

// validation for skill
export const skillValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = skillSchema.validate(req.body, { stripUnknown: true });
    if (error) {
        return res.status(422).json({ status: 422, message: error.message })
    } else {
        next();
    }
}

//validation for course
export const courseValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = courseSchema.validate(req.body, { stripUnknown: true });
    if (error) {
        return res.status(422).json({ status: 422, message: error.message })
    } else {
        next();
    }
}
//validation for enquiry
export const enquiryValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = enquirySchema.validate(req.body, { stripUnknown: true });
    if (error) {
        return res.status(422).json({ status: 422, message: error.message })
    } else {
        next();
    }
}
//validation for instructor
export const instructorValidation = (req: Request, res: Response, next: NextFunction) => {

    const { error } = instructorSchema.validate(req.body, { stripUnknown: true });
    if (error) {
        return res.status(422).json({ status: 422, message: error.message })
    } else {
        next();
    }

}
//validation for messages
export const messageValidation = (req: Request, res: Response, next: NextFunction) => {
    let { error } = msgSchema.validate(req.body, { stripUnknown: true });
    if (error) {
        return res.status(422).json({ status: 422, message: error.message })
    }
    next();
}
//validation for review
export const reviewValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = reviewSchema.validate(req.body, { stripUnknown: true })
    if (error) {
        return res.status(422).json({ status: 422, message: error.message })
    } else {
        next();
    }
}
//validation for student
export const studentValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = studentSchema.validate(req.body, { stripUnknown: true })
    if (error) {
        return res.status(422).json({ status: 422, message: error.message })
    } else {
        next();
    }
}
//validation for syllabus
export const syllabusVaidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = syllabusSchema.validate({
        title: req.body.title,
        description: req.body.description,
        courseId: req.body.courseId
    }, { stripUnknown: true });
    if (error) {
        return res.status(422).json({ status: 422, message: error.message })
    } else {
        next()
    }
}

//validation for single file
export const filevalidation = (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
        const { error } = filevalidate.validate(req.file)
        if (error) {
            return res.status(422).json({ status: 422, message: error.message })
        } else {

            return next();
        }
    } else {
        next();
    }
}

export const multipleFileValidate = (req: Request, res: Response, next: NextFunction) => {
    if (req.files) {

        const { error } = arrayFileValidate.validate(req.files)
        if (error) {
            return res.status(422).json({ status: 422, message: error.message })
        } else {
            return next()
        }
    } else {
        next()
    }
}


//validation for notice
export const noticevalidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = noticeschema.validate(req.body, { stripUnknown: true });
    if (error) {
        return res.status(422).json({ status: 422, message: error.message })
    }
    next();
}

//validation for hackathon
export const hackathonValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = hackathonSchema.validate(req.body, { stripUnknown: true });
    if (error) {
        return res.status(422).json({ status: 422, message: error.message || "errors in validation" })
    } else {
        next();
    }
}

export const achievementsvalidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = achievementsSchema.validate(req.body, { stripUnknown: true });
    if (error) {
        return res.status(422).json({ status: 422, message: error.message || "error in vaidation of achivement" })
    }
    next();
}
export const aboutValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = aboutSchema.validate(req.body, { stripUnknown: true })
    if (error) {
        return res.status(422).json({ status: 422, message: error.message || "error in validation" })
    }
    next();
}

export const provideValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = provideSchema.validate(req.body, { stripUnknown: true })
    if (error) {
        return res.status(422).json({ status: 422, message: error.message || "error in validation" })
    }
    next();
}
export const workValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = workSchema.validate(req.body, { stripUnknown: true })
    if (error) {
        return res.status(422).json({ status: 422, message: error.message || "error in validation" })
    }
    next();
}
export const workflowValidation = (req: Request, res: Response, next: NextFunction) => {

    const { error } = workflowSchema.validate(req.body, { stripUnknown: true })
    if (error) {
        return res.status(422).json({ status: 422, message: error.message || "error in validation" })
    }
    next();
}
export const homeValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = homeSchema.validate(req.body, { stripUnknown: true })
    if (error) {
        return res.status(422).json({ status: 422, message: error.message || "error in validation" })
    }
    next();
}

export const chooseValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = chooseSchema.validate(req.body, { stripUnknown: true })
    if (error) {
        return res.status(422).json({ status: 422, message: error.message || "error in validation" })
    }
    next();
}
