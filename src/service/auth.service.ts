import { AppDataSource } from "@src/database/Database";
import { User } from "@src/database/entity/user.entity";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Company } from "@src/database/entity/company.entity";
import { validateAccess } from "@src/utils/middleware/validate.middle";

dotenv.config();

const userRepo = AppDataSource.getRepository(User);
const companyRepo = AppDataSource.getRepository(Company);

const jwtSecret : string = process.env.JWT_SECRET!;

const createAccount = async (req: Request, res: Response): Promise<object> => {
    try {    
        const { userID, userName, userPW, inviteCode } = req.body;

        const thisIDUser = await userRepo.findOneBy({ userStringID : userID });
        if (thisIDUser) return res.status(409).json({
            errCode: 409,
            errMsg: "이미 존재하는 아이디"
        })
        const thisPW = await bcrypt.hash(userPW, 10);

        const thisCompany = await companyRepo.findOneBy({ companyCode: inviteCode });
        if (!thisCompany) return res.status(404).json({
            errCode: 404,
            errMsg: "존재하지 않는 초대 코드"
        })

        const thisUser = await userRepo.save({
            userStringID: userID,
            userName,
            userPW: thisPW,
            inviteCode,
        })

        return res.status(201).json({
            data: thisUser,
            statusCode: 201,
            statusMsg: "회원가입 완료"
        })
    } catch (err) {
        console.error(err);
        return res.json(err);
    }
}

const signIn = async (req: Request, res: Response): Promise<object> => {
    const { userID, userPW } = req.body;
    if (!userID || !userPW) return res.status(409).json({
        errCode: 409,
        errMsg: "인수 부족"
    })

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
    const thisUser = await validateAccess(req.headers.authorization!);
    if (!thisUser) return res.status(404).json({
        errCode: 404,
        errMsg: "존재하지 않는 유저"
    })

    const { userPW } = req.body;

    if (!await bcrypt.compare(userPW, thisUser.userPW)) return res.status(409).json({
        errCode: 409,
        errMsg: "비밀번호 불일치"
    })

    await userRepo.delete({ userID: thisUser.userID });

    return res.status(204).json({
        data: null,
        statusCode: 204,
        statusMsg: "회원 탈퇴 완료"
    })
}

const signOut = async (req: Request, res: Response): Promise<object> => {
    const thisUser = await validateAccess(req.headers.authorization!);

    if (!thisUser) return res.status(404).json({
        errCode: 404,
        errMsg: "존재하지 않는 유저"
    })

    await userRepo.update({
        userID: thisUser.userID
    }, {
        accesstoken: 'null'
    })

    return res.status(204).json({
        data: null,
        statusCode: 204,
        statusMsg: "로그아웃 완료"
    })
}

export {
    createAccount,
    signIn,
    deleteAccount,
    signOut,
}