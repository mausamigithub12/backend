import { NextFunction, Request, Response } from "express";
import {Stories} from '../entity/stories';
import { AppDataSource } from "../data-source";
import { Equal, In, IsNull, Not } from "typeorm";
const stories = AppDataSource.getRepository(Stories);

export const getAllStories = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        await stories.find({}).then(result=>{
            return res.status(200).json({result})
        })
    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message||"something went wrong"})
    }
}

export const postStories = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        if(req.file){
            req.body.image = req.file.filename;
        }
        await stories.save(req.body).then(()=>{
            res.status(200).json({message:"sucessfully added"})
        }).catch(err=>{
            res.status(400).json({message:"cannot save in data"})
        })
    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message || "something went wrong"})
    }
}

export const editStories = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await stories.findOne({where:{id:Equal(req.params.id)}})
        if(!result){
            return res.status(404).json({message:"no data found"})
        }

        if(req.file){
            req.body.image = req.file.filename;
        }

        Object.assign(result,req.body);
        await stories.save(result).then((result)=>{
            return res.status(200).json({result})
        }).catch(err=>{
            return res.status(404).json({message:err.message || "cannot update"})
        })
    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message||"something went wrong"})
    }
}
export const deleteStories = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await stories.find({where:{id:In([...JSON.parse(req.body.ids)])}});
        if(!result || result.length == 0){
            return res.status(404).json({message:"no data found"});
        }
        result.map(async data => await stories.softRemove(data));
        return res.status(200).json({message:"deleted"})
    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message||"something went wrong"})
    }
}
export const getDelData = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await stories.find({where:{deletedAt:Not(IsNull())},withDeleted:true})
        if(!result || result.length == 0){
            return res.status(404).json({message:'no data found'})
        }
        return res.status(200).json({result});
    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message||"something went wrong"})
    }
}
export const restoreData = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await stories.find({where:{id:In([...JSON.parse(req.body.ids)])},withDeleted:true})
        if(!result || result.length == 0){
            return res.status(404).json({message:"no data found"})
        }
        result.forEach(async data=>{
            data.deletedAt = null
            await stories.save(data)
        })
        res.status(200).json({message:'restore success'});
    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message||"something went wrong"})
    }
}
export const delPer = async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const result = await stories.find({where:{id:In([...JSON.parse(req.body.ids)])},withDeleted:true});
        if(!result || result.length==0){
            return res.status(404).json({message:"nothing to delete"})
        }
        result.map(async data => await stories.remove(data));
        return res.status(200).json({message:"deleted"})

    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message || "something went wrong"});
    }
}