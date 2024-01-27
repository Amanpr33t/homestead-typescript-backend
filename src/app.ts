import express, { Express } from 'express';
import 'express-async-errors';
//import cloudinary from 'cloudinary';
import cors from 'cors';

import connectDB from './db/connectDB';
import notFound from './middleware/notFound';

import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';

import fieldAgentRouter from './routes/fieldAgentRouter';
//import propertyEvaluatorRouter from './routes/propertyEvaluatorRouter';
//import propertyDealerRouter from './routes/propertyDealerRouter';
//import customerRouter from './routes/customerRouter';

import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port: number = 3111;

// MongoDB connection
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI || '');
        app.listen(port, () => console.log(`Server running on port ${port}...`));
    } catch (error) {
        console.error(error);
    }
};
start();

// Cloudinary configuration
/*cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || '',
  api_key: process.env.CLOUD_API_KEY || '',
  api_secret: process.env.CLOUD_API_SECRET || '',
});*/

// Middleware
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS setup
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

// Routes
app.use('/field-agent', fieldAgentRouter);
//app.use('/property-evaluator', propertyEvaluatorRouter);
//app.use('/property-dealer', propertyDealerRouter);
//app.use('/customer', customerRouter);

// Not found and error handling middleware
app.use(notFound);
app.use(errorHandlerMiddleware);
