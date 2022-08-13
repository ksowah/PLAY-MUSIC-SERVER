import { NextFunction, Request, Response } from "express";
import userModels from "../models/userModels";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// get all users
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userModels.find()
        res.status(200).json({
            success: true,
            users,
        })
    } catch (error) {
        next(error)
    }
}

// register users
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email, password} = req.body

        // check if user already exists
        const userExists = await userModels.findOne({email})
        if(userExists){
            res.status(400)
            throw new Error("This user already exists")
        }

        // hash the password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        let token = generateToken(email)
        
        const newUser = await userModels.create({
            name,
            email,
            password: hashedPassword,
            token: token.refreshToken
        })

        
        // add refresh token to cookies
        res.cookie("jwt", token.refreshToken, {httpOnly: true, sameSite: "none", secure: true})
        res.status(200).json({
            success: true,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                token: token.accessToken
            }
        })

    } catch (error) {
        next(error)
    }
}


// Log user in
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body
        const user = await userModels.findOne({email})
        const checkPassword = user && await bcrypt.compare(password, user.password)
 
        // compare inputed password to hashed password on db and do something
        let token = generateToken(email)
        if(user && checkPassword){

            await user.updateOne({token: token.refreshToken}, {new: true})

            res.cookie("jwt", token.refreshToken, {httpOnly: true, sameSite: "none", secure: true})
           
            res.status(200).json({
                success: true,
                id: user.id,
                name: user.name,
                email: user.email,
                token: token.accessToken
            })
        }

        if(!checkPassword){
            throw new Error("Password is incorrect")
        }

    } catch (error) {
        next(error)
    }
}


// generate jwt
const generateToken = (email: String) => {
    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET || "", {
        expiresIn: "5m"
    })

    const refreshToken = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET || "", {
        expiresIn: "1d"
    })

    return {accessToken, refreshToken}
}

