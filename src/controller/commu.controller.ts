import { createBoard, getBoard, getBoardList, updateBoard } from '@src/service/commu.service';
import express from 'express';

const router = express.Router();

router.get('/board/:id', getBoard);
router.patch('/board/:id', updateBoard);
router.get('/page/:page', getBoardList);
router.post('/', createBoard);

export { router };