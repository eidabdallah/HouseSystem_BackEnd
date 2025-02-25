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
        console.log('✅ Database connected successfully...');

        await sequelize.sync();
        console.log('✅ Tables synchronized successfully...');
    } catch (error) {
        console.error('❌ Error connecting to the database:', error || error.message);
    }
};
