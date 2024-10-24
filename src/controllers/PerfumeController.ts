import {Perfume} from "../entities/Perfume";
import {Request, Response} from "express";
import {SearchPerfumesOptionsDto} from "../dto/SearchPerfumesOptionsDto";
import {PerfumeService} from "../services/PerfumeService";
import {CreatePerfumeDto} from "../dto/CreatePerfumeDto";
import {NotFoundException} from "../exceptions/NotFoundException";
import {BadRequestException} from "../exceptions/BadRequestException";

export class PerfumeController {

    constructor(private readonly perfumeService: PerfumeService) {}

    async getPerfumeById(request: Request, response: Response): Promise<Response> {
        try {
            const perfumeId: number = parseInt(request.params.id as string);
            const perfume: Perfume = await this.perfumeService.getPerfumeById(perfumeId);
            return response.status(200).json(perfume);
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(500).json({ message: 'Failed to fetch perfume',  error: error.message });
        }
    }

    async getPerfumes(request: Request, response: Response): Promise<Response> {
        try {
            const sorted = request.query.sorted === 'true';
            const searchTerm = typeof request.query.searchTerm === 'string' ? request.query.searchTerm : '';

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
            if (error.code === "ER_DUP_ENTRY") {
                return response.status(400).json({message: 'Camera with this manufacturer already exists'});
            } else if (error instanceof BadRequestException) {
                return response.status(400).json({ message: error.message });
            } else if (error instanceof NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(500).json({ message: 'Failed to create perfume', error: error.message });
        }
    }

    async updatePerfume(request: Request, response: Response): Promise<Response> {
        try {
            const perfumeId: number = parseInt(request.params.id as string);
            const updatePerfumeDto = request.body as CreatePerfumeDto;
            const updatedPerfume = await this.perfumeService.updatePerfume(perfumeId, updatePerfumeDto);
            return response.status(200).json(updatedPerfume);
        } catch (error) {
            if (error instanceof BadRequestException) {
                return response.status(400).json({ message: error.message });
            } else if (error instanceof NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(500).json({ message: 'Failed to update perfume', error: error.message });
        }
    }

    async deletePerfume(request: Request, response: Response): Promise<Response> {
        try {
            const perfumeId: number = parseInt(request.params.id as string);
            const deletePerfume = await this.perfumeService.deletePerfume(perfumeId);
            return response.status(204).send(deletePerfume);
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(404).json({ message: error.message });
            }
            return response.status(500).json({ message: 'Failed to delete perfume', error: error.message });
        }
    }
}
