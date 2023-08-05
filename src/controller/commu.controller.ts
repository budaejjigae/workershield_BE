import { createBoard, getBoardList } from '@src/service/commu.service';
import express from 'express';

const router = express.Router();

router.get('/?', getBoardList);
router.post('/', createBoard);

export { router };