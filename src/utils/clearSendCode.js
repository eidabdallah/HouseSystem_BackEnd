import cron from 'node-cron';
import passwordResetCode from '../../DB/model/passwordResetCode.js';

const cleanupExpiredCodes = () => {
    cron.schedule('0 */3 * * *', async () => {
        console.log('🚀 Running cleanup task...');
        try {
            await passwordResetCode.destroy({ truncate: true });
        } catch (error) {
            console.error('Error during cleanup:', error);
        }

        console.log('✅ Cleanup task completed.');
    });
};

export default cleanupExpiredCodes;
