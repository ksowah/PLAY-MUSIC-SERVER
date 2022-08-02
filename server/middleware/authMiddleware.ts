import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModels";

declare module 'express-serve-static-core' {
     interface Request {
      user: any
    }
  }

const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;
    try {
        console.log(req.headers["authorization"])
        
        token = req.headers.authorization?.split(" ")[1] 
        const decoded: any = jwt.verify(token || "", process.env.JWT_SECRET || "")
        console.log(decoded)
        
        req.user = await userModel.findById(decoded.id)
        next()
        
    } catch (error) {
        console.log(error)
        next(error)
    }

    if(!token){
        res.status(401)
        throw new Error("Not authorized, no token")
    }
}

export default protect