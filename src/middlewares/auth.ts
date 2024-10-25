import { Request, Response, NextFunction, json } from "express";
import jwt from 'jsonwebtoken'
import prismaClient from "../configs/prismaClient";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number
                name: string
                lastname: string
                email: string
            }
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization
    if (!bearer) {
        const error = new Error("No autorizado.")
        res.status(401).json({ error: error.message })
        return
    }

    const secretclave = process.env.JWT_SECRECT
    const [, token] = bearer.split(" ")

    try {
        const decoded = jwt.verify(token, secretclave)
        if (typeof decoded === "object" && decoded.id) {
            const user = await prismaClient.user.findUnique({
                select: {
                    id: true,
                    name: true,
                    lastname: true,
                    email: true
                },
                where: {
                    id: decoded.id
                }
            })

            if (user) {
                req.user = user
            } else {
                res.status(500).json({error: "Token no válido."})
            }
        }
    } catch (error) {
        res.status(500).json({ error: "Token no válido." })
    }
    next()
}