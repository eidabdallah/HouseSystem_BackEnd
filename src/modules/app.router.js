import { connectDB } from '../../DB/connection.js';
import cors from 'cors';
import { globalhandleError } from '../utils/AppError.js';
import { createAdmin } from '../utils/createAdmin.js';

export const initApp = async (app, express) => {
    await connectDB();
    await createAdmin();
    app.use(cors());
    app.use(express.json());
    app.get('/', (req, res) => {
        return res.status(200).json({ message: 'Welcome to the House System' });
    });
    app.use(globalhandleError);

    app.use('*', (req, res) => {
        return res.status(404).json({ message: 'Page Not Found' });
    });
};
