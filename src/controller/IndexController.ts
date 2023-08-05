import express from 'express';
import asyncify from 'express-asyncify';
import { router as authRouter } from './auth.controller';
import { router as infoRouter } from './info.controller';
import { router as commuRouter } from './commu.controller';

const router = asyncify(express.Router());

router.use('/auth', authRouter);
router.use('/info', infoRouter);
router.use('/commu', commuRouter);

export default router;
