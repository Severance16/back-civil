import { type Request, type Response } from "express";
import prismaClient from "../configs/prismaClient";

export class toolController {
  static getAllTools = async (req: Request, res: Response) => {
    try {
      const { inventoryId } = req.params;
      const query = await prismaClient.tool.findMany({
        where: {
          inventoryId: +inventoryId,
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
  
  static createTool = async (req: Request, res: Response) => {
    try {
      const { inventoryId } = req.params;
      const data = req.body
      const query = await prismaClient.tool.create({
        data: {
          inventoryId: +inventoryId,
          ...data
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
  
  static getTool = async (req: Request, res: Response) => {
    try {
      const { toolId } = req.params;
      const query = await prismaClient.tool.findUnique({
        where: {
          id: +toolId
        }
      });
      if (!query) {
        const error = new Error("Herramienta no encontrada.")
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
}