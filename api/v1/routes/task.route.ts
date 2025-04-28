import { Router } from 'express';
import * as controller from "../controller/task.controller";
const router: Router = Router();



router.get("/", controller.index)

router.get("/detail/:id", controller.detail);

router.patch("/change-status/:id", controller.changeStatus);


export default router;