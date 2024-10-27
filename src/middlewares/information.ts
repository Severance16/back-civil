import { type Request, type Response, type NextFunction } from "express";
import prismaClient from "../configs/prismaClient";

export async function informationExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { informationId } = req.params;
    const informationExist = await prismaClient.information.findUnique({
      where: {
        id: +informationId,
      },
    });
    if (!informationExist) {
      const error = new Error("Informe no encontrado.");
      res.status(404).json({ error: error.message });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}
