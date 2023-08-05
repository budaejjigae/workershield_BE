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
    const { page } = req.params;

    if (!thisUser) return res.status(404).json({
        errCode: 404,
        errMsg: "존재하지 않는 유저"
    })

    let skipNumber = (Number(page) - 1) * 10;
    if (typeof (skipNumber) != "number") return res.status(409).json({
        errCode: 409,
        errMsg: "주소 에러 발생"
    })

    const boardList = await boardRepo.find({
        select: ['boardWriter', 'boardHead', 'boardContent', 'boardView', 'boardComment'],
        order: {
            createdAt: "DESC",
        },
        take: 10,
        skip: skipNumber
    })

    return res.status(200).json({
        data: boardList,
        statusCode: 200,
        statusMsg: "리스트 조회 완료"
    });
}

const createBoard = async (req: Request, res: Response): Promise<object> => {
    const thisUser = await validateAccess(req.headers.authorization!);
    const { boardHead, boardContent } = req.body;

    if (!thisUser) return res.status(404).json({
        errCode: 404,
        errMsg: "존재하지 않는 유저"
    })

    const thisBoard = await boardRepo.save({
        boardHead,
        boardContent,
        boardWriter: thisUser.userName,
        boardWriterID: thisUser.userID
    })

    return res.status(201).json({
        data: thisBoard,
        statusCode: 201,
        statusMsg: "글 작성 완료"
    })
}

const getBoard = async (req: Request, res: Response): Promise<object> => {
    const thisUser = await validateAccess(req.headers.authorization!);
    const { id } = req.params;
    const boardID = Number(id);

    if (!thisUser) return res.status(404).json({
        errCode: 404,
        errMsg: "존재하지 않는 유저"
    })

    const thisBoard = await boardRepo.findOneBy({ boardID });
    const thisBoardComment = await commentRepo.findBy({ boardID });

    if (!thisBoard) return res.status(404).json({
        errCode: 404,
        errMsg: "존재하지 않는 게시글"
    })

    await boardRepo.update({
        boardID
    }, {
        boardView: thisBoard.boardView + 1
    })

    return res.status(200).json({
        data: {
            board: thisBoard,
            comment: thisBoardComment
        },
        statusCode: 200,
        statusMsg: "글 조회 완료"
    });
}

const updateBoard = async (req: Request, res: Response): Promise<object> => {
    const thisUser = await validateAccess(req.headers.authorization!);
    const { id } = req.params;
    const boardID = Number(id);

    if (!thisUser) return res.status(404).json({
        errCode: 404,
        errMsg: "존재하지 않는 유저"
    })

    const thisBoard = await boardRepo.findOneBy({ boardID });
    if (!thisBoard) return res.status(404).json({
        errCode: 404,
        errMsg: "존재하지 않는 글"
    })
    if (thisBoard.boardWriterID != thisUser.userID) return res.status(403).json({
        errCode: 403,
        errMsg: "본인의 글이 아님"
    })

    const boardHead = req.body.boardHead ?? thisBoard.boardHead;
    const boardContent = req.body.boardContent ?? thisBoard.boardContent;

    await boardRepo.update(
        { boardID },
        {
            boardHead,
            boardContent,
        }
    )

    const afterupdate = await boardRepo.findOneBy({ boardID })

    return res.status(200).json({
        data: afterupdate,
        statusCode: 200,
        statusMsg: "글 수정 완료"
    });
}

const deleteBoard = async (req: Request, res: Response): Promise<object> => {
    const thisUser = await validateAccess(req.headers.authorization!);
    const { id } = req.params;
    const boardID = Number(id);

    if (!thisUser) return res.status(404).json({
        errCode: 404,
        errMsg: "존재하지 않는 유저"
    })

    const thisBoard = await boardRepo.findOneBy({ boardID });

    if (!thisBoard) return res.status(404).json({
        errCode: 404,
        errMsg: "존재하지 않는 글"
    })
    if (thisBoard.boardWriterID != thisUser.userID) return res.status(403).json({
        errCode: 403,
        errMsg: "본인의 글이 아님"
    })

    await boardRepo.delete({ boardID });

    return res.status(204).json({
        data: null,
        statusCode: 204,
        statusMsg: "글 삭제 완료"
    })
}

export {
    getBoardList,
    updateBoard,
    createBoard,
    deleteBoard,
    getBoard
}