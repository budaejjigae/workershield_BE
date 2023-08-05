import { getBoardList } from '@src/service/commu.service';
import express from 'express';

const router = express.Router();

router.get('/?', getBoardList);

export { router };