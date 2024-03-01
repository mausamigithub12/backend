import { Router } from 'express';
import { categoryValidation } from '../utils/validation';
import { isAdminLogin } from '../middleware';
import { addnewcategory, deleteCategory, deletedCategory, delpermanent, getcategory, restore, updateCategory } from '../controller/category.controller';
const router = Router();



//category
router.route("/").get(getcategory).post(addnewcategory);
router.route("/delete").get(deletedCategory).delete(delpermanent).patch(restore);
router.route("/deletemany").post(deleteCategory)
router.route("/:id").patch(updateCategory);

export default router;