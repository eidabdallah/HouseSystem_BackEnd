import cron from 'node-cron';
import passwordResetCode from '../../DB/model/passwordResetCode.model.js';

const cleanupExpiredCodes = () => {
    cron.schedule('0 */3 * * *', async () => {
        try {
            await passwordResetCode.destroy({ truncate: true });
        } catch (error) {
            console.error('Error during cleanup:', error);
        }
    });
};

export default cleanupExpiredCodes;
