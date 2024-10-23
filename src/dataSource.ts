import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import {Perfume} from "./entities/Perfume";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "chrkspln",
    database: "web_lpnu_labs",
    entities: [Perfume],
    synchronize: true,
    logging: true
});

// Perfume data to be seeded
const seedPerfumes = [
    {
        name: "Suu...",
        brand: "Masaki Matsushima",
        price: 1171,
        scent: "Floral",
        volume: "80ml"
    },
    {
        name: "Mat.",
        brand: "Masaki Matsushima",
        price: 985,
        scent: "Floral, Fruity",
        volume: "40ml"
    },
    {
        name: "Marry Me!",
        brand: "Lanvin",
        price: 1007,
        scent: "Floral, Fruity",
        volume: "30ml"
    },
    {
        name: "Parfum dEte",
        brand: "Kenzo",
        price: 2428,
        scent: "Floral, Green",
        volume: "75ml"
    },
    {
        name: "Noa",
        brand: "Cacharel",
        price: 909,
        scent: "Floral, Aldehyde",
        volume: "30ml"
    }
];

async function seedDatabase() {
    try {
        const perfumeRepository = AppDataSource.getRepository(Perfume);
        await perfumeRepository.clear();
        await perfumeRepository.save(seedPerfumes);
        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding the database:", error);
    }
}

// Initialize Data Source
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        seedDatabase();
    })
    .catch((error) => console.log("Error during Data Source initialization", error));
