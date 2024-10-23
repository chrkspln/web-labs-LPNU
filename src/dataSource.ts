import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import {Perfume} from "./entities/Perfume";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_PUBLIC_URL,
    synchronize: true,
    logging: false,
    entities: [Perfume],
    migrations: [],
    subscribers: [],
});
