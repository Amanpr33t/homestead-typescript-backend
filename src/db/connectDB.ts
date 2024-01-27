import mongoose from "mongoose"
import CustomAPIError from "../errors/custom-error"
import { StatusCodes } from 'http-status-codes';
import 'express-async-errors';

//This function is used to connect to the MongoDB database 
const connectDB = (connectionString: string | undefined) => {
      if (typeof connectionString === 'string') {
            return mongoose.connect(connectionString)
      }
      throw new CustomAPIError('No conection string provided', StatusCodes.BAD_REQUEST)
}


export default connectDB