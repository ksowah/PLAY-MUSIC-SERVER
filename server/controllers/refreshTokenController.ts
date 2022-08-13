import { NextFunction, Request, Response } from "express"
import userModels from "../models/userModels"
import jwt from "jsonwebtoken"

export const getRefreshedToken = async (req: Request, res: Response, next: NextFunction) => {
   try {
    const cookies = req.cookies
    console.log(cookies)
    
    if(!cookies?.jwt){ 
        console.log("There is no cookies")
        
        return res.sendStatus(401)
    }
    const refreshToken = cookies.jwt
    console.log("refresh >>>",refreshToken);
    const user = await userModels.findOne({token: refreshToken})
    
    if(!user) {
        console.log("no user found");
        
        return res.sendStatus(403)
    } // forbidden

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "", (err:any, decoded:any) => {
        if(err || user.email !== decoded.email) {
            console.log("Email mismatch");
            
            return res.sendStatus(403)
        } // forbidden
        // now generate a new access token
        const accessToken = jwt.sign({email: decoded.email}, process.env.JWT_SECRET || "", {expiresIn: "5m"})  
        res.json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                id: user.id
            },
            token: accessToken,
            message: "new token generated"
        })  
    })
   } catch (error) {
    next(error)
   }
}