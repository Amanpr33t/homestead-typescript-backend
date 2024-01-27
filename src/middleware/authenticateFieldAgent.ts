import { Request, Response, NextFunction, Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import FieldAgentModel, { FieldAgentDocument } from '../models/fieldAgent';
import 'express-async-errors';

dotenv.config();

// This function is used to authenticate a field agent. The field agent is authenticated using an authentication token
const authenticateFieldAgent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ status: 'invalid_authentication' });
        }

        const token = authHeader.split(' ')[1];

        let payload: { fieldAgentId: string; email: string } | null = null;

        try {
            payload = jwt.verify(
                token,
                process.env.JWT_SECRET as string
            ) as { fieldAgentId: string; email: string };
        } catch (error) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ status: 'invalid_authentication' });
        }

        if (!payload || !payload.fieldAgentId) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ status: 'invalid_authentication' });
        }

        const fieldAgent = await FieldAgentModel.findOne({
            _id: payload.fieldAgentId,
        });

        if (!fieldAgent) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ status: 'invalid_authentication' });
        }

        if (
            fieldAgent.authTokenExpiration &&
            fieldAgent.authTokenExpiration < new Date()
        ) {
            await FieldAgentModel.findOneAndUpdate(
                { _id: payload.fieldAgentId },
                { authTokenExpiration: null },
                { new: true, runValidators: true }
            );

            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ status: 'invalid_authentication' });
        }

        (req as any).fieldAgent = fieldAgent as FieldAgentDocument
        next();
    } catch (error) {
        next(error);
    }
};
;

export default authenticateFieldAgent;
