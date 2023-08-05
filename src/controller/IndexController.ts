import express from 'express';
import asyncify from 'express-asyncify';
import { router as authRouter } from './auth.controller';
import { router as infoRouter } from './info.controller';

const router = asyncify(express.Router());

router.use('/auth', authRouter);
router.use('/info', infoRouter);

export default router;
