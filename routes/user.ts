import express from 'express';
import User, { UserInterface } from '../models/user';
import { Request, Response, NextFunction } from 'express';
import authValidation from '../middlewares/validate-authentication';
import fs from 'fs';
import multer from 'multer';
import { profilePicStorage } from '../constants/constants';

const userRoutes = express.Router();

const multerStorage = multer({ storage: profilePicStorage }).single('profilePic');

//GET USER LIST
userRoutes.get('', (req: Request, res: Response, next: NextFunction) => {
	User.find()
		.then((users: UserInterface[]) => res.status(200).json(users))
		.catch((err) => {
			console.log(err);
			return res.status(409).json('Error getting user list');
		});
});

//CREATE USER
userRoutes.post('', authValidation, multerStorage, (req: Request, res: Response, next: NextFunction) => {
	const userData: UserInterface = req.body;
	const newUser = new User({ ...userData });

	if (req.file) newUser.profilePic = renameProfilePic(newUser._id, req.file.path);

	newUser
		.save()
		.then(() => res.status(200).json(newUser))
		.catch((err) => {
			console.log(err);
			return res.status(409).json('Error saving user');
		});
});

//UPDATE USER
userRoutes.put('', authValidation, multerStorage, (req: Request, res: Response, next: NextFunction) => {
	const userData: UserInterface = req.body;

	if (!userData._id) return res.status(409).json('User ID is required');

	const updatedUser = new User({ ...userData });

	if (req.file) {
		const fileRoute: string = `files/profile-pics/${updatedUser._id}.jpeg`;
		fs.unlinkSync(fileRoute);
		updatedUser.profilePic = renameProfilePic(updatedUser._id, req.file.path);
	}

	User.updateOne({ _id: userData._id }, updatedUser)
		.then(() => res.status(200).json(updatedUser))
		.catch((err) => {
			console.log(err);
			return res.status(409).json('Error updating user');
		});
});

function renameProfilePic(userId: string, filePath: string): string {
	const profilePicPath: string = filePath;
	const profilePicPathParts: string[] = profilePicPath.split('/');
	profilePicPathParts[profilePicPathParts.length - 1] = `${userId}.jpeg`;
	const newProfilePicPath: string = profilePicPathParts.join('/');
	fs.renameSync(profilePicPath, newProfilePicPath);

	return newProfilePicPath;
}

export default userRoutes;
