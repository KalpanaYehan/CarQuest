import jwt from 'jsonwebtoken'
import express, { response } from "express";
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();

const app = express()
app.use(express.json());
app.use(cookieParser()) 
app.use(cors({origin:"http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT"]}

))

export const verifyRole = (roles) => (req, res, next) => {
    const accesstoken = req.cookies.accesstoken
    if (!accesstoken) {
        return res.status(401).json("No token provided");
    }
    jwt.verify(accesstoken, process.env.accesstoken, (err, decoded) => {
        if (err) {
            return res.status(403).json("Token is invalid");
        }
        if (!roles.includes(decoded.role)) {
            return res.status(403).json("Access denied");
        }
        next();
    });
};