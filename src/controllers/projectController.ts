import type { Request, Response } from 'express'
import prismaClient from '../configs/prismaClient'


export class projectController {

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const { id } = req.user
            const query = await prismaClient.project.findMany({
                where: {
                    ingResidentId: id
                }
            })
            res.json(query)
        } catch (error) {
            res.status(500).json({
                message: "Hubo un error.",
                error: error.message
            })
        }
    }
    static getProject = async (req: Request, res: Response) => {
        try {
            const { id: projectId } = req.params
            const { id: userId } = req.user

            const project = await prismaClient.project.findUnique({
                where: {
                    id: +projectId
                }
            })
            if(!project) {
                const error = new Error("Proyecto no encontrado.")
                res.status(404).json({error: error.message})
                return
            }

            const permission = await prismaClient.userProject.findFirst({
                where: {
                    AND: [
                        {proyectId: +projectId},
                        {userId: userId}
                    ]
                }
            })

            console.log(!permission)
            console.log(userId)
            console.log(project.ingResidentId)
            console.log(project.ingResidentId !== userId || !permission)

            if(!(project.ingResidentId !== userId) || !permission) {
                const error = new Error("No puedes realizar esta acción.")
                res.status(403).json({error: error.message})
                return
            }

            res.json(project)
        } catch (error) {
            res.status(500).json({
                message: "Hubo un error.",
                error: error.message
            })
        }
    }
    static createProyect = async (req: Request, res: Response) => {
        res.send('Todos los usuarios')
    }
}