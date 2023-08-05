import express from 'express';
import asyncify from 'express-asyncify';
import { router as authRouter } from './auth.controller';

const router = asyncify(express.Router());

router.use('/auth', authRouter);

export default router;
