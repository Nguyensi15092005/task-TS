import { Router } from 'express';
import * as controller from "../controller/user.controller";
const router: Router = Router();

router.post("/register", controller.register);

router.post("/login", controller.login);

router.get("/detail/:id", controller.detail);



export default router;