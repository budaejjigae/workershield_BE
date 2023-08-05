import { createBoard, createComment, deleteBoard, getBoard, getBoardList, updateBoard } from '@src/service/commu.service';
import express from 'express';

const router = express.Router();


router.post('/board/:id', createComment);
router.get('/board/:id', getBoard);
router.patch('/board/:id', updateBoard);
router.delete('/board/:id', deleteBoard);
router.get('/page/:page', getBoardList);
router.post('/', createBoard);

export { router };