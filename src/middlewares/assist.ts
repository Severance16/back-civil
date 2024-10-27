import { type Request, type Response, type NextFunction } from "express";
import prismaClient from "../configs/prismaClient";

export async function assistExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { assistId } = req.params;
    const assistExist = await prismaClient.assist.findUnique({
      where: {
        id: +assistId,
      },
    });
    if (!assistExist) {
      const error = new Error("Asistencia no encontrada.");
      res.status(404).json({ error: error.message });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}
