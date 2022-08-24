import { NextFunction, Request, Response } from "express";

const corsOrigin = (req: Request, res: Response, next: NextFunction) => {
        res.header("Access-Control-Allow-Origin", "true"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "true");
        next();
}

export default corsOrigin
