import * as env from 'dotenv'
env.config()
import * as express from "express";
import { Request, Response, NextFunction } from 'express';
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import course from "./routes/course.routes";
import category from "./routes/category.routes";
import instructor from "./routes/instructor.routes";
import review from "./routes/review.routes";
import student from "./routes/student.routes";
import syllabus from "./routes/syllabus.routes";
import enquiry from "./routes/enquiry.routes";
import Admin from "./routes/admin.routes";
import newsletter from "./routes/newsletter.routes"
import admission from "./routes/admission.routes";
import message from './routes/message.routes';
import skill from './routes/skill.routes'
import corporate from './routes/corporate.routes'
import partner from './routes/partner.routes'
import service from './routes/service.routes'
import training from './routes/training.routes'
import validate from './routes/validate.routes'
import contact from './routes/contact.routes'
import notice from './routes/notice.routes';
import certificate from './routes/certificate.routes';
import hackathon from './routes/hackathon.routes';
import testimonials from './routes/testimonials.routes'
import achievements from './routes/achivement.routes';
import about from './routes/about.routes';
import workflow from './routes/workflow.routes'
import provide from './routes/provide.routes';
import home from './routes/home.routes';
import whyus from './routes/whyus.routes';
import stories from './routes/stories.routes';
import * as swaggerUiExpress from "swagger-ui-express";
// import passport from 'passport'
const swaggerFile = require('./swagger-output.json')
import expressError from "./utils/expressError";
import * as cors from 'cors';
import * as morgan from 'morgan'
import * as cookieparser from 'cookie-parser';
import { port } from './config';
import { queue, sendEmail } from './utils/onlineFormSuccessEmail';
AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();
    app.set("view engine", "ejs");
    app.use(bodyParser.json());
    app.use(cookieparser());
    app.use(cors({
        origin: "*"
    }));

    app.use('/public', express.static('src/public'));


    app.get("/", (req: Request, res: Response,next:NextFunction) => {
            /* 	#swagger.tags = ['home'] */
        res.status(200).json({
            status: 200,
            message: "Hello World"
        })
    })


    app.use(morgan('dev'))

    app.use("/category", category);
    app.use("/courses", course);
    app.use("/instructor", instructor);
    app.use("/review", review);
    app.use("/student", student);
    app.use("/syllabus", syllabus);
    app.use("/enquiry", enquiry);
    app.use("/admin", Admin);
    app.use("/newletter", newsletter);
    app.use("/admission", admission);
    app.use("/messages", message);
    app.use('/skill', skill)
    app.use("/corporate", corporate)
    app.use("/partners", partner)
    app.use("/services", service)
    app.use("/trainings", training)
    app.use("/validate", validate)
    app.use("/contact", contact)
    app.use("/notices", notice)
    app.use("/certificate", certificate)
    app.use("/hackathon", hackathon)
    app.use("/achievements", achievements);
    app.use("/about", about);
    app.use("/provide", provide);
    app.use("/workflow", workflow)
    app.use("/whyus", whyus)
    app.use("/home", home)
    app.use("/testimonials", testimonials)
    app.use("/sucessstories",stories);
    app.use('/doc', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerFile))

    app.all("*", (req: Request, res: Response, next: NextFunction) => {
        next(new expressError(400, "page Not Found"));
    });
    app.use((err: expressError, req: Request, res: Response, next: NextFunction) => {
        let { statusCode = 500, message = "something went wrong" } = err;
        res.status(statusCode).json({ message: message });
    });

    app.listen(port, () => {
        console.log(`Express server has started on port ${port} \nAccess API: http://localhost:${port}`);
        setInterval(() => {
            if (queue.length > 0) {
                var i = queue.shift();
                sendEmail(i.email, i.name);

            }
        }, 1000);
    });




}).catch(error => { console.log(error) });
