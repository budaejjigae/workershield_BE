import { getArticleList } from '@src/service/info.service';
import * as express from 'express';

const router = express.Router();

router.get('/', getArticleList);

export { router };