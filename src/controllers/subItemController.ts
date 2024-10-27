import { type Request, type Response } from "express";
import prismaClient from "../configs/prismaClient";

export class subItemController {
  static getAllSubItemsBudget = async (req: Request, res: Response) => {
    try {
      const { itemId } = req.params;

      const query = await prismaClient.subItem.findMany({
        where: {
          itemId: +itemId,
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

  static createSubItemBudget = async (req: Request, res: Response) => {
    try {
      const { itemId } = req.params;
      const data = req.body;

      const query = await prismaClient.subItem.create({
        data: {
          itemId: +itemId,
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

  static createSubItemsBudget = async (req: Request, res: Response) => {
    try {
      const data = req.body;

      const query = await prismaClient.subItem.createManyAndReturn({
        data
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

  static getSubItemBudget = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const query = await prismaClient.item.findUnique({
        where: {
          id: +id,
        },
      });

      if (!query) {
        const error = new Error("Sub categoria no encontrado.");
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
