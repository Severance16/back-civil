import type { Request, Response } from 'express'
import prismaClient from '../configs/prismaClient'
import { checkPasswrod, hashPassword } from '../utils/auth'
import { generateJWT } from '../utils/jwt'

export class UserController {

    static loginUser = async (req: Request, res: Response) => {
        try {

            const { email, password } = req.body

            const user = await prismaClient.user.findUnique({
                where: {
                    email
                }
            })
            if (!user) {
                const error = new Error("Usuario no encontrado.")
                res.status(404).json({ error: error.message })
                return
            }

            const isPasswordCorrect = await checkPasswrod(password, user.password)
            if (!isPasswordCorrect) {
                const error = new Error("Contraseña incorrecta.")
                res.status(401).json({ error: error.message })
                return;
            }
            
            res.send(generateJWT({id: user.id}))
        } catch (error) {
            res.status(500).json({
                message: "Hubo un error.",
                error: error.message
            })
        }
    }

    static createUser = async (req: Request, res: Response) => {
        const data = req.body
        try {
            const userExist = await prismaClient.user.findUnique({
                where: {
                    email: data.email
                }
            })

            if (userExist) {
                const error = new Error("El usuario está registrado.")
                res.status(409).json({ error: error.message });
                return;
            }

            data.password = await hashPassword(data.password)
            const query = await prismaClient.user.create({ data })
            res.status(201).json(query)

        } catch (error) {
            res.status(500).json({
                message: "Error al crear el usuario.",
                error: error.message
            })
        }
    }
}