import { Router } from "express";
import { projectController } from "../controllers/projectController";
import { authenticate } from "../middlewares/auth";

const router = Router()

router.use(authenticate)

router.get('/', projectController.getAllProjects)
router.get('/:id', projectController.getProject)
router.post('/', projectController.createProyect)

export default router
