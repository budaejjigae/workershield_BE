import dotenv from "dotenv";
dotenv.config()
import express from "express"
import asyncify from "express-asyncify";
import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import {HttpError, NotFoundException} from "@src/utils/exception/Exceptions";

import controller from "@src/controller/IndexController";
import {DatabaseStart} from "@src/database/Database";


const app = asyncify(express());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

DatabaseStart();

app.use(
    cors({
            origin: true, // '*' 안됨 -> 정확한 주소 또는 origin: true로 해도 됨
            credentials: true,
    }),
);


app.use('/api',controller);

app.use((req:Request, res:Response, next:NextFunction) => {
        next(new NotFoundException())
});

app.use(((err: HttpError, req: Request, res: Response, next: NextFunction) => {
        const {httpCode, message} = err;
      return res.status(httpCode ?? 500).json(message ?? "Internal Server Error");
}) as ErrorRequestHandler);

app.listen(8088)