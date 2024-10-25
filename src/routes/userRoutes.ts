import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router()

router.post('/create-user', UserController.createUser)
router.post('/login', UserController.loginUser)

export default router