import { type Request, type Response, type NextFunction } from "express";
import prismaClient from "../configs/prismaClient";

export async function budgetExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { budgetId } = req.params;
    const budgetExist = await prismaClient.budget.findUnique({
      where: {
        id: +budgetId,
      },
    });
    if (!budgetExist) {
      const error = new Error("Presupuesto no encontrado.");
      res.status(404).json({ error: error.message });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}
