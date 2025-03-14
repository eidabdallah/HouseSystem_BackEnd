import cron from 'node-cron';
import reservationModel from '../../DB/model/reservation.model.js';
import userModel from '../../DB/model/user.model.js';
import moment from 'moment';
import { Op } from 'sequelize';
import { sendEmail } from './sendEmail.js';

const sendReminderForExpiringReservations = () => {
    cron.schedule('0 0 * * *', async () => {
        try {
            const today = moment().startOf('day');
            const targetDate = moment().add(5, 'days').startOf('day');

            const expiringReservations = await reservationModel.findAll({
                where: {
                    checkOutDate: {
                        [Op.eq]: targetDate.toDate()
                    }
                },
                include: [
                    {
                        model: userModel,
                        attributes: ['email', 'userName']
                    }
                ]
            });

            if (expiringReservations.length > 0) {
                expiringReservations.forEach(async reservation => {
                    const user = reservation.User;
                    const html = `
                        <div style="text-align: center; font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 30px; border-radius: 10px; max-width: 600px; margin: auto; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
                            <img src="https://res.cloudinary.com/deylqxzgk/image/upload/c_thumb,w_200,g_face/v1740687998/2ea2907e-fda9-4b4c-bf50-abb69a5fa998.png" 
                                 alt="${process.env.APPNAME} Logo" 
                                 style="width: 180px; display: block; margin: auto; background: white; padding: 10px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);" />
                            <h2 style="color: #333; font-size: 26px; margin-top: 20px; font-weight: bold;">تذكير بحجزك</h2>
                            <p style="font-size: 18px; color: #555; line-height: 1.6;">مرحباً ${user.userName}،</p>
                            <p style="font-size: 16px; color: #555; line-height: 1.6;">نود تذكيرك بأن حجزك سيكتمل بعد 5 أيام. تاريخ إنهاء الحجز هو <strong style="color: #3b9e4f;">${targetDate.format('DD-MM-YYYY')}</strong>.</p>
                            <p style="font-size: 16px; color: #555; line-height: 1.6;">لأي استفسار أو تعديل في الحجز، يمكنك الاتصال بنا على الرقم أو عبر البريد الإلكتروني.</p>
                            <p style="font-size: 16px; color: #555; line-height: 1.6;">شكراً لاختيارك <span style="font-weight: bold; color: #3b9e4f;">${process.env.APPNAME}</span>!</p>
                            <footer style="margin-top: 30px; font-size: 14px; color: #888; text-align: center; border-top: 1px solid #ddd; padding-top: 15px;">
                                <p>&copy; ${new Date().getFullYear()} ${process.env.APPNAME}. كل الحقوق محفوظة.</p>
                            </footer>
                        </div>
                    `;
                    await sendEmail(user.email, 'تذكير بحجزك', html);
                });
            }
        } catch (error) {
            console.error('❌ خطأ أثناء فحص الحجوزات:', error);
        }
    });
};

export default sendReminderForExpiringReservations;
