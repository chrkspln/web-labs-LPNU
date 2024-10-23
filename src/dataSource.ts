import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import {Perfume} from "./entities/Perfume";
import {seedDatabase} from "./utils/DatabaseSeeder";
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_PUBLIC_URL,
    entities: [Perfume],
    synchronize: true,
    logging: false
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        seedDatabase();
    })
    .catch((error) => console.log("Error during Data Source initialization", error));
