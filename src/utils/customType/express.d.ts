import {User} from "@src/domain/user/User";

declare global {
    namespace Express {
        interface Request {
            user: User ;
        }
    }
}