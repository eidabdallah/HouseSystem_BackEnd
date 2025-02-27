import { Sequelize } from 'sequelize';
import 'dotenv/config';

export const sequelize = new Sequelize("houseSystem", "root", '', {
    host: "localhost",
    dialect: 'mysql',
    logging: false,
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('✅ Database connected successfully...');

    } catch (error) {
        console.log('❌ Error connecting to the database');
    }
};
