import { NextFunction, Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const errorStatus = err.statusCode || 500
    const message = err.message || "Something went wrong"
    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message,
        stack: err.stack
    })
}

export default errorHandler