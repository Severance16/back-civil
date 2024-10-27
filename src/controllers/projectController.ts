import { type Request, type Response } from "express";
import prismaClient from "../configs/prismaClient";

export class projectController {
  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const { id } = req.user;
      const query = await prismaClient.project.findMany({
        where: {
          OR: [
            { ingResidentId: id }, // Condición de residente
            { usersProjects: { some: { userId: id } } }, // Condición de permisos
          ],
        },
      });
      res.json(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };
  static getProject = async (req: Request, res: Response) => {
    try {
      const { id: projectId } = req.params;
      const { id: userId } = req.user;

      const project = await prismaClient.project.findUnique({
        where: {
          id: +projectId,
        },
      });
      if (!project) {
        const error = new Error("Proyecto no encontrado.");
        res.status(404).json({ error: error.message });
        return;
      }

      const permission = await prismaClient.userProject.findFirst({
        where: {
          AND: [{ projectId: +projectId }, { userId: userId }],
        },
      });
      if (project.ingResidentId !== userId && !permission) {
        const error = new Error("No puedes realizar esta acción.");
        res.status(403).json({ error: error.message });
        return;
      }

      res.json(project);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };

  static createProyect = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.user;
      const data = req.body;

      const query = await prismaClient.project.create({
        data: {
          ...data,
          ingResidentId: userId,
        },
      });

      res.send(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };

  static addPermission = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.user;
      const { projectId, email } = req.body;

      const [project, user] = await Promise.all([
        prismaClient.project.findUnique({
          where: {
            id: projectId,
          },
        }),
        prismaClient.user.findUnique({
          where: {
            email,
          },
        }),
      ]);

      if (!project) {
        const error = new Error("Proyecto no encontrado.");
        res.status(404).json({ error: error.message });
        return;
      }
      if (project.ingResidentId !== userId) {
        const error = new Error("No puedes relizar esta acción.");
        res.status(403).json({ error: error.message });
        return;
      }
      if (!user) {
        const error = new Error("Usuario no encontrado.");
        res.status(404).json({ error: error.message });
        return;
      }

      await prismaClient.userProject.create({
        data: {
          projectId: project.id,
          userId: user.id
        }
      })
      res.send("Autorización asignada")
    } catch (error) {
      console.log(error.message)
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };
}
