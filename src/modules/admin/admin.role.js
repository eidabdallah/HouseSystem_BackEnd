import { roles } from "../../middleware/auth.middleware.js";

export const endPoints = {
    admin : [roles.ADMIN],
}
