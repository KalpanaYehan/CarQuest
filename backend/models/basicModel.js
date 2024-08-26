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
    
    },
    {
        Timestamps:true,
    }
);

export const Car = mongoose.model("car",carSchema)