import {Perfume} from "../entities/Perfume";
import {Repository} from "typeorm";
import {CreatePerfumeDto} from "../dto/CreatePerfumeDto";
import {UpdatePerfumeDto} from "../dto/UpdatePerfumeDto";
import {SearchPerfumesOptionsDto} from "../dto/SearchPerfumesOptionsDto";
import {NotFoundException} from "../exceptions/NotFoundException";
export class PerfumeService {

    constructor(private readonly perfumeRepository: Repository<Perfume>) {}

    async getPerfumeById(perfumeId: number): Promise<Perfume> {
        const perfume = await this.perfumeRepository
            .createQueryBuilder("perfume")
            .where("perfume.id = :perfumeId", { perfumeId })
            .getOne();

        if (!perfume) {
            throw new NotFoundException("Perfume not found");
        }
        return perfume;
    }

    async getPerfumes(searchPerfumesOptionsDto: SearchPerfumesOptionsDto): Promise<Perfume[]> {
        const { sorted, searchTerm } = searchPerfumesOptionsDto;
        const queryBuilder = this.perfumeRepository
            .createQueryBuilder("perfume")
            .where(`perfume.brand LIKE :searchTerm`, { searchTerm: `%${searchTerm}%` });

        if (sorted) {
            queryBuilder.orderBy("perfume.price", "ASC");
        }

        const perfumes = await queryBuilder.getMany();
        if (!perfumes || perfumes.length === 0) {
            throw new NotFoundException("Perfumes not found");
        }
        return perfumes;
    }

    async createPerfume(createPerfumeDto: CreatePerfumeDto): Promise<Perfume> {
        const perfume = this.perfumeRepository.create(createPerfumeDto);
        return this.perfumeRepository.save(perfume);
    }

    async updatePerfume(perfumeId: number, updatePerfumeDto: UpdatePerfumeDto): Promise<Perfume> {
        const perfume = await this.getPerfumeById(perfumeId);
        Object.assign(perfume, updatePerfumeDto);
        await this.perfumeRepository.save(perfume);
        return perfume;
    }

    async deletePerfume(perfumeId: number): Promise<void> {
        const perfume = await this.getPerfumeById(perfumeId);
        await this.perfumeRepository.delete(perfume.id);
    }

    async sortPerfumesByName(): Promise<Perfume[]> {
        const perfumes = await this.perfumeRepository
            .createQueryBuilder("perfume")
            .orderBy("perfume.name", "ASC")
            .getMany();

        if (!perfumes || perfumes.length === 0) {
            throw new NotFoundException("Perfumes not found");
        }
        return perfumes;
    }

    async sortPerfumesByPrice(): Promise<Perfume[]> {
        const perfumes = await this.perfumeRepository
            .createQueryBuilder("perfume")
            .orderBy("perfume.price", "ASC")
            .getMany();

        if (!perfumes || perfumes.length === 0) {
            throw new NotFoundException("Perfumes not found");
        }
        return perfumes;
    }
}
