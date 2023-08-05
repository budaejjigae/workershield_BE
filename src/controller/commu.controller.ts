import { createBoard, getBoard, getBoardList } from '@src/service/commu.service';
import express from 'express';

const router = express.Router();

router.get('/board/?', getBoard);
router.get('/?', getBoardList);
router.post('/', createBoard);

export { router };