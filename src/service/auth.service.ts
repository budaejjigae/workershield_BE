import { AppDataSource } from "@src/database/Database";
import { User } from "@src/database/entity/user.entity";
import { ConflictException, NotFoundException, UnAuthorizedException } from "@src/utils/exception/Exceptions";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const userRepo = AppDataSource.getRepository(User);

const jwtSecret : string = process.env.JWT_SECRET!;

const createAccount = async (req: Request, res: Response): Promise<object> => {
    const { userID, userName, userPW, userEmail } = req.body;

    const thisIDUser = await userRepo.findOneBy({ userID });
    if (thisIDUser) return res.status(409).json({
        errCode: 409,
        errMsg: "이미 존재하는 아이디"
    })
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

const signIn = async (req: Request, res: Response): Promise<object> => {
    const { userID, userPW } = req.body;

    const thisUser = await userRepo.findOneBy({ userStringID: userID });

    if (!thisUser) return res.status(404).json({
        errCode: 404,
        errMsg: "존재하지 않는 유저"
    })
    if (!await bcrypt.compare(userPW, thisUser.userPW)) return res.status(409).json({
        errCode: 409,
        errMsg: "비밀번호 불일치"
    })

    const thisJWT = jwt.sign({ userID: thisUser.userID }, jwtSecret, { algorithm: "HS256" });

    await userRepo.update({ userID: thisUser.userID }, { accesstoken: thisJWT });

    return res.status(201).json({
        data: thisJWT,
        statusCode: 201,
        statusMsg: "로그인 성공"
    })
}

const deleteAccount = async (req: Request, res: Response): Promise<object> => {
    const accesstoken = req.headers.authorization!.split(' ')[1];
    const { userPW } = req.body;

    const thisUserVerify: any = jwt.verify(accesstoken, jwtSecret);

    const { userID } = thisUserVerify;

    const thisUser = await userRepo.findOneBy({ userID });
    if (!thisUser) return res.status(404).json({
        errCode: 404,
        errMsg: "존재하지 않는 유저"
    })

    if (!await bcrypt.compare(userPW, thisUser.userPW)) return res.status(409).json({
        errCode: 409,
        errMsg: "비밀번호 불일치"
    })

    await userRepo.delete({ userID });

    return res.status(204).json({
        data: null,
        statusCode: 204,
        statusMsg: "회원 탈퇴 완료"
    })
}

export {
    createAccount,
    signIn,
    deleteAccount,
}