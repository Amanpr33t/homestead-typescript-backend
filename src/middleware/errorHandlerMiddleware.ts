import { NextFunction, Request, Response, } from "express";
import CustomAPIError from '../errors/custom-error'
import 'express-async-errors';

//The middleware function handles all the errors
const errorHandlerMiddleware = (err: CustomAPIError | any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(500).json({ msg: 'Something went wrong' })
}

export default errorHandlerMiddleware