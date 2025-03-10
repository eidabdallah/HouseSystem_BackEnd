import cleanupExpiredCodes from "../utils/clearSendCode.js";
import { createAdmin } from "../utils/createAdmin.js";

export const setupApp = async () => {
    await createAdmin();
    cleanupExpiredCodes();
};
