import { type Request, type Response } from "express";
import prismaClient from "../configs/prismaClient";

export class noteController {
  static createNote = async (req: Request, res: Response) => {
    const data = req.body;
    if (data.toolId) {
      try {
        const toolExist = await prismaClient.tool.findUnique({
          where: {
            id: data.toolId,
          },
        });
        if (!toolExist) {
          const error = new Error("Herramienta no encontrada.");
          res.status(404).json({ error: error.message });
          return;
        }

        const updateTool = prismaClient.tool.update({
          where: {
            id: data.toolId,
          },
          data: {
            quantity:
              data.type === "Ingreso"
                ? toolExist.quantity + data.quantity
                : toolExist.quantity - data.quantity,
          },
        });
        const createNote = prismaClient.note.create({
          data,
        });

        const [updatedTool, note] = await Promise.all([updateTool, createNote]);
        res.status(201).json({tool: updatedTool, note: note});
      } catch (error) {
        res.status(500).json({
          message: "Hubo un error.",
          error: error.message,
        });
      }
    } else if (data.inputId) {
      const data = req.body;
      if (data.inputId) {
        try {
          const inputExist = await prismaClient.input.findUnique({
            where: {
              id: data.inputId,
            },
          });
          if (!inputExist) {
            const error = new Error("Insumo no encontrado.");
            res.status(404).json({ error: error.message });
            return;
          }

          const updateInput = prismaClient.input.update({
            where: {
              id: data.inputId,
            },
            data: {
              quantity:
                data.type === "Ingreso"
                  ? inputExist.quantity + data.quantity
                  : inputExist.quantity - data.quantity,
            },
          });
          const createNote = prismaClient.note.create({
            data,
          });

          const [inputUpdated, note] = await Promise.all([updateInput, createNote]);
          res.status(201).json({input: inputUpdated, note});
        } catch (error) {
          res.status(500).json({
            message: "Hubo un error.",
            error: error.message,
          });
        }
      } else {
        const error = new Error("Revisa tu nota, algo falta.");
        res.status(409).send(error.message);
      }
    }
  };

  static getNote = async (req: Request, res: Response) => {
    try {
      const { noteId } = req.params;
      const query = await prismaClient.note.findUnique({
        where: {
          id: +noteId,
        },
      });
      if (!query) {
        const error = new Error("Nota no encontrada.");
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

  static deleteNote = async (req: Request, res: Response) => {
    try {
      const { noteId } = req.params

      const noteExist = await prismaClient.note.findUnique({
        where: {
          id: +noteId
        }
      })
      if (!noteExist) {
        const error = new Error("Nota no encontrada.");
        res.status(404).json({ error: error.message });
        return;
      }

      const deleteNote = prismaClient.note.delete({
        where:{
          id: noteExist.id
        }
      })
      let quantity
      if (noteExist.inputId) {
        const input = await prismaClient.input.findUnique({ where: { id: noteExist.inputId }})
        quantity = prismaClient.input.update({
          where: {
            id: noteExist.id
          },
          data: {
            quantity: noteExist.type === "Ingreso" ? input.quantity - noteExist.quantity : input.quantity + noteExist.quantity
          }
        })
      }else{
        const tool = await prismaClient.tool.findUnique({ where: { id: noteExist.toolId }})
        quantity = prismaClient.tool.update({
          where: {
            id: noteExist.id
          },
          data: {
            quantity: noteExist.type === "Ingreso" ? tool.quantity - noteExist.quantity : tool.quantity + noteExist.quantity
          }
        })
      }

      const query = await Promise.all([deleteNote, quantity])
      res.json(query)
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  };

  static getNotesByToolId  = async (req: Request, res: Response) => {
    try {
      const { toolId } = req.params
      
      const query = await prismaClient.note.findMany({
        where: {
          toolId: +toolId
        }
      })
      res.json(query)
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  }

  static getNotesByInputId  = async (req: Request, res: Response) => {
    try {
      const { inputId } = req.params

      const query = await prismaClient.note.findMany({
        where: {
          inputId: +inputId
        }
      })
      res.json(query)
    } catch (error) {
      res.status(500).json({
        message: "Hubo un error.",
        error: error.message,
      });
    }
  }
}
