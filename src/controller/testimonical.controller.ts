import { NextFunction, Request, Response } from "express";
import axios from 'axios';
import { PLACEID, APIKEY } from '../config';
export const mapReviews = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACEID}&key=${APIKEY}`).then((result) => {
            console.log(result);
            res.status(200).json({ status: 200, result: result.data });
        }).catch(err => {
            res.status(404).json({ status: 404, message: err.message || "cannot get data from maps" })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ status: 500, message: err.message || "something went wrong" });
    }
}