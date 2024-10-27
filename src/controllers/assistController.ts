import { type Request, type Response } from "express";
import prismaClient from "../configs/prismaClient";

export class assistController {
  static getAllAssists = async (req: Request, res: Response) => {
    try {
      const { informationId } = req.params;

      const query = await prismaClient.assist.findMany({
        where: {
          informationId: +informationId,
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

  static createAssist = async (req: Request, res: Response) => {
    try {
      const { informationId } = req.params;
      const data = req.body
      const query = await prismaClient.assist.create({
        data: {
          ...data,
          informationId: +informationId
        }
      })
      res.status(201).json(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };

  static getAssist = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const query = await prismaClient.assist.findUnique({
        where: {
          id: +id
        }
      })
      if (!query) {
        const error = new Error("Asistencia no encontrada.");
        res.status(404).json({ error: error.message });
        return;
      }
      res.json(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };

  static createAssists = async (req: Request, res: Response) => {
    try {
      const data = req.body

      const query = await prismaClient.assist.createManyAndReturn({
        data
      })
      res.status(201).json(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };

  static updateAssist = async (req: Request, res: Response) => {
    try {
      const { assistId } = req.params
      const data = req.body
      const query = await prismaClient.assist.update({
        data,
        where: {
          id: +assistId
        }
      })
      res.json(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };

  static deleteAssist = async (req: Request, res: Response) => {
    try {
      const { assistId } = req.params
      const query = await prismaClient.assist.delete({
        where: {
          id: +assistId
        }
      })
      res.json(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };
}
