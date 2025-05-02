import { Express } from 'express';
import taskRoutes from "./task.route";
import userRouter from "./user.route";
import * as authMiddleware from "../middlewares/auth.middleware";


const mainV1Routes = (app: Express): void=>{
    app.use("/api/v1/task",authMiddleware.requireAuth, taskRoutes);

    app.use("/api/v1/users", userRouter);


}

export default mainV1Routes;