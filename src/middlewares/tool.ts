import { type Request, type Response, type NextFunction } from "express";
import prismaClient from "../configs/prismaClient";

export async function toolExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { toolId } = req.params;
    const toolExist = await prismaClient.tool.findUnique({
      where: {
        id: +toolId,
      },
    });
    if (!toolExist) {
      const error = new Error("Herramienta no encontrada.");
      res.status(404).json({ error: error.message });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}
