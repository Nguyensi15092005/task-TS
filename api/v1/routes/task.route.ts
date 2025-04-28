import { Router } from 'express';
import * as contronller from "../controller/task.controller";
const router: Router = Router();



router.get("/", contronller.index)

router.get("/detail/:id", contronller.detail);


export default router;