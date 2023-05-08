import { Schema, model } from 'mongoose';

export interface UserInterface {
	_id?: string;
	username?: string;
	password?: string;
	firstName: string;
	lastName: string;
	address: string;
	profilePic?: string | File;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema: Schema = new Schema<UserInterface>(
	{
		username: { type: String },
		password: { type: String, select: false },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		address: { type: String, required: true },
		profilePic: { type: String },
	},
	{ timestamps: true, versionKey: false }
);

const User = model<UserInterface>('User', UserSchema);

export default User;
