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
        include: {
          subItems: {
            select: {
              quantity: true,
              amount: true,
              incidence: true,
            },
          },
        },
      });

      const response = query.map((item) => {
        if (item.subItems.length > 0) {
          return {
            budgetId: item.budgetId,
            id: item.id,
            description: item.description,
            amount: item.amount,
            incidence: item.incidence,
            valors: {
              total: item.subItems.reduce(
                (subItemTotal, subItem) =>
                  subItemTotal + subItem.quantity * subItem.amount,
                0
              ),
              incidence: item.subItems.reduce(
                (subItemTotal, subItem) => subItemTotal + subItem.incidence,
                0
              ),
            },
          };
        } else {
          return {
            budgetId: item.budgetId,
            id: item.id,
            description: item.description,
            amount: item.amount,
            incidence: item.incidence,
            valors: {
              total: 0,
              incidence: 0,
            },
          };
        }
      });

      res.json(response);
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

  static getItemBudgetAmount = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const query = await prismaClient.item.findUnique({
        where: {
          id: +id,
        },
        select: {
          subItems: {
            select: {
              quantity: true,
              amount: true,
              incidence: true,
            },
          },
        },
      });

      if (!query) {
        const error = new Error("Categoria no encontrado.");
        res.status(404).json({ error: error.message });
        return;
      }

      if (query.subItems.length > 0) {
        res.json({
          total: query.subItems.reduce(
            (subItemTotal, subItem) =>
              subItemTotal + subItem.quantity * subItem.amount,
            0
          ),
          incidence: query.subItems.reduce(
            (subItemTotal, subItem) => subItemTotal + subItem.incidence,
            0
          ),
        });
      } else {
        res.json({
          total: 0,
          incidence: 0,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };
}
