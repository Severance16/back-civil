import { type Request, type Response } from "express";
import prismaClient from "../configs/prismaClient";

export class misahpController {
  static getAllMishaps = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params
      const query = await prismaClient.mishap.findMany({
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

  static createMishap = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params
      const data = req.body
      const query = await prismaClient.mishap.create({
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

  static getMishap = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const query = await prismaClient.mishap.findUnique({
        where: {
          id: +id
        }
      })
      if (!query) {
        const error = new Error("Percance no encontrado.")
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
  
  static updateMishap = async (req: Request, res: Response) => {
    try {
      const { mishapId } = req.params
      const data = req.body
      const query = await prismaClient.mishap.update({
        where: {
          id: +mishapId
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
  
  static deleteMishap = async (req: Request, res: Response) => {
    try {
      const { mishapId } = req.params
      const query = await prismaClient.mishap.delete({
        where: {
          id: +mishapId
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
