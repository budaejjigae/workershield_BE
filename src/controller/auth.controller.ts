import * as express from 'express';
import { createAccount, signIn } from '@src/service/auth.service';

const router = express.Router();

router.post('/user', createAccount);
router.post('/log', signIn);

export { router };