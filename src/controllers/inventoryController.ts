import { type Request, type Response } from "express";
import prismaClient from "../configs/prismaClient";

export class inventoryController {
  static getInventory = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const query = await prismaClient.inventory.findUnique({
        where: {
          projectId: +projectId,
        },
      });
      if (!query) {
        const error = new Error("Inventario no encontrado.")
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

  static createInventory = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const query = await prismaClient.inventory.create({
        data: {
          projectId: +projectId,
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
  
  static getAllInventory = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const query = await prismaClient.inventory.findMany({
        where: {
          projectId: +projectId,
        },
        include: {
          inputs: true,
          tools: true,
        }
      });
      res.json(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };
  
  static getInventoryTools = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const query = await prismaClient.inventory.findMany({
        where: {
          projectId: +projectId,
        },
        include: {
          tools: true,
        }
      });
      res.json(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };
  
  static getInventoryInputs = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const query = await prismaClient.inventory.findMany({
        where: {
          projectId: +projectId,
        },
        include: {
          tools: true,
        }
      });
      res.json(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };
}
