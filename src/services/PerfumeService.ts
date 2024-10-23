import {Perfume} from "../entities/Perfume";
import {InsertResult, Repository} from "typeorm";
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

    private async getPerfumeByName(name: string): Promise<Perfume> {
        try {
            const perfume = await this.perfumeRepository
                .createQueryBuilder("perfume")
                .where("perfume.name = :name", { name })
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
                .where(`perfume.name LIKE :searchTerm`, { searchTerm: `%${searchTerm}%` });

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
            const { name, brand, price, scent, volume } = createPerfumeDto;
            const perfume = this.perfumeRepository.create({ name, brand, price, scent, volume });
            return this.perfumeRepository.save(perfume);
        } catch (error) {
            throw new Error(`Error creating perfume: ${error.message}`);
        }
    }

    async updatePerfume(perfumeId: string, updatePerfumeDto: UpdatePerfumeDto): Promise<Perfume> {
        try {
            await this.perfumeRepository.update(perfumeId, updatePerfumeDto);
            const updatedPerfume = await this.getPerfumeById(perfumeId);
            return updatedPerfume;
        } catch (error) {
            throw new Error(`Error updating perfume: ${error.message}`);
        }
    }
}
