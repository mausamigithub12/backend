
import { Request, Response, NextFunction } from 'express';
import { category } from "../entity/category";
import { course } from '../entity/course';
import { AppDataSource } from '../data-source';
import { Equal, In, IsNull, Not } from 'typeorm';
const Category = AppDataSource.getRepository(category);
const Course = AppDataSource.getRepository(course);
//get all category with courses


export const getcategory = async (req: Request, res: Response, next: NextFunction) => {
    /**
     * 	#swagger.tags = ['Category']
    **/

    try {
        await Category.find({ order: { createdAt: 'ASC' } }).then(result => {
            res.status(200).json({ status: 200, message: 'success', result });
        }).catch(err => {
            res.status(400).json({ status: 400, message: err.message || "no data found in database" });

        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
//add data in database
export const addnewcategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    /* 	#swagger.tags = ['Category'] */

    try {
        const existingCategory = await Category.findOne({
            where: {
                name: Equal(req.body.name.toLowerCase()),
                deleteDate: null
            }
        })

        if (existingCategory) {
            return res.status(400).json({
                status: 400,
                message: "Category already exists"
            })
        }
        req.body.name = req.body.name.toLowerCase();
        const result = await Category.save(req.body);
        return res.status(200).json({
            status: 200,
            result,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
};

//update category info
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Category'] */

    try {
        let updatecategory = await Category.findOne({ where: { id: Equal(req.params.id) } });
        if (!updatecategory) {
            return res.status(400).json({ status: 400, message: "category not found" });
        }
        Object.assign(updatecategory, req.body);
        await Category.save(updatecategory).then(result => {
            res.status(200).json({ status: 200, message: "category update sucessfully", result });
        }).catch(err => {
            res.status(400).json({ status: 400, message: err.message });
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }

}
//soft delete data
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Category'] */

    try {
        const result = await Category.find({ where: { id: In([...JSON.parse(req.body.ids)]) }, relations: { course: true } });
        if (!result || result.length == 0) return res.status(400).json({ status: 400, message: 'Invalid category id' })
        for (let cat of result) {
            if (cat.course.length > 0) {
                return res.status(400).json({ status: 400, message: 'Category is linked with existing course' })
            }
            await Category.softRemove(cat);
        }
        return res.status(200).json({ status: 200, message: 'success' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}

//get deleted category
export const deletedCategory = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Category'] */

    try {
        const result = await Category.find({
            withDeleted: true,
            where: {
                deleteDate: Not(IsNull())
            }
        },

        );
        if (!result || result.length === 0) {
            return res.status(404).json({ status: 404, message: "no data found" })
        }
        res.json(result);
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
// restore deleted data
export const restore = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Category'] */

    try {
        if (!req.body.categoryids || req.body.categoryids.length === 0) {
            return res.status(204).json({ status: 204, message: "empty array" })
        }
        for (let id of req.body.categoryids) {
            const result = await Category.findOne({ where: { id: Equal(id) }, withDeleted: true });
            if (!result) {
                return res.status(404).json({ status: 404, message: "no data found" })
            }
            result.deleteDate = null;
            await Category.save(result);
        }
        res.status(200).json({ status: 200, message: "restore success" });

    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}
// //delete permanent
export const delpermanent = async (req: Request, res: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Category'] */

    try {
        if (!req.body.categoryids || req.body.categoryids.length === 0) {
            return res.status(204).json({ status: 204, message: "empty array" });
        }
        for (let id of req.body.categoryids) {
            const result = await Category.findOne({ where: { id: Equal(id) }, withDeleted: true });
            if (!result) {
                return res.status(404).json({ status: 404, message: "no data found" });
            }
            await Category.remove(result);
        }
        res.status(200).json({ status: 200, message: "data deleted permanently" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}