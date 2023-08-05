import { createBoard, createComment, deleteBoard, deleteComment, getBoard, getBoardList, getCommentList, updateBoard, updateComment } from '@src/service/commu.service';
import express from 'express';

const router = express.Router();


router.post('/board/:id', createComment);
router.get('/board/:id/comment', getCommentList);
router.patch('/board/:id/comment/:comID', updateComment);
router.delete('/board/:id/comment/:comID', deleteComment);
router.get('/board/:id', getBoard);
router.patch('/board/:id', updateBoard);
router.delete('/board/:id', deleteBoard);
router.get('/page/:page', getBoardList);
router.post('/', createBoard);

export { router };