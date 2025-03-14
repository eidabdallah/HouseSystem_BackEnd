import cron from 'node-cron';
import userModel from '../../DB/model/user.model.js';

const deleteUnconfirmedAccounts = () => {
    cron.schedule('0 0 */21 * *', async () => {
        try {
            await userModel.destroy({
                where: { confirmEmail: false }
            });
        } catch (error) {
            console.error('Error during cleanup:', error);
        }
    });
};

export default deleteUnconfirmedAccounts;
