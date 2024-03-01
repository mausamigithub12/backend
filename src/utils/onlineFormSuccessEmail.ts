import {EMAIL_USERNAME,EMAIL_PASSWORD} from '../config'
import * as nodemailer from 'nodemailer';

import * as ejs from 'ejs'
import * as fs from 'fs';
export var queue =  [];
export const sendEmail = (email:string,name:string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.example.com',
    port: 587,
    secure: true,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
    
  });
  fs.readFile('src/views/email.ejs', 'utf-8', (err, data) => {
    const info ={
      name:name,
      cid:'@hubit.com'
    }
    if (err) {
      console.log(err)
    } else {
      const mailOptions = {
        from: '"HUb IT" <your_email@example.com>',
        to: email,
        subject: 'registration successfull!',
        html: ejs.render(data,{name:"email",info})
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        }
      });
    }
  })

}
