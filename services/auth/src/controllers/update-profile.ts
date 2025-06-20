import { Response} from "express";
import { updateProfileSchema } from "../schema";
import UserService from "../services";
import { CustomRequest } from "../utils/customReq";


const updateProfile = async (
    req: CustomRequest,
    res: Response
) => {
    try {
        // Validate the request body
        const parseBody = updateProfileSchema.safeParse(req.body);

        if(!parseBody.success) {
            res.status(400).json({
                Success: false,
                Message: 'Invalid request body',
                Data: {},
                Error: parseBody.error.errors
            });
            return;
        }


        await UserService.updateProfile(
            {
                name: parseBody.data.name,
                req
            }
        );


        res.status(201).json({
            Success: true,
            Message: 'You\'ve successfully update your profile',
            Data: {},
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

export default updateProfile;