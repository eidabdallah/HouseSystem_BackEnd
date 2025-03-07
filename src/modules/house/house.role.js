import { roles } from "../../middleware/auth.middleware.js";

export const endPoints = {
    houseOwner : [roles.HOUSEOWNER],
    student : [roles.STUDENT],
    delete : [roles.ADMIN , roles.HOUSEOWNER],
}
