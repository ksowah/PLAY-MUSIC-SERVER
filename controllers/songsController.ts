import { NextFunction, Request, Response } from "express";
import TrackModel from "../models/trackModel";

export const getSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const getTracks = await TrackModel.find({ user: req.user.email });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.status(200).json(getTracks);
  } catch (error) {
    next(error);
  }
};

export const addSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const song = await TrackModel.create(req.body);
    res.status(201).json(song);
  } catch (error) {
    next(error);
  }
};

// export const updateSong = async (req: Request, res: Response, next: NextFunction) => {
//    try {
//        const updatePost = await TrackModel.findByIdAndUpdate(req.params.postID, req.body, { new: true })
//        res.status(200).json(updatePost)
//    } catch (error) {
//     next(error)
//    }
// }

export const deleteSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const delSong = await TrackModel.findByIdAndRemove(req.params.songID);
    res.status(200).json(delSong);
  } catch (error) {
    next(error);
  }
};
