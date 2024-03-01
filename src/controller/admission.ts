// import { Request, Response, NextFunction } from 'express';
// import {sendEmail} from '../utils/onlineFormSuccessEmail'
// import { admission } from '../entity/admission';
// import {course} from '../entity/course';
// import { AppDataSource } from '../data-source';
// import { Equal } from 'typeorm';
// const onlineStu = AppDataSource.getRepository(admission);
// const Course = AppDataSource.getRepository(course)
// interface RequeestCustome extends Request{
//     files:any;
//     file:any;
// }
// //add new online admission 
// export const addOnlineStu = async (req: RequeestCustome, res: Response, next: NextFunction) => {
    
// try{
//     if(req.files){
//         if(req.files.avatar && req.files.avatar.length>0){
//             req.body.avatar = req.files.avatar[0].filename;
//         }
//         if(req.files.payment && req.files.payment.length>0){
//             req.body.payment =req.files.payment[0].filename;
//         }
//     }
//     let courseid = req.body.course;
//     let result = await Course.findOne({where:{id:Equal(courseid)}});
//     if(!result){
//         return res.json({message:"no course found"});
//     }
//     req.body.course = result;
//     console.log(req.body)
//     await onlineStu.save(req.body).then((result) => {
//         sendEmail(req.body.email);
//         res.json({message:"registration complete"});
//     }).catch(err => {
//         res.status(400).json({ message: err.message});
//     })
// }catch(err){
//     console.log(err)
// res.json({message:err.message||"something went wrong"})
// }
    
// }
// //get all record of student who get admission from online
// export const getOnlineStu = async (req: Request, res: Response, next: NextFunction) => {
//     try{
// let result =  await onlineStu.find({relations:{course:true}})
//     if(!result){
//        return res.status(400).json({ message: "cannot find data" });
//     }
//     res.json(result);
//     }catch(err){
//         console.log(err)
//         res.json({message:err.message||"something went wrong"})
//     }
    
// }
// //verify online student
// export const verify = async (req: Request, res: Response, next: NextFunction) => {
//     try{
// let result = await onlineStu.findOne({where:{id:Equal(req.params.id)}});
//     if(!result){
//         return res.json({message:"no data found"});
//     }
//     result.verified = true;
//     onlineStu.save(result);
//     res.json({message:"verified success"});
//     }catch(err){
//         console.log(err)
//         res.json({message:err.message||"something went wrong"})
//     }
    
// }
// //get all no verified online student 
// export const getNonVerified = async (req: Request, res: Response, next: NextFunction) => {
//     try{
// let result = await onlineStu.findOne({where:{verified:false}});
//     if(!result){
//         return res.json({message:"no data found"});
//     }
//     res.json(result);
//     }catch(err){
//         console.log(err)
//         res.json({message:err.message||"something went wrong"})
//     }
    
// }
// //get all verified data
// export const getVerifiedData = async (req: Request, res: Response, next: NextFunction) => {
//     try{
// let result = await onlineStu.findOne({where:{verified:true}});
//     if(!result){
//         return res.json({message:"no data found"});
//     }
//     res.json(result);
//     }catch(err){
//         console.log(err)
//         res.json({message:err.message||"something went wrong"})
//     }
    
// }
// //delete data of online admission
// export const deletedDate= async(req:Request,res:Response,next:NextFunction)=>{
//     try{
// if(req.body.ids.length == 0){
//         return res.json("empty array")
//     }
//     for(let id of req.body.ids){
//         const result = await onlineStu.findOne({where:{id:Equal(id),deleteDate:null}});
//         if(!result){
//             return res.json({message:`no data found for id= ${id}`})
//         } 
//         await onlineStu.softRemove(result);
//     }
//     res.json({message:"data deleted"})
//     }catch(err){
//         console.log(err)
//         res.json({message:err.message||"something went wrong"})
//     }
    
// }
// //get all deleted data
// export const getAllDelData = async(req:Request,res:Response,next:NextFunction)=>{
//     try{
// let result = await onlineStu.find({withDeleted:true});
//     if(!result){
//         return res.json({message:"no data found"})
//     }
//     res.json(result);
//     }catch(err){
//         console.log(err)
//         res.json({message:err.message||"something went wrong"})
//     }
    
// }
// //restore data
// export const restore = async (req:Request,res:Response,next:NextFunction)=>{
//     try{
// if(req.body.ids.length == 0){
//         return res.json({message:"empty array"})
//     }
//     for(let id of req.body.ids){
//         let result = await onlineStu.findOne({where:{id:Equal(id)}});
//         if(!result){
//             return res.json({message:`not data found for id= ${id}`})
//         }
//         result.deleteDate = null;
//         await onlineStu.save(result);
//     }
//     res.json({message:"restore success"})
//     }catch(err){
//         console.log(err)
//         res.json({message:err.message||"something went wrong"})
//     }
    
// }
// //delete permanent 
// export const delPer = async(req:Request,res:Response,next:NextFunction)=>{
//     try{
// if(req.body.ids == 0){
//         return res.json({message:"empty array"})
//     }
//     for(let id of req.body.ids){
//         const result = await onlineStu.findOne({where:{id:Equal(id)}})
//         await onlineStu.softRemove(result);
//     }
//     res.json({message:"deleted permanently"})
//     }catch(err){
//         console.log(err)
//         res.json({message:err.message||"something went wrong"})
//     }
    
// }