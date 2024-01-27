import 'express-async-errors';
//Custom error to handles errors
class CustomAPIError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export default CustomAPIError 