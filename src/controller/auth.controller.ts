import * as express from 'express';
import { createAccount } from '@src/service/auth.service';

const router = express.Router();

router.post('/user', createAccount);

export { router };