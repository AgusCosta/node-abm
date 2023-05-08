import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import databaseConnect from './mongo-db';

databaseConnect;

import userRoutes from './routes/user';
import authRoutes from './routes/auth';

declare global {
	namespace Express {
		interface Request {
			tokenData: string;
		}
	}
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/files', express.static(path.join('files')));

//HEADERS
app.use((req: Request, res: Response, next: NextFunction) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authentication');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
	next();
});

app.use('/user', userRoutes);
app.use('/auth', authRoutes);

export default app;
