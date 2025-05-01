import { Express } from 'express';
import taskRoutes from "./task.route";
import userRouter from "./user.route";

const mainV1Routes = (app: Express): void=>{
    app.use("/api/v1/task", taskRoutes);

    app.use("/api/v1/users", userRouter);


}

export default mainV1Routes;