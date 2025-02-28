import { roles } from "../../middleware/auth.middleware.js";

export const endPoints = {
    changePassword : [roles.ADMIN , roles.HOUSEOWNER , roles.STUDENT],
}
