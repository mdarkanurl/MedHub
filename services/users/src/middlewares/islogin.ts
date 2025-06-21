import { Response, NextFunction } from "express";
import { config } from "dotenv";
import { CustomRequest } from "../utils/customReq";
import { verifyAccessToken } from "../utils/jwt";
config();

const isLogin = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const tokenWithBearer = req.headers['authorization'];
        const token = tokenWithBearer?.split(' ')[1];

        if(!token) {
            res.status(403).json({
                Success: false,
                Message: 'Access token doesn\'t exist',
                Data: {},
                Error: {}
            });
            return;
        }

        const verifyToken = verifyAccessToken(token);

        if(!verifyToken) {
            res.status(400).json({
                Success: false,
                Message: 'Invalid access token',
                Data: {},
                Error: {}
            });
            return;
        }
        req.userId = verifyToken.id;

        next();
    } catch (error: Error | any) {
        res
            .status(error.statusCode || 500)
            .json({
                Success: false,
                Message: error?.message,
                Data: {},
                Error: { ...error }
            });
    }
}

export default isLogin;