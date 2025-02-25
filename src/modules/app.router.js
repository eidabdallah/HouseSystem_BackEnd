import { connectDB } from '../../DB/connection.js';
import cors from 'cors';

export const initApp = async (app, express) => {
    await connectDB();
    app.use(cors());
    app.use(express.json());

    app.get('/', (req, res) => {
        return res.status(200).json({ message: 'Welcome to the House System app' });
    });

    app.use('*', (req, res) => {
        return res.status(404).json({ message: 'Page Not Found' });
    });
};
