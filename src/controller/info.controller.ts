import { getArticle, getArticleList } from '@src/service/info.service';
import * as express from 'express';

const router = express.Router();

router.get('/:id', getArticle);
router.get('/', getArticleList);

export { router };