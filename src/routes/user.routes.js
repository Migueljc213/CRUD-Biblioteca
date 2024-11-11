import { Router } from "express";
import userController from "../controller/user.controller.js";
import { validate } from "../middlewares/validation.middlewares.js";
import {userSchema} from "../schema/user.schema.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/users', validate(userSchema) , userController.createUserController);
router.post('/users/login', userController.loginUserController);
router.get('/users', authMiddleware , userController.findAllUsersController);
router.get('/users' , userController.findAllUsersController);
router.patch('/users/:id', userController.updateUserController);
router.delete('/users/delete/:id', userController.deleteUserController);

export default router;