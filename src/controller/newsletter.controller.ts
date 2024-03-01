import { Request, Response, NextFunction } from 'express';
import { newsletter } from '../entity/newsletter';
import { AppDataSource } from '../data-source';
import { } from '../config';
const nodemailer = require("nodemailer");
const NEWS = AppDataSource.getRepository(newsletter);
export const subscribeNewLetter = async (req: Request, res: Response, next: NextFunction) => {
  /* 	#swagger.tags = ['NewsLetterSub'] */

  try {
    await NEWS.save(req.body).then(result => {
      res.status(200).json({ status: 200, message: "newsletter subscribe successfully" })
    }).catch(err => {
      res.status(400).json({ status: 400, message: "Already subscribe or Invalid Email" })
    });

  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 500, message: err.message || "something went wrong" });
  }
}
export const getNewLetterEmail = async (req: Request, res: Response, next: NextFunction) => {
  /* 	#swagger.tags = ['NewsLetterSub'] */

  try {

    let result = await NEWS.find({})
    if (!result) {
      return res.status(400).json({ status: 400, message: "cannot get emails" });
    }
    res.status(400).json(result);
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 500, message: err.message || "something went wrong" });
  }
}

export const sendNewsLetter = async (req: Request, res: Response, next: NextFunction) => {
  /* 	#swagger.tags = ['NewsLetterSub'] */

  try {

    let result = await NEWS.find({})
    if (!result) {
      return res.status(400).json({ status: 400, message: "email not found in database" })

    }
    const allmail = result.map(result => result.email);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: '"Your Name" <your_email@example.com>',
      to: allmail.join(' '),
      subject: 'Hello from Nodemailer!',
      text: 'This is a test email sent with Nodemailer.',
      html: '<h1>Welcome to Nodemailer!</h1><p>This is an HTML email example.</p>',
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Email sent: ', info.messageId);
      }
    });
    res.status(200).json({ status: 200, message: "mail sent successfully" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 500, message: err.message || "something went wrong" });
  }
}