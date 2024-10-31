import { type Request, type Response } from "express";
import prismaClient from "../configs/prismaClient";

export class progressController {
  static getAllProgress = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params
      const query = await prismaClient.progress.findMany({
        where: {
          projectId: +projectId
        }
      })
      res.json(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };

  static createProgress = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params
      const data = req.body
      const query = await prismaClient.progress.create({
        data:{
          projectId: +projectId,
          ...data
        }
      })
      res.send(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };

  static getProgress = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const query = await prismaClient.progress.findUnique({
        where: {
          id: +id
        }
      })
      if (!query) {
        const error = new Error("Avance no encontrado.")
        res.status(404).json({error: error.message})
        return
      }
      res.json(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };
  
  static updateProgress = async (req: Request, res: Response) => {
    try {
      const { progressId } = req.params
      const data = req.body
      const query = await prismaClient.progress.update({
        where: {
          id: +progressId
        },
        data: data
      })
      res.json(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };
  
  static deleteProgress = async (req: Request, res: Response) => {
    try {
      const { progressId } = req.params
      const query = await prismaClient.progress.delete({
        where: {
          id: +progressId
        }
      })
      res.json(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };
}
