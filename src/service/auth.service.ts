import { AppDataSource } from "@src/database/Database";
import { User } from "@src/database/entity/user.entity";
import { ConflictException } from "@src/utils/exception/Exceptions";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";

const userRepo = AppDataSource.getRepository(User);

const createAccount = async (req: Request, res: Response): Promise<object> => {
    const { userID, userName, userPW, userEmail } = req.body;

    const thisIDUser = await userRepo.findOneBy({ userID });
    if (thisIDUser) throw new ConflictException();

    const thisPW = await bcrypt.hash(userPW, 10);

    const thisUser = await userRepo.save({
        userStringID: userID,
        userName,
        userPW: thisPW,
        userEmail,
    })

    return res.status(201).json({
        data: thisUser,
        statusCode: 201,
        statusMsg: "회원가입 완료"
    })
}

export {
    createAccount,
}