import { type Request, type Response, type NextFunction} from "express"
import prismaClient from "../configs/prismaClient"

export async function projectExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { projectId } = req.params
        const project = await prismaClient.project.findUnique({
            where: {
                id: +projectId
            }
        })
        if (!project) {
            const error = new Error("Proyecto no encontrado.")
            return res.status(404).json({error: error.message})
        }
        next()
    } catch (error) {
        res.status(500).json({error: "Hubo un error"})
    }
}