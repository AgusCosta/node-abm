import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/user';

const databaseConnect = () => {
	mongoose
		.connect(process.env.MONGO_DB_URI as string)
		.then(() => {
			console.log('Connected to DB');
			User.countDocuments()
				.lean()
				.then((user) => {
					if (user) return;

					const adminPass: string = 'adminPass123';

					bcrypt.hash(adminPass, 5).then((hashedPass) => {
						const adminUser = new User({
							username: 'admin',
							password: hashedPass,
							firstName: 'adminFirstName',
							lastName: 'adminLastName',
							address: 'adminAddress',
						});

						adminUser.save().then(() => console.log('Admin user saved => user: admin, pass: ' + adminPass));
					});
				});
		})
		.catch((err) => console.log(err));
};

export default databaseConnect();
