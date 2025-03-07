import { connectDB } from '../../DB/connection.js';
import cors from 'cors';
import { globalhandleError } from '../utils/AppError.js';
import authRouter from '../modules/auth/auth.router.js';
import userRouter from '../modules/user/user.router.js';
import adminRouter from '../modules/admin/admin.router.js';
import houseRouter from '../modules/house/house.router.js';
import { setupApp } from './setupApp.js';
export const initApp = async (app, express) => {
    await connectDB();
    await setupApp();
    app.use(cors());
    app.use(express.json());
    app.get('/', (req, res) => {
        return res.status(200).json({ message: 'Welcome to the House System' });
    });
    app.use('/auth' , authRouter);
    app.use('/user' , userRouter);
    app.use('/admin' , adminRouter);
    app.use('/house' , houseRouter);
    app.use(globalhandleError);

    app.use('*', (req, res) => {
        return res.status(404).json({ message: 'Page Not Found' });
    });
};
