import deleteUnconfirmedAccounts from "../utils/accountCleanup.js";
import cleanupExpiredCodes from "../utils/clearSendCode.js";
import { createAdmin } from "../utils/createAdmin.js";
import sendReminderForExpiringReservations from "../utils/sendReservationReminders.js";

export const setupApp = async () => {
    await createAdmin();
    cleanupExpiredCodes();
    deleteUnconfirmedAccounts();
    sendReminderForExpiringReservations();
};
