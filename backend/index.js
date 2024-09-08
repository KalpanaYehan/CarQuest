import express, { response } from "express";
import mongoose from "mongoose";
import { Car } from "./models/basicModel.js";
import carsRout from "./routes/carsRout.js"
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";
import { UserModel } from "./models/userModel.js";
import { verifyLogging } from "./middlewares/verifyLogging.js";
import { verifyUser } from "./middlewares/verifyUser.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express()
app.use(express.json());
app.use(cookieParser()) 
app.use(cors({origin:"https://car-quest-api.vercel.app",
    credentials:true,
    // allowedHeaders: ["Content-Type", "Authorization"],
    // optionsSuccessStatus: 200,
    methods:["GET","POST","PUT","DELETE"]}

))

// const renewToken = (req,res)=>{
//     const refreshtoken = req.cookies.refreshtoken
//     let exist = false
//     if(!refreshtoken){
//         res.json({message:"unsuccess"})
       
//     }else{
//         jwt.verify(refreshtoken,'jwt-security-key',(err,decoded)=>{
//             if(err){ res.json("Token is wrong")

//             }else{
//                 const accesstoken = jwt.sign({ email: decoded.email, role: decoded.role }, "jwt-security-key", { expiresIn: '15s' });
//                 res.cookie("accesstoken", accesstoken,{maxAge:15000});
//                 exist=true
//             }
//         })
//     }
//     return exist
// }

// const verifyUser = (req,res,next) =>{ //middleware
//     const accesstoken = req.cookies.accesstoken
//     if(!accesstoken){
//         if(renewToken(req,res)){
//             next()
//         }   
//     }else{
//          jwt.verify(accesstoken,'jwt-security-key',(err,decoded)=>{
//             if(err){ res.json("Token is wrong")

//             }else{
//                 req.email = decoded.email
//                 req.role = decoded.role
//                 next()
//             }
           
//         })
//     }
// }

// const verifyRole = (roles) => (req, res, next) => {
//     const accesstoken = req.cookies.accesstoken
//     if (!accesstoken) {
//         return res.status(401).json("No token provided");
//     }
//     jwt.verify(accesstoken, 'jwt-security-key', (err, decoded) => {
//         if (err) {
//             return res.status(403).json("Token is invalid");
//         }
//         if (!roles.includes(decoded.role)) {
//             return res.status(403).json("Access denied");
//         }
//         next();
//     });
// };


app.get("/",(req,res)=>{
    console.log(req)
    return res.status(234).send('Welcome To Book Store')
})

// app.get("/auth",verifyUser,(req,res)=>{
//     return res.send({message:'Welcome To Book Store'})
// })


app.use("/cars",carsRout);//wen request with '/cars' then use this middleware(carsrout)

// Add this route to your existing routes
// app.get('/auth/check', (req, res) => {
//     const token = req.cookies.token;
    
//     if (!token) {
//         return res.status(401).json({ message: 'Not logged in' });
//     }

//     jwt.verify(token, 'jwt-security-key', async (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: 'Invalid token' });
//         }

//         try {
//             const user = await UserModel.findOne({ email: decoded.email });
//             if (!user) {
//                 return res.status(404).json({ message: 'User not found' });
//             }
//             // Send back the user's information (excluding sensitive data like password)
//             res.status(200).json({ user: { username: user.name, role: user.role, email: user.email } });
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     });
// });

//,verifyRole(['admin','user'])

// app.get('/cars',verifyUser,async(req,res)=>{
//     try{
//         const cars = await Car.find({})
//         return res.status(200).json({ 
//             message:"success",
//             count:cars.length,
//             data:cars
//     })
//     }catch(error){
//         console.log(error.message);
//         res.status(500).send({message:error.message})
//     }
// })
 
// app.post('/register',(req,res)=>{
//     const {name,email,password,role} = req.body
//     bcrypt.hash(password,10)
//     .then(hash =>{
//         UserModel.create({name,email,password:hash,role})
//         .then(users => res.json(users))
//         .catch(err => res.json(err))
//     })
//     .catch(err =>console.log(err.message))
// })


app.post('/register', (req, res) => {
    const { name, email, password, role } = req.body;

    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                // Email already exists
                return res.json({ message: 'Email already exists' });
            }

            // If the email doesn't exist, proceed with hashing the password and creating the user
            bcrypt.hash(password, 10)
                .then(hash => {
                    UserModel.create({ name, email, password: hash, role })
                        .then(res.json({message:'success'}))
                        .catch(err => res.status(500).json({ message: err.message }));
                })
                .catch(err => res.status(500).json({ message: err.message }));
        })
        .catch(err => res.status(500).json({ message: err.message }));
});


// app.post('/login',(req,res)=>{
//     const {email,password} = req.body
//     UserModel.findOne({email:email}) 
//     .then(user => {
//         if(user){
//             bcrypt.compare(password,user.password,(err,response) => {
//                 if(response){
//                     const token = jwt.sign({email:user.email,role :user.role},"jwt-security-key",{expiresIn:'5s'})
//                     res.cookie("token",token)
//                     res.json("success")
//                 }else{
//                     res.json("the password is incorrect")
//                 }
//             })
//         }else{
//                 res.json("No record existed")
            
//         }
//     }
//     )
// })

app.post('/login',verifyLogging,(req, res) => {
    const { email, password } = req.body;
    
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const accesstoken = jwt.sign({ email: user.email, role: user.role }, process.env.accesstoken, { expiresIn: '15m' });
                        const refreshtoken = jwt.sign({ email: user.email, role: user.role }, process.env.refreshtoken, { expiresIn: '1d' });
                        res.cookie("accesstoken", accesstoken,{maxAge:900000});
                        res.cookie("refreshtoken", refreshtoken,{maxAge:86400000,secure:true,sameSite:'lax'});
                        
                        // Send back the user details along with the token
                        res.status(200).json({
                            message: "success",
                            accesstoken: accesstoken,
                            user: { username: user.name, role: user.role, email: user.email }
                        });
                    } else {
                        res.json({ message: "The password is incorrect" });
                        //.status(401) 
                    }
                });
            } else {
                res.json({ message: "No record existed" });
                // status(404).
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});

app.post('/logout', (req, res) => {
    // Clear HttpOnly cookies by setting them to expire in the past
    res.cookie('refreshtoken', '', { expires: new Date(0), httpOnly: true, path: '/' });
    // Send a response indicating successful logout
    res.json({ message: 'Logged out successfully' });
    // .status(200)
  });





mongoose
    .connect(process.env.MONGODB)
    .then(()=>{
        console.log('App connected to the database');
        app.listen(process.env.PORT,()=>{
            console.log(`Listening to port: ${process.env.PORT}`);
        })
    })
    .catch((error)=>{
        console.log(error);
    })
   
    
