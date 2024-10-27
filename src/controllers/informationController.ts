import { type Request, type Response } from "express";
import prismaClient from "../configs/prismaClient";

export class informationController {
  static getAllInformations = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;

      const projectExist = await prismaClient.project.findUnique({
        where: {
          id: +projectId
        }
      })
      if (!projectExist) {
        const error = new Error("Proyecto no encontrado.")
        res.status(404).json({error: error.message})
        return
      }

      const query = await prismaClient.information.findMany({
        where: {
          projectId: +projectId
        }
      })
      res.json(query)
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };

  static createInformation = async (req: Request, res: Response) => {
    try {
      const { projectId } = req.params;
      const data = req.body;

      const projectExist = await prismaClient.project.findUnique({
        where: {
          id: +projectId
        }
      })
      if (!projectExist) {
        const error = new Error("Proyecto no encontrado.")
        res.status(404).json({error: error.message})
        return
      }

      const query = await prismaClient.information.create({
        data: {
          projectId: +projectId,
          ...data,
        },
      });
      res.status(201).json(query);
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };

  static getInformation = async (req: Request, res: Response) => {
    try {
      const { informationId } = req.params
      const query = await prismaClient.information.findUnique({
        where: {
          id: +informationId
        }
      })
      res.json(query)
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };

  static updateInformation = async (req: Request, res: Response) => {
    try {
      const { informationId } = req.params
      const data = req.body

      const query = await prismaClient.information.update({
        where: {
          id: +informationId
        },
        data: {
          ...data
        }
      })
      res.status(404).json(query)
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };

  static deleteInformation = async (req: Request, res: Response) => {
    try {
      const { informationId } = req.params

      const query = await prismaClient.information.delete({
        where: {
          id: +informationId
        }
      })

      res.json(query)
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };
}
