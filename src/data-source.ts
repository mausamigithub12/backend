import 'dotenv/config'
import "reflect-metadata"
import { DataSource } from "typeorm"
import { course } from "./entity/course"
import { category } from "./entity/category"
import { instructor } from "./entity/instructor"
import { review } from "./entity/review"
import { student } from "./entity/student"
import { Syllabus } from "./entity/syllabus"
import { Admin } from "./entity/admin";
import { newsletter } from "./entity/newsletter"
import { admission } from "./entity/admission"
import { message } from "./entity/message"
import { enquiry } from "./entity/enquiry"
import { Skill } from "./entity/skill"
import { Corporate } from "./entity/corporate"
import { Partner } from "./entity/partner"
import { Service } from "./entity/service"
import { Training } from "./entity/training"
import { Contact } from './entity/contact'
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USERNAME } from './config'
import { Notice } from './entity/notice'
import { hackathon } from './entity/hackathon'
import { Testimonials } from './entity/Testimonials'
import { achievements } from './entity/achivement'
import { Aboutus, workflow, Provide } from './entity/aboutus'
import { Choose, Home } from './entity/home'
import { Stories } from './entity/stories'

export const AppDataSource = new DataSource({
    type: "mysql",
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '26462264ks#',
    database: 'hubttest',
    // host: DATABASE_HOST,
    // port: parseInt(DATABASE_PORT),
    // username: DATABASE_USERNAME,
    // password: DATABASE_PASSWORD,
    // database: DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [category, course, instructor, review, student, Syllabus, Admin, newsletter, admission, message, enquiry, Skill, Corporate, Partner, Service, Training, Contact,Notice,hackathon,Testimonials,achievements,Aboutus,Provide,workflow,Home,Choose,Stories],
    migrations: [],
    subscribers: [],
})


// export const AppDataSource = new DataSource({
//     type: 'mysql',
//     host: 'localhost',
//     port: 3306,
//     username: "root",
//     password: 'tushar',
//     database: 'hubit',
//     synchronize: true,
//     logging: false,
//     entities: [category, course, instructor, review, student, Syllabus, Admin, newsletter, admission, message, enquiry, Skill, Corporate, Partner, Service, Training, Contact,Notice,hackathon,Testimonials,achivements,Aboutus,Provide,workflow,Home,Choose],
//     migrations: [],
//     subscribers: [],
// })