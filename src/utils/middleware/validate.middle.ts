import { AppDataSource } from '@src/database/Database';
import { User } from '@src/database/entity/user.entity';
import { config } from 'dotenv';
import * as jwt from 'jsonwebtoken';

config();

const userRepo = AppDataSource.getRepository(User);

const validateAccess = async (accesstoken: string): Promise<User | null> => {
    const jwtValidate: any = jwt.verify(accesstoken.split(' ')[1], process.env.JWT_SECRET!);

    const thisUser = await userRepo.findOneBy({ userID: jwtValidate.userID });
    if (!thisUser) return null;

    return thisUser;
}

export { validateAccess };