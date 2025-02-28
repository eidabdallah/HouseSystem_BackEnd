import { roles } from "../../middleware/auth.middleware.js";

export const endPoints = {
    updateInformation : [roles.ADMIN , roles.HOUSEOWNER , roles.STUDENT],
}
