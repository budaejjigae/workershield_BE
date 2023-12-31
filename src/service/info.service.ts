import { AppDataSource } from "@src/database/Database";
import { Article } from "@src/database/entity/article.entity";
import { Company } from "@src/database/entity/company.entity";
import { validateAccess } from "@src/utils/middleware/validate.middle";
import { config } from "dotenv";
import { Request, Response } from "express";

config();

const companyRepo = AppDataSource.getRepository(Company);
const articleRepo = AppDataSource.getRepository(Article);

const getArticleList = async (req: Request, res: Response): Promise<object> => {
    const thisUser = await validateAccess(req.headers.authorization!);
    if (!thisUser) return res.status(404).json({
        statusCode: 404,
        statusMsg: "존재하지 않는 유저"
    })

    const company = await companyRepo.findOneBy({ companyCode: thisUser.inviteCode });
    if (!company) return res.status(404).json({
        errCode: 404,
        errMsg: "존재하지 않는 회사"
    })
    
    const articleGroup = company.companyKind;

    const recentlyArticle = await articleRepo.find({
        where: { articleGroup },
        order: { createdAt: "DESC" },
        take: 1,
    })

    const likelyArticles = await articleRepo.find({
        where: { articleGroup },
        order: { articleView: "DESC", createdAt: "DESC" }
    })

    return res.status(200).json({
        data: {
            recently: recentlyArticle[0],
            likely: likelyArticles,
        },
        statusCode: 200,
        statusMsg: "아티클 리스트 조회 완료"
    })
}

const getArticle = async (req: Request, res: Response): Promise<object> => {
    const thisUser = await validateAccess(req.headers.authorization!);
    const { id } = req.params;
    const articleID = Number(id);

    const thisArticle = await articleRepo.findOneBy({ articleID });

    if (!thisUser) return res.status(404).json({
        errCode: 404,
        errMsg: "존재하지 않는 유저"
    })
    if (!thisArticle) return res.status(404).json({
        errCode: 404,
        errMsg: "존재하지 않는 아티클"
    })

    return res.status(200).json({
        data: thisArticle,
        statusCode: 200,
        statusMsg: "아티클 조회 성공"
    })
}

export {
    getArticleList,
    getArticle
}