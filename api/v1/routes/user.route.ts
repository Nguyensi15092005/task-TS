import { Router } from 'express';
import * as controller from "../controller/user.controller";
const router: Router = Router();



router.post("/register", controller.register);

export default router;