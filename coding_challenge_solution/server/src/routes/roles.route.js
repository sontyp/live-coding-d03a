import { Router } from "express";
import * as controller from "../controllers/role.controller.js";

const roleRouter = new Router();

roleRouter.get('/', controller.getAll);


export default roleRouter;