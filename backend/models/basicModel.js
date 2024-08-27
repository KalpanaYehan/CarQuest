import mongoose from "mongoose";

const carSchema= mongoose.Schema(
    {   
        model:{
            type:String,
            require:true,
        },
        brand:{
            type:String,
            require:true,
        },
        publishYear:{
            type:Number,
            require:true
        },
        price:{
            type:Number,
            require:true
        },
        mileage:{
            type:Number,
            require:true
        },
        fuelType:{
            type:String,
            require:true
        },
        condition:{    //used or brandnew
            type:String,
            require:true
        },
        description:{
            type:String,
            require:true
        }
    
    },
    {
        timestamps:true,
    }
);

export const Car = mongoose.model("car",carSchema)