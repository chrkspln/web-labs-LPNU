import {Perfume} from "../entities/Perfume";
import {Request, Response} from "express";
import {SearchPerfumesOptionsDto} from "../dto/SearchPerfumesOptionsDto";
import {PerfumeService} from "../services/PerfumeService";
import {CreatePerfumeDto} from "../dto/CreatePerfumeDto";

export class PerfumeController {

    constructor(private readonly perfumeService: PerfumeService) {}

    async getPerfumeById(request: Request, response: Response): Promise<Response> {
        try {
            const perfumeId = request.params.id as string;
            const perfume: Perfume = await this.perfumeService.getPerfumeById(perfumeId);
            return response.status(200).json(perfume);
        } catch (error) {
            console.error("Error fetching perfume: ", error.message);
            return response.status(500).json({ message: 'Failed to fetch perfume',  error: error.message });
        }
    }

    async getPerfumes(request: Request, response: Response): Promise<Response> {
        try {
            const sorted = request.query.sorted === 'true';
            const searchTerm = request.query.searchTerm?.toString() || '';

            const searchPerfumesOptionsDto: SearchPerfumesOptionsDto = {sorted, searchTerm};
            const perfumes: Perfume[] = await this.perfumeService.getPerfumes(searchPerfumesOptionsDto);
            return response.status(200).json(perfumes);
        } catch (error) {
            console.error('Error fetching perfumes:', error.message);
            return response.status(500).json({message: 'Failed to fetch perfumes', error: error.message});
        }
    }

    async createPerfume(request: Request, response: Response): Promise<Response> {
        try {
            const createPerfumeDto = request.body as CreatePerfumeDto;
            const newPerfume = await this.perfumeService.createPerfume(createPerfumeDto);
            return response.status(201).json(newPerfume);
        } catch (error) {
            console.error('Error creating perfume:', error.message);
            return response.status(500).json({ message: 'Failed to create perfume', error: error.message });
        }
    }

    async updatePerfume(request: Request, response: Response): Promise<Response> {
        try {
            const perfumeId: string = request.params.id as string;
            const updatePerfumeDto = request.body as CreatePerfumeDto;
            const updatedPerfume = await this.perfumeService.updatePerfume(perfumeId, updatePerfumeDto);
            return response.status(200).json(updatedPerfume);
        } catch (error) {
            console.error('Error updating perfume:', error.message);
            return response.status(500).json({ message: 'Failed to update perfume', error: error.message });
        }
    }
}
