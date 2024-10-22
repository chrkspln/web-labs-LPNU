import {Perfume} from "../entities/Perfume";
import {Repository} from "typeorm";
import {CreatePerfumeDto} from "../dto/CreatePerfumeDto";
import {UpdatePerfumeDto} from "../dto/UpdatePerfumeDto";
import {SearchPerfumesOptionsDto} from "../dto/SearchPerfumesOptionsDto";

export class PerfumeService {

    constructor(private readonly perfumeRepository: Repository<Perfume>) {}

    async getPerfumeById(perfumeId: string): Promise<Perfume> {
        try {
            const perfume = await this.perfumeRepository
                .createQueryBuilder("perfume")
                .where("perfume.id = :perfumeId", { perfumeId })
                .getOne();

            if (!perfume) {
                throw new Error("Perfume not found");
            }
            return perfume;
        } catch (error) {
            throw error;
        }
    }

    private async getPerfumeByBrand(brand: string): Promise<Perfume> {
        try {
            const perfume = await this.perfumeRepository
                .createQueryBuilder("perfume")
                .where("perfume.brand = :brand", { brand })
                .getOne();

            if (!perfume) {
                throw new Error("Perfume not found");
            }
            return perfume;
        } catch (error) {
            throw error;
        }
    }

    async getPerfumes(searchPerfumesOptionsDto: SearchPerfumesOptionsDto): Promise<Perfume[]> {
        try {
            const { sorted, searchTerm } = searchPerfumesOptionsDto;
            const queryBuilder = this.perfumeRepository
                .createQueryBuilder("perfume")
                .where(`perfume.brand LIKE :searchTerm`, { searchTerm: `%${searchTerm}%` });

            if (sorted) {
                queryBuilder.orderBy("perfume.price", "ASC");
            }

            const perfumes = await queryBuilder.getMany();
            if (!perfumes || perfumes.length === 0) {
                throw new Error("Perfumes not found");
            }
            return perfumes;
        } catch (error) {
            throw error;
        }
    }

    async createPerfume(createPerfumeDto: CreatePerfumeDto): Promise<Perfume> {
        try {
            const { id, name, brand, price, scent, volume } = createPerfumeDto;
            const perfume = this.perfumeRepository.create({ id, name, brand, price, scent, volume });
            return this.perfumeRepository.save(perfume);
        } catch (error) {
            throw new Error(`Error creating perfume: ${error.message}`);
        }
    }

    async updatePerfume(perfumeId: string, updatePerfumeDto: UpdatePerfumeDto): Promise<Perfume> {
        try {
            await this.perfumeRepository.update(perfumeId, updatePerfumeDto);
            return await this.getPerfumeById(perfumeId);
        } catch (error) {
            throw new Error(`Error updating perfume: ${error.message}`);
        }
    }

    async deletePerfume(perfumeId: string): Promise<boolean> {
        try {
            const result = await this.perfumeRepository.delete(perfumeId);
            return result.affected === 1;
        } catch (error) {
            throw new Error(`Error deleting perfume: ${error.message}`);
        }
    }

    async sortPerfumesByName(): Promise<Perfume[]> {
        try {
            const perfumes = await this.perfumeRepository
                .createQueryBuilder("perfume")
                .orderBy("perfume.name", "ASC")
                .getMany();

            if (!perfumes || perfumes.length === 0) {
                throw new Error("Perfumes not found");
            }
            return perfumes;
        } catch (error) {
            throw error;
        }
    }

    async sortPerfumesByPrice(): Promise<Perfume[]> {
        try {
            const perfumes = await this.perfumeRepository
                .createQueryBuilder("perfume")
                .orderBy("perfume.price", "ASC")
                .getMany();

            if (!perfumes || perfumes.length === 0) {
                throw new Error("Perfumes not found");
            }
            return perfumes;
        } catch (error) {
            throw error;
        }
    }
}
