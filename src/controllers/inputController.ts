import { type Request, type Response } from "express";
import prismaClient from "../configs/prismaClient";

export class inputController {
  static getAllInputs = async (req: Request, res: Response) => {
    try {
      const { inventoryId } = req.params;
      const query = await prismaClient.input.findMany({
        where: {
          inventoryId: +inventoryId,
        },
      });
      res.json(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };
  
  static createInput = async (req: Request, res: Response) => {
    try {
      const { inventoryId } = req.params;
      const data = req.body
      const query = await prismaClient.input.create({
        data: {
          inventoryId: +inventoryId,
          ...data
        },
      });
      res.json(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };
  
  static getInput = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const query = await prismaClient.input.findUnique({
        where: {
          id: +id
        }
      });
      if (!query) {
        const error = new Error("Insumo no encontrado.")
        res.status(404).json({error: error.message})
        return
      }
      res.json(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };

  static updateInput = async (req: Request, res: Response) => {
    try {
      const { inputId } = req.params;
      const data = req.body
      const query = await prismaClient.input.update({
        where: {
          id: +inputId
        },
        data
      });
      res.json(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };
}