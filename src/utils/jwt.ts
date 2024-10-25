import jwt from 'jsonwebtoken'

type Payload = {
    id: number
}

export const generateJWT = (userId: Payload): string => {
    return jwt.sign(userId, process.env.JWT_SECRECT, { expiresIn: "180d" })
}