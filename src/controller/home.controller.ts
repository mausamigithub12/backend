import { NextFunction, Request, Response } from "express";
import {Home} from '../entity/home';
import { AppDataSource } from "../data-source";
const home = AppDataSource.getRepository(Home);
interface customeRequest extends Request{
    file:any;
    files:any;
}
//get home page data
export const getHome = async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await home.find({})
        if(!result || result.length == 0){
            return res.status(204).json({message:"no data found"})
        }
        res.status(200).json({status:200,result})
    }catch(err){
        console.log(err);
        res.status(500).json({status:500,message:err.message||"something went wrong"})
    }
}
//post home page header and description
export const postHome = async(req:customeRequest,res:Response,next:NextFunction)=>{
    try{
        
        const result = await home.find({});
        if(!result || result.length > 0){
            return res.status(500).json({status:500,message:"sorry you can't add new data. data already exits"})
        }
        if(req.files){
            if(req?.files?.featuredimage && req.files.featuredimage.length > 0){
                req.body.featuredimage = req.files.featuredimage[0].filename;
            }
            if(req?.files?.portalimage && req.files.portalimage.length > 0){
                req.body.portalimage = req.files.portalimage[0].filename;
            }
        }
        await home.save(req.body).then(()=>{
            res.status(200).json({sataus:200,message:"data save sucessfully"})
        }).catch(err=>{
            res.status(500).json({status:500,message:err.message||"cannot save data in database"});
        })
    }catch(err){
        console.log(err);
        res.status(500).json({status:500,message:err.message||"something went wrong"})
    }
}
//edit header and description of home page
export const editHome = async(req:customeRequest,res:Response,next:NextFunction)=>{
    try{
        const result = await home.find()
        if(!result || result.length == 0){
            return res.status(404).json({status:404,message:"cannot get data"})
        }
        if(req.files){
            if(req?.files?.featuredimage && req.files.featuredimage.length > 0){
                req.body.featuredimage = req.files.featuredimage[0].filename;
            }
            if(req?.files?.portalimage && req.files.portalimage.length > 0){
                req.body.portalimage = req.files.portalimage[0].filename;
            }
        }
        Object.assign(result[0],req.body);
        await home.save(result).then(()=>{
            return res.status(200).json({status:200,message:"save sucessfully"})
        }).catch(err=>{
            return res.status(500).json({status:500,message:err.message||"something went wrong"})
        })
    }catch(err){
        console.log(err);
        res.status(500).json({status:500,message:err.message||"something went wrong"})
    }
}