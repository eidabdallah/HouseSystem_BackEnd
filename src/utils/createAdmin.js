import userModel from '../../DB/model/user.model.js';
import bcrypt from 'bcryptjs';

export const createAdmin = async () => {
    try {
        const adminExists = await userModel.findOne({ where: { role: 'Admin' } });
        if (!adminExists) {
            const adminPassword = bcrypt.hashSync(process.env.AdminPassword, parseInt(process.env.SALTROUND));

            await userModel.create({
                userName: "Admin",
                email: process.env.AdminEmail,
                password: adminPassword,
                phoneNumber: "0592306697",
                role: "Admin",
                status: "Active",
                confirmEmail: true,
            });
        }
    } catch (error) {
        console.error(error);
    }
};
