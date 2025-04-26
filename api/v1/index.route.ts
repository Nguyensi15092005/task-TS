import { Express } from 'express';
import taskRoutes from "./task.route";

const mainV1Routes = (app: Express): void=>{
    app.use("/api/v1/task", taskRoutes);

}

export default mainV1Routes;