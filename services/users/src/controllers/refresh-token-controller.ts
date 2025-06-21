import { Request, Response } from "express";
import { accessTokenFunc, refreshTokenFunv, verifyRefreshToken } from "../utils/jwt";


const refresh = async (
    req: Request,
    res: Response,
) => {
    try {
        // Validate the request body
        const token = req.cookies['token'];

        if(!token) {
            res.status(403).json({
                Success: false,
                Message: 'Refresh token doesn\'t exist',
                Data: {},
                Error: {}
            });
            return;
        }

        const verifyToken = verifyRefreshToken(token);

        if(!verifyToken) {
            res.status(403).json({
                Success: false,
                Message: 'Invalid refresh token. Please login',
                Data: {},
                Error: {}
            });
            return;
        }

        const accessToken = accessTokenFunc(verifyToken.id);
        refreshTokenFunv(verifyToken.id, res);

        res.status(200).json({
            Success: true,
            Message: 'Successfully access token created',
            Data: accessToken,
            Error: {}
        });

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

export default refresh;