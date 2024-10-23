import 'reflect-metadata';
import * as express from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./dataSource";
import * as dotenv from "dotenv";
import PerfumeRouter from "./routers/PerfumeRouter";
dotenv.config();

AppDataSource.initialize().then(async () => {
    const app = express();
    const PORT = process.env.PORT || 3000;
    app.use(bodyParser.json());
    app.use("/perfumes", PerfumeRouter);

    app.listen(PORT, () => {
        console.log(`Express server has started on port ${PORT}`);
    });
}).catch(error => console.log(error));