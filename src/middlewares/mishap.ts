import { type Request, type Response, type NextFunction } from "express";
import prismaClient from "../configs/prismaClient";

export async function mishapExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { mishapId } = req.params;
    const mishapExist = await prismaClient.mishap.findUnique({
      where: {
        id: +mishapId,
      },
    });
    if (!mishapExist) {
      const error = new Error("Percance no encontrado.");
      res.status(404).json({ error: error.message });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}
