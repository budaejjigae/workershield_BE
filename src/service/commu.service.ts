import { AppDataSource } from "@src/database/Database";
import { Board } from "@src/database/entity/board.entity";
import { Comment } from "@src/database/entity/comment.entity";
import { validateAccess } from "@src/utils/middleware/validate.middle";
import { config } from "dotenv";
import { Request, Response } from "express";

config();

const boardRepo = AppDataSource.getRepository(Board);
const commentRepo = AppDataSource.getRepository(Comment);

const getBoardList = async (req: Request, res: Response): Promise<object> => {
    const thisUser = await validateAccess(req.headers.authorization!);
    const { page } = req.query;

    if (!thisUser) return res.status(404).json({
        errCode: 404,
        errMsg: "존재하지 않는 유저"
    })

    const boardList = await boardRepo.find({
        select: ['boardWriter', 'boardHead', 'boardContent', 'boardView', 'boardComment'],
        order: {
            createdAt: "DESC",
        },
        take: 10,
        skip: Number(page) * 10
    })

    return res.status(200).json({
        data: boardList,
        statusCode: 200,
        statusMsg: "리스트 조회 완료"
    });
}

export {
    getBoardList,
}