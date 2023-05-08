import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const authValidation = (req: Request, res: Response, next: NextFunction): void => {
	try {
		const token: string | undefined = req.header('authentication');
		const tokenData: JwtPayload | string = jwt.verify(token as string, process.env.JWT_SECRET as string);
		req.tokenData = tokenData as string;
		next();
	} catch (err) {
		console.log(err);
		res.status(409).json('Token validation error');
	}
};

export default authValidation;
