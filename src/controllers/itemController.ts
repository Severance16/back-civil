import { type Request, type Response } from "express";
import prismaClient from "../configs/prismaClient";

export class itemController {
  static getAllItemsBudget = async (req: Request, res: Response) => {
    try {
      const { budgetId } = req.params;

      const query = await prismaClient.item.findMany({
        where: {
          budgetId: +budgetId,
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

  static createItemBudget = async (req: Request, res: Response) => {
    try {
      const { budgetId } = req.params;
      const data = req.body;

      const query = await prismaClient.item.create({
        data: {
          budgetId: +budgetId,
          ...data,
        },
      });

      res.status(201).json(query);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };

  static getItemBudget = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const query = await prismaClient.item.findUnique({
        where: {
          id: +id,
        },
      });
      if (!query) {
        const error = new Error("Categoria no encontrado.");
        res.status(404).json({ error: error.message });
        return;
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
