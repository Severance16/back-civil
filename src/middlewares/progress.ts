import { type Request, type Response, type NextFunction } from "express";
import prismaClient from "../configs/prismaClient";

export async function progressExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { progressId } = req.params;
    const progressExist = await prismaClient.progress.findUnique({
      where: {
        id: +progressId,
      },
    });
    if (!progressExist) {
      const error = new Error("  no encontrado.");
      res.status(404).json({ error: error.message });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}
