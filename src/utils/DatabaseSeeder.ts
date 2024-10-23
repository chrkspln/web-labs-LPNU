import {Perfume} from "../entities/Perfume";
import {seedPerfumes} from "./seeds/PerfumesSeeds";
import {AppDataSource} from "../dataSource";

export async function seedDatabase(): Promise<void> {
    try {
        const perfumeRepository = AppDataSource.getRepository(Perfume);
        await perfumeRepository.clear();
        await perfumeRepository.save(seedPerfumes);
        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding the database:", error);
    }
}
