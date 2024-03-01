import * as multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, "src/public");
  },

  filename: function (req: Request, file: Express.Multer.File, cb) {
    console.log('hrer',file)
    const fileExtension = file.originalname.split(".").pop();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const uniqueFilename = `${uniqueSuffix}.${fileExtension}`;
    cb(null, uniqueFilename);
  },
});

export const upload = multer({
  storage: storage
});