import {Router} from "express";
import { PerfumeController } from "../controllers/PerfumeController";
import { PerfumeService } from "../services/PerfumeService";
import {Perfume} from "../entities/Perfume";
import {AppDataSource} from "../dataSource";

const router = Router();
const perfumeRepository = AppDataSource.getRepository(Perfume);

const perfumeService = new PerfumeService(perfumeRepository);
const perfumeController = new PerfumeController(perfumeService);

router.get("/get-all", perfumeController.getPerfumes.bind(perfumeController));
router.get("/:id", perfumeController.getPerfumeById.bind(perfumeController));
router.post("", perfumeController.createPerfume.bind(perfumeController));
router.put("/:id", perfumeController.updatePerfume.bind(perfumeController));
router.delete("/:id", perfumeController.deletePerfume.bind(perfumeController));
router.get("/sort-by-name", perfumeController.sortPerfumesByName.bind(perfumeController));
router.get("/sort-by-price", perfumeController.sortPerfumesByPrice.bind(perfumeController));


export default router;
