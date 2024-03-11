import { NextFunction, Request, Response } from "express";

export default class MainCtrl {
    index = (req: Request, res: Response, next: NextFunction) => {
        res.render('index', { title: 'Express' });
    }
}