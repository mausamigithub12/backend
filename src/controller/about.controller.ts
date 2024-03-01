
import { NextFunction, Request, Response } from "express";
import { Aboutus } from "../entity/aboutus";
import { AppDataSource } from "../data-source";
const about = AppDataSource.getRepository(Aboutus);
//About  
//get
export const getAboutInfo = async (req:Request,res:Response,next:NextFunction)=>{
    /* 	#swagger.tags = ['about'] */
    try{
        const result = await about.find({});
        if(!result){
            return res.status(204).json({status:204,message:"nothing to show"});
        }
        res.status(200).json({status:200,result});
    }catch(err){
        console.log(err);
        res.status(500).json({status:500,message:err.message||"something went wrong"});
    }
}
//post
export const postAboutInfo = async(req:Request,res:Response,next:NextFunction)=>{
    /* 	#swagger.tags = ['about'] */

    try{
        const result = await about.find({});
        if(result.length != 0){
            return res.status(500).json({status:500,message:"information already exits and cannot contain more then 1 information"})
        }
        if(req.file){
            req.body.image = req.file.filename;
        }
        await about.save(req.body).then(result=>{
            return res.status(200).json({status:200,message:"save sucessfully"})
        }).catch(err=>{
           return res.status(500).json({status:500,message:"cannot save data in database"})
        })
    }catch(err){
        console.log(err);
        res.status(500).json({status:500,message:err.message||"something went wrong"})
    }
}

//patch
export const editAboutInfo = async (req:Request,res:Response,next:NextFunction)=>{
    /* 	#swagger.tags = ['about'] */

    try{
        const result = await about.find({})
        if(!result || result.length == 0){
            return res.status(404).json({status:404,message:"cannot get data"})
        }
        if(req.file){
            req.body.image =req.file.filename;
        }
        Object.assign(result[0],req.body);
        await about.save(result).then(()=>{
            return res.status(200).json({status:200,message:"save sucessfully"})
        }).catch(err=>{
            return res.status(500).json({status:500,message:err.message || "something went wrong"})
        })
    }catch(err){
        console.log(err);
        res.status(500).json({status:500,message:err.message||"something went wrong"});
    }
}



//How we work
//get
// export const getWorkInfo = async (req:Request,res:Response,next:NextFunction)=>{
//     /* 	#swagger.tags = ['provide'] */

//     try{
//         const result = await work.find({});
//         if(!result || result.length == 0){
//             return res.status(404).json({status:404,message:"nothing to show"});
//         }
//         res.status(200).json({status:200,data:result});
//     }catch(err){
//         console.log(err);
//         res.status(500).json({status:500,message:err.message||"something went wrong"});
//     }
// }
//post
// export const postWorkInfo = async(req:Request,res:Response,next:NextFunction)=>{
//     /* 	#swagger.tags = ['provide'] */

//     try{
//         const result = await work.find({});
//         if(!result || result.length > 0){
//             return res.status(500).json({status:500,message:"information already exits and cannot contain more then 1 information"})
//         }
//         if(req.file){
//             req.body.image = req.file.filename;
//         }
//         await work.save(req.body).then(result=>{
//             return res.status(200).json({status:200,message:"save sucessfully"})
//         }).catch(err=>{
//            return res.status(500).json({status:500,message:"cannot save data in database"})
//         })
//     }catch(err){
//         console.log(err);
//         res.status(500).json({status:500,message:err.message||"something went wrong"})
//     }
// }

//patch
// export const editWorkInfo = async (req:Request,res:Response,next:NextFunction)=>{
//     /* 	#swagger.tags = ['provide'] */

//     try{
//         const result = await work.find({})
//         if(!result||result.length == 0){
//             return res.status(404).json({status:404,message:"cannot get data"})
//         }
//         if(req.file){
//             req.body.image = req.file.filename;
//         }
//         Object.assign(result[0],req.body);
//         await work.save(result).then(()=>{
//             return res.status(200).json({status:200,message:"save sucessfully"})
//         }).catch(err=>{
//             return res.status(500).json({status:500,message:err.message||"something went wrong"})
//         })
//     }catch(err){
//         console.log(err);
//         res.status(500).json({status:500,message:err.message||"something went wrong"});
//     }
// }

