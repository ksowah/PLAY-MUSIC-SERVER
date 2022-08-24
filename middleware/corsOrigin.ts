import { NextFunction, Request, Response } from "express";

const corsOrigin = (req: Request, res: Response, next: NextFunction) => {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000/"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
}

export default corsOrigin
