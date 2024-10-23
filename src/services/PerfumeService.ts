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
        const queryBuilder = this.perfumeRepository.createQueryBuilder("perfume");

        if (searchTerm) {
            const terms = searchTerm.split(' ').filter(term => term.length > 0);
            terms.forEach((term, index) => {
                queryBuilder.andWhere(`LOWER(perfume.brand) LIKE LOWER(:term${index})`, { [`term${index}`]: `%${term}%` });
            });
        }

        if (sorted) {
            queryBuilder.orderBy("perfume.price", "ASC");
        }

        const perfumes = await queryBuilder.getMany();
        return perfumes;
    }

    async createPerfume(createPerfumeDto: CreatePerfumeDto): Promise<Perfume> {
        const perfume = this.perfumeRepository.create(createPerfumeDto);
        return this.perfumeRepository.save(perfume);
    }

    async updatePerfume(perfumeId: number, updatePerfumeDto: UpdatePerfumeDto): Promise<Perfume> {
        const perfume = await this.getPerfumeById(perfumeId);
        Object.assign(perfume, updatePerfumeDto);
        return await this.perfumeRepository.save(perfume);
    }

    async deletePerfume(perfumeId: number): Promise<void> {
        const perfume = await this.getPerfumeById(perfumeId);
        await this.perfumeRepository.delete(perfume.id);
    }

    async sortPerfumesByName(): Promise<Perfume[]> {
        return await this.perfumeRepository
            .createQueryBuilder("perfume")
            .orderBy("perfume.name", "ASC")
            .getMany();
    }

    async sortPerfumesByPrice(): Promise<Perfume[]> {
        return await this.perfumeRepository
            .createQueryBuilder("perfume")
            .orderBy("perfume.price", "ASC")
            .getMany();
    }
}
