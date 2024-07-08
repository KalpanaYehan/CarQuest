import express, { response } from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/basicModel.js";
import booksRout from "./routes/booksRout.js"
import cors from 'cors'

const app = express()
app.use(express.json());

app.use(cors())
//app.use(cors({
    //origin:'http//localhost3000',
    //methods:['GET','PUT','DELETE','POST'],
    //allowedHeaders:['content-Type'],
//}
//))

app.get("/",(req,res)=>{
    console.log(req)
    return res.status(234).send('Welcome To Book Store')
})

app.use("/books",booksRout);//wen request with '/books' then use this middleware(booksrout)




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
   
    
