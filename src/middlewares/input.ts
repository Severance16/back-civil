import { type Request, type Response, type NextFunction } from "express";
import prismaClient from "../configs/prismaClient";

export async function inputExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { inputId } = req.params;
    const inputExist = await prismaClient.input.findUnique({
      where: {
        id: +inputId,
      },
    });
    if (!inputExist) {
      const error = new Error("Insumo no encontrado.");
      res.status(404).json({ error: error.message });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}
