import express, { Request, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/user';

const authRoutes = express.Router();

authRoutes.post('', (req: Request, res: Response, next: NextFunction) => {
	const loginData: { username: string; password: string } = req.body;

	const jwtSecret: string = process.env.JWT_SECRET as string;

	User.findOne({ username: new RegExp('\\b' + loginData.username + '\\b', 'i') })
		.select('+password')
		.lean()
		.then((user) => {
			if (!user) return res.status(409).json('Wrong password or user not registered');

			bcrypt.compare(loginData.password, user.password as string).then((validPass) => {
				if (!validPass) return res.status(409).json('Wrong password or user not registered');

				const tokenData = { user: user._id };
				const token = jwt.sign(tokenData, jwtSecret);
				return res.status(200).json({ token: token });
			});
		})
		.catch((err) => {
			console.log(err);
			return res.status(409).json('Wrong password or user not registered');
		});
});

export default authRoutes;
