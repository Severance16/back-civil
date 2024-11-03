import { type Request, type Response, type NextFunction } from "express";
import prismaClient from "../configs/prismaClient";

export async function inventoryExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { inventoryId } = req.params;
    const inventoryExist = await prismaClient.inventory.findUnique({
      where: {
        id: +inventoryId,
      },
    });
    if (!inventoryExist) {
      const error = new Error("Inventario no encontrada.");
      res.status(404).json({ error: error.message });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}
