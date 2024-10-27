import { type Request, type Response } from "express";
import prismaClient from "../configs/prismaClient";

export class budgetController {
  static getAllBudgets = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;

      const query = await prismaClient.budget.findMany({
        where: {
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

  static createBudget = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const { type } = req.body;

      const query = await prismaClient.budget.create({
        data: {
          projectId: +projectId,
          type,
        },
      });
      res.status(201).json(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };

  static getBudget = async (req: Request, res: Response) => {
    try {
      const { budgetId } = req.params;

      const query = await prismaClient.budget.findUnique({
        where: {
          id: +budgetId,
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
}
