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

const renewToken = (req,res)=>{
    const refreshtoken = req.cookies.refreshtoken
    let exist = false
    if(!refreshtoken){
        res.json({message:"unsuccess"})
       
    }else{
        jwt.verify(refreshtoken,process.env.refreshtoken,(err,decoded)=>{
            if(err){ res.json("Token is wrong")

            }else{
                const accesstoken = jwt.sign({ email: decoded.email, role: decoded.role }, process.env.accesstoken, { expiresIn: '15s' });
                res.cookie("accesstoken", accesstoken,{maxAge:15000});
                exist=true
            }
        })
    }
    return exist
}

export const verifyUser = (req,res,next) =>{ //middleware
    const accesstoken = req.cookies.accesstoken
    if(!accesstoken){
        if(renewToken(req,res)){
            next()
        }   
    }else{
         jwt.verify(accesstoken,process.env.accesstoken,(err,decoded)=>{
            if(err){ res.json("Token is wrong")

            }else{
                req.email = decoded.email
                req.role = decoded.role
                next()
            }
           
        })
    }
}