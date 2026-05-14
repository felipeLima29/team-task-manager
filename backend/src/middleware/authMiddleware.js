import jwt from "jsonwebtoken";
import authConfig from "../config/auth.js";

export async function authMiddleware(req, res, next) {

    try {
        const authHeader = req.headers.authorization;;

        if(!authHeader) {
            return res.status(401).json({
                error: "Token não fornecido."
            });
        }

        const [, token] = authHeader.split(" ");
        const decoded = jwt.decode(token, authConfig.jwt.secret);

        req.userId = decoded.id;
        next();

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            error: "Token inválido."
        })
    }
    
}