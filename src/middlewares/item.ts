import { type Request, type Response, type NextFunction } from "express";
import prismaClient from "../configs/prismaClient";

export async function itemExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { itemId } = req.params;

    const itemExist = await prismaClient.item.findMany({
      where: {
        id: +itemId,
      },
    });
    if (!itemExist) {
      const error = new Error("Categoria no encontrado.");
      res.status(404).json({ error: error.message });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}
