export type User = {
  id: {
    _value: string
  },
  username: {
    _value: string
  }
}

import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
// import { redis } from './connectredis';
import { AppDataSource } from './data-source'
import { Admin } from './entity/admin'
import { JWT_SECRET } from './config';

const userRepo = AppDataSource.getRepository(Admin)


export const isAdminLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.header("Authorization");
    if (!auth) {
      return res.status(401).json({message:"admin is not login"});
    }
    const token = auth.split(' ')[1];
    jwt.verify(token, `${JWT_SECRET}`, async (err, user) => {
      if (err) {
        return res.status(500).json({ status:500,message: err.message });
      }
      // let id = user.id._value;
      // const findIdOnRedis = await redis.get(id)
      // if (!findIdOnRedis) {
      //   return res.json({ message: "Invalid user" });

      // }
      // req.user = user;
      next();
    })
  } catch (err) {
    res.status(500).json({status:500, message: "something went wrong" });
  }
};


export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body.token;
    if (!token || token?.length < 10) {
      return res.status(401).json({
        status: 401,
        message: "unauthorized"
      })
    }

    let currentUser
    jwt.verify(token, `${JWT_SECRET}`, (err: Error, user: User) => {

      if (err) {
        currentUser = undefined
      }
      if (user) {
        currentUser = {
          id: user.id._value,
        }

      }
    });

    const findUser = await userRepo.findOneBy({ id: currentUser.id })

    if (findUser) {
      return res.status(200).json({
        message: "Authorized",
        id: findUser.id
      })
    }
    else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
  catch (error) {
    return res.status(500).json({
      status: 500,
      message: "unauthorized"
    })
  }
}


