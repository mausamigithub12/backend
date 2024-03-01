import * as joi from 'joi';

export const categorySchema = joi.object({
    name: joi.string().required()
}).required();

export const courseSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    duration: joi.string().required(),
    startDate: joi.string().allow("", null), // future planning
    endDate: joi.string().allow('', null), // future planning
    categoryId: joi.string().allow("", null),
    instructorIds: joi.string().allow("", null),
    type:joi.string().required().allow("upcoming","running","closed")
}).required()

export const skillSchema = joi.object({
    name: joi.string().required(),
    instructor: joi.array().allow('', null)
}).required()

export const instructorSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    skill: joi.array().allow(" ", null),
    gender: joi.string().required().allow("male", "female", "other"),
    experience: joi.string().required(),
    bio: joi.string().required(),
    phone: joi.string().required().length(10),
    address: joi.string().required(),
    courseIds: joi.string().allow(" ", null)

}).required()
export const enquirySchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email(),
    phone: joi.string().required().length(10),
    type: joi.string().required(),
    message: joi.string()
}).required()



export const reviewSchema = joi.object({
    rating: joi.number().default(1).min(1).max(5),
    comment: joi.string().allow(" ", null)
}).required()

export const studentSchema = joi.object({
    fullname: joi.string().required(),
    address: joi.string().required(),
    dob: joi.string().required(),
    phNo: joi.string().required().length(10),
    gender: joi.string().required().allow("male", "female", "other"),
    guardianName: joi.string().required(),
    guardianNumber: joi.string().required().length(10),
    college: joi.string().required(),
    email: joi.string().email().required(),
    course: joi.string().allow("", null),
    joinDate: joi.string().allow("", null),
    levelOfEducation: joi.string().required().allow("slc", "+2", "bachelor", "master"),
    shiftTime: joi.string().required().allow("morning", "mid day", "day")

}).required()

export const syllabusSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    courseId: joi.string().allow("", null)
}).required()

export const admissionSchema = joi.object({
    fullname: joi.string().required(),
    address: joi.string().required(),
    dob: joi.string().required(),
    phNo: joi.string().required().length(10),
    gender: joi.string().required().allow("male", "female", "other"),
    guardianName: joi.string().required(),
    guardianNumber: joi.string().required().length(10),
    college: joi.string().required(),
    email: joi.string().email().required(),
    course: joi.string().allow("", null),
    joinDate: joi.string().allow("", null),
    levelOfEducation: joi.string().required().allow("slc", "+2", "bachelor", "master"),
    shiftTime: joi.string(),
    shift: joi.string()
}).required()

export const msgSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    message: joi.string().required()
}).required()
export const filevalidate = joi.object({
    fieldname: joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    mimetype: joi.string().required(),
    destination: joi.string().required(),
    filename: joi.string().required(),
    path: joi.string().required(),
    size: joi.number().required().max(2097152)
}).required()
export const arrayFileValidate = joi.array().items(joi.object({
    fieldname: joi.string().required(),
    originalname: joi.string().required(),
    encoding: joi.string().required(),
    mimetype: joi.string().required(),
    destination: joi.string().required(),
    filename: joi.string().required(),
    path: joi.string().required(),
    size: joi.number().required().max(2097152)
}).required()).required()

export const noticeschema = joi.object({
    date: joi.string().required(),
    title: joi.string().required(),
    type: joi.string().required(),
    description: joi.string().required()
}).required()
export const hackathonSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    dateAndTime: joi.string().required(),
    location: joi.string().required(),
    organizers: joi.string().required(),
    status: joi.string().required(),
    hours: joi.string().required()
}).required()
export const achievementsSchema = joi.object({
    title: joi.string().required(),
    from: joi.string().required(),
    date: joi.string().required()
}).required();

export const aboutSchema = joi.object({
    description: joi.string().required(),
    vision: joi.string().required(),
    mission: joi.string().required(),
    objectives: joi.string().required(),
    howwework: joi.string().required(),
    videolink:joi.string().required()
}).required()
export const provideSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required()
}).required()
export const workSchema = joi.object({
    description: joi.string().required()
})
export const workflowSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required()
})
export const homeSchema = joi.object({
    heading: joi.string().required(),
    description: joi.string().required(),
    portal: joi.string().required()
})
export const chooseSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required()
})