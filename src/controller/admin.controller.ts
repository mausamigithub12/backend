import { Equal } from 'typeorm';
import { JWT_SECRET } from '../config';
import { Request, Response, NextFunction } from 'express';
import { Admin } from '../entity/admin';
import { AppDataSource } from '../data-source';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
const admins = AppDataSource.getRepository(Admin);

//login page for admin
export const login = async (req: Request, res: Response, next: NextFunction) => {
  /* 	#swagger.tags = ['Admin'] */

  try {
    const { username, password } = req.body;
    const admin = await admins.findOne({ where: { username: Equal(username) } });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: Equal(admin.id), username: Equal(admin.username)},`${JWT_SECRET}`,{expiresIn:'8h'});
    // await redis.set(`${admin.id}`, token);
    // await redis.expire(`${admin.id}`, 86400);
    res.status(200).json({ message: "login successfull", accesstoken: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: err.message || "something went wrong" });

  }
};
//signup page for admin
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  /* 	#swagger.tags = ['Admin'] */

  try {
    let signup = new Admin()
    let { username } = req.body;
    signup.username = username;
    await bcrypt.hash(req.body.password, 10).then((hash) => {
      signup.password = hash;
    })
    await admins.save(signup);
    res.json({ message: "signup sucess" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: err.message || "something went wrong" });

  }
}