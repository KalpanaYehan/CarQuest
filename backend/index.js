import express, { response } from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Car } from "./models/basicModel.js";
import carsRout from "./routes/carsRout.js"
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";
import { UserModel } from "./models/userModel.js";

const app = express()
app.use(express.json());
app.use(cookieParser()) 
app.use(cors({origin:"http://localhost:5173",
    credentials:true,
    methods:["GET","POST"]}

))

const verifyUser = (req,res,next) =>{ //middleware
    const token = req.cookies.token
    if(!token){
        return res.json("The token is not avilable")
    }else{
         jwt.verify(token,'jwt-security-key',(err,decoded)=>{
            if(err){ res.json("Token is wrong")
            }
            next()
        })
    }
}

app.get("/",(req,res)=>{
    console.log(req)
    return res.status(234).send('Welcome To Book Store')
})

app.get('/cars',verifyUser,async(req,res)=>{
    try{
        const cars = await Car.find({})
        return res.status(200).json({
            message:"success",
            count:cars.length,
            data:cars
    })
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})

app.post('/register',(req,res)=>{
    const {name,email,password} = req.body
    bcrypt.hash(password,10)
    .then(hash =>{
        UserModel.create({name,email,password:hash})
        .then(users => res.json(users))
        .catch(err => res.json(err))
    })
    .catch(err =>console.log(err.message))
})

app.post('/login',(req,res)=>{
    const {email,password} = req.body
    UserModel.findOne({email:email}) 
    .then(user => {
        if(user){
            bcrypt.compare(password,user.password,(err,response) => {
                if(response){
                    const token = jwt.sign({email:user.email},"jwt-security-key",{expiresIn:'1m'})
                    res.cookie("token",token)
                    res.json("success")
                }else{
                    res.json("the password is incorrect")
                }
            })
        }else{
                res.json("No record existed")
            
        }
    }
    )
})


app.use("/cars",carsRout);//wen request with '/books' then use this middleware(booksrout)


mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App connected to the database');
        app.listen(PORT,()=>{
            console.log(`Listening to port: ${PORT}`);
        })
    })
    .catch((error)=>{
        console.log(error);
    })
   
    
