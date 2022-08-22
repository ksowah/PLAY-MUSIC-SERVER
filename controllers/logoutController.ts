import { NextFunction, Request, Response } from "express";
import userModels from "../models/userModels";

const logOut = async (req: Request, res: Response) => {
    const cookies = req.cookies

    if(!cookies?.jwt) return res.sendStatus(204) // No content
    const refreshToken = cookies.jwt

    // is refresh token in db?
    const user = await userModels.findOne({token: refreshToken})

    if(!user) {
        res.clearCookie("jwt", {httpOnly: true, sameSite: "none", secure: true})
        return res.sendStatus(204)
    }

    // clear the refresh token in db
    const clearToken = await user.updateOne({token: ""}, {new: true})
    res.clearCookie("jwt", {httpOnly: true, sameSite: "none", secure: true})
    res.sendStatus(204)
}

export default logOut

