import { StatusCodes } from 'http-status-codes';
import express, { NextFunction, Request, Response } from 'express';
import FieldAgentModel, { FieldAgentDocument } from '../../models/fieldAgent';
import CustomAPIError from '../../errors/custom-error';
import validator from 'validator';
import 'express-async-errors';

// The function is used to sign in a field agent
interface RequestBody {
    email: string;
    password: string;
}

const signIn = async (req: Request<any, any, RequestBody>, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new CustomAPIError('Please enter email and password ', StatusCodes.NO_CONTENT);
        }

        if (!validator.isEmail(email)) {
            throw new CustomAPIError('Please enter a valid email', StatusCodes.BAD_REQUEST);
        }

        if (password.length > 10 || password.length < 6) {
            throw new CustomAPIError('Please enter a valid password', StatusCodes.BAD_REQUEST);
        }

        const fieldAgent = await FieldAgentModel.findOne({ email });

        if (!fieldAgent) {
            return res.status(StatusCodes.OK).json({ status: 'not_found', msg: 'Enter valid credentials' });
        }

        const isPasswordCorrect = fieldAgent && (await fieldAgent.comparePassword(password));

        if (!isPasswordCorrect) {
            return res.status(StatusCodes.OK).json({ status: 'incorrect_password', msg: 'Enter valid credentials' });
        }

        const authToken = fieldAgent.createJWT();
        const oneDay = 1000 * 60 * 60 * 24;

        await FieldAgentModel.findOneAndUpdate(
            { email },
            { authTokenExpiration: Date.now() + oneDay },
            { new: true, runValidators: true }
        );

        return res.status(StatusCodes.OK).json({ status: 'ok', authToken });
    } catch (error) {
        console.error(error);
        next(error);
    }
};


// The function runs when a field agent logs out
const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fieldAgentId = (req as any).fieldAgent?._id;

        if (!fieldAgentId) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ status: 'invalid_authentication' });
        }

        await FieldAgentModel.findOneAndUpdate(
            { _id: fieldAgentId },
            { authTokenExpiration: null },
            { new: true, runValidators: true }
        );

        return res.status(StatusCodes.OK).json({ status: 'ok', msg: 'Successfully logged out' });
    } catch (error) {
        next(error);
    }
};

// To be deleted
const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ status: 'noEmailPassword', msg: 'Please enter email and password' });
        }

        if (!validator.isEmail(email)) {
            throw new CustomAPIError('Please enter a valid email', StatusCodes.BAD_REQUEST);
        }

        const emailExists = await FieldAgentModel.findOne({ email });

        if (emailExists) {
            return res.status(StatusCodes.BAD_REQUEST).json({ status: 'emailExists', msg: 'Email already exists' });
        }

        const fieldAgent = await FieldAgentModel.create({ email, password });
        const authToken = fieldAgent.createJWT();

        return res.status(StatusCodes.CREATED).json({ status: 'ok', msg: 'Account has been created', authToken });
    } catch (error) {
        next(error);
    }
};

export { signIn, logout, signup };
