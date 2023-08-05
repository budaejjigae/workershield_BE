import * as express from 'express';
import { createAccount, deleteAccount, signIn } from '@src/service/auth.service';

const router = express.Router();

router.post('/user', createAccount);
router.post('/log', signIn);
router.delete('/user', deleteAccount);

export { router };