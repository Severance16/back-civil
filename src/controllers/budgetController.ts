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
        select: {
          type: true,
          id: true,
        },
      });

      const response = {
        Inicial: {
          exist: query.some((budget) => budget.type === "Inicial"),
          id: query.find((budget) => budget.type === "Inicial")?.id || null,
        },
        Final: {
          exist: query.some((budget) => budget.type === "Final"),
          id: query.find((budget) => budget.type === "Final")?.id || null,
        },
      };
      res.json(response);
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
      const { id } = req.params;

      const query = await prismaClient.budget.findUnique({
        where: {
          id: +id,
        },
      });
      if (!query) {
        const error = new Error("Presupuesto no encontrado.");
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

  static getTotalBudget = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;

      const query = await prismaClient.budget.findMany({
        where: {
          projectId: +projectId,
        },
        include: {
          items: {
            select:{
              subItems: {
                select:{
                  amount:true,
                  quantity: true
                }
              }
            },
          },
        },
      });
      if (!query) {
        const error = new Error("Presupuesto no encontrado.");
        res.status(404).json({ error: error.message });
        return;
      }
      let sumInicial = 0
      let sumFinal = 0 
      query.forEach((item) => {
        if (item.items.length > 0) {
          if (item.items[0].subItems.length > 0) {
            if (item.type === "Inicial") {
              let sumaSubItems = 0
              item.items.forEach( subItem => {
                const totalSubitems = subItem.subItems.reduce((itemTotal, subItem) => {
                  return itemTotal + ( subItem.amount * subItem.quantity )
                }, 0)
                sumaSubItems += totalSubitems
              })
              sumInicial = sumaSubItems
            }
            if (item.type === "Final") {
              let sumaSubItems = 0
              item.items.forEach( subItem => {
                const totalSubitems = subItem.subItems.reduce((itemTotal, subItem) => {
                  return itemTotal + ( subItem.amount * subItem.quantity )
                }, 0)
                sumaSubItems += totalSubitems
              })
              sumFinal = sumaSubItems
            }
          }
          
        }
      })
      res.json({
        inicial: sumInicial,
        final: sumFinal
      });
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };
}
