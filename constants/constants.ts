import multer, { StorageEngine } from 'multer';
import { Request } from 'express';

const VALID_MIME_TYPES = {
	'image/jpeg': '.jpeg',
};

export const profilePicStorage: StorageEngine = multer.diskStorage({
	destination: (req: Request, file: Express.Multer.File, cb) => {
		let error = null;

		const validType = VALID_MIME_TYPES[file.mimetype as keyof typeof VALID_MIME_TYPES];
		if (!validType) error = new Error('Valid file types are jpeg and jpg');

		cb(null, 'files/profile-pics');
	},
	filename: (req: Request, file: Express.Multer.File, cb) => cb(null, Date.now() + '.jpeg'),
});
