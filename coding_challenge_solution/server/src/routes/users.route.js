import { Router } from "express";
import * as controller from "../controllers/user.controller.js";

const userRouter = new Router();

userRouter.get('/', controller.getAll);


export default userRouter;